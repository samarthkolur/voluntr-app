pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        AWS_ACCOUNT_ID = "YOUR_ACCOUNT_ID"          // example: 123456789012
        ECR_REPO = "voluntr-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        EC2_HOST = "ubuntu@YOUR_EC2_PUBLIC_IP"      // example: ubuntu@51.21.xxx.xxx
        COMPOSE_PATH = "/home/ubuntu/voluntr/docker-compose.yml"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/samarthkolur/voluntr-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Next.js') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t ${ECR_REPO}:${IMAGE_TAG} .
                docker tag ${ECR_REPO}:${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}
                """
            }
        }

        stage('Login to AWS ECR') {
            environment {
                AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
                AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
            }
            steps {
                sh """
                aws configure set region ${AWS_REGION}
                aws ecr get-login-password --region ${AWS_REGION} \
                    | docker login --username AWS \
                    --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                """
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}"
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_HOST} \
                        "docker compose -f ${COMPOSE_PATH} pull && docker compose -f ${COMPOSE_PATH} up -d"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Deployment Successful!"
        }
        failure {
            echo "Deployment FAILED. Check logs."
        }
    }
}
