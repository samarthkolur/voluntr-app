pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps { git 'https://github.com/YOUR_USER/YOUR_REPO.git' }
        }

        stage('Build') {
            steps {
                echo "Your build steps go here"
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                echo "scp/ssh deploy commands here"
            }
        }
    }
}
