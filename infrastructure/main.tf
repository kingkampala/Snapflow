provider "aws" {
  region = "eu-north-1"
}

resource "aws_instance" "docker_ec2" {
  ami           = "ami-010b74bc1a8b29122"
  instance_type = "t2.micro"
  key_name      = "snapflow-server-key"
  associate_public_ip_address = true

  # Install Docker on EC2 during boot
  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo amazon-linux-extras install docker -y
              sudo service docker start
              sudo usermod -a -G docker ec2-user
              EOF

  tags = {
    Name = "Docker-EC2-Snapflow"
  }
}

output "instance_public_ip" {
  value = aws_instance.docker_ec2.public_ip
}