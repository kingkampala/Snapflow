provider "aws" {
  region = "eu-north-1"
}

# Define ECS Cluster
resource "aws_ecs_cluster" "snapflow-cluster" {
  name = "snapflow-cluster"
}

# Define VPC
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "3.0.0"

  name = "snapflow-vpc"
  cidr = "10.0.0.0/16"
  azs  = ["${var.region}a", "${var.region}b"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
}

# Define IAM Role for ECS Task
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs_task_execution_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  ]
}

# Define ECS Task Definition
resource "aws_ecs_task_definition" "snapflow-task" {
  family                   = "snapflow-task"
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  container_definitions    = jsonencode([{
    name      = "snapflow-app"
    image     = "383090558519.dkr.ecr.eu-north-1.amazonaws.com/snapflow-app:latest"
    essential = true
    memory    = 512
    cpu       = 256
    portMappings = [{
      containerPort = 5000
      hostPort      = 5000
    }]
  }])
}

# Define ECS Service
resource "aws_ecs_service" "snapflow-service" {
  name            = "snapflow-service"
  cluster         = aws_ecs_cluster.snapflow-cluster.id
  task_definition = aws_ecs_task_definition.snapflow-task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = module.vpc.public_subnets
    security_groups = [aws_security_group.snapflow-sg.id]
    assign_public_ip = true
  }
}

# Security Group for the ECS Service
resource "aws_security_group" "snapflow-sg" {
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}