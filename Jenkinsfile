
pipeline {
    agent {
        label 'student-agent'
    }

    environment {
        VITE_API_URL = 'http://localhost:5000'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo 'Source code checked out successfully.'
            }
        }

        stage('Verify Tools') {
            steps {
                bat 'git --version'
                bat 'node --version'
                bat 'npm --version'
                bat 'docker --version'
            }
        }

        stage('Install Client Dependencies') {
            steps {
                dir('client') {
                    bat 'npm install'
                }
            }
        }

        stage('Frontend Lint') {
            steps {
                dir('client') {
                    bat 'npm run lint'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('client') {
                    bat 'npm run build'
                }
            }
        }

        stage('Install Server Dependencies') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }

        stage('Backend Syntax Check') {
            steps {
                dir('server') {
                    bat 'node --check index.js'
                }
            }
        }
    }

    post {
        success {
            echo 'SmartPrep AI CI Pipeline completed successfully!'
        }

        failure {
            echo 'SmartPrep AI CI Pipeline failed. Check the Console Output.'
        }
    }
}
