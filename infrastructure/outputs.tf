output "ecs_service_name" {
  description = "Name of the ECS service"
  value       = aws_ecs_service.snapflow-service.name
}

output "ecs_task_definition" {
  description = "ECS Task Definition ARN"
  value       = aws_ecs_task_definition.snapflow-task.arn
}