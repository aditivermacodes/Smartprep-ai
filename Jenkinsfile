
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

        stage('Build Docker Images') {
            steps {
                bat 'docker build -t aditivermacodes/smartprep-server:%BUILD_NUMBER% -t aditivermacodes/smartprep-server:latest ./server'

                bat 'docker build --build-arg VITE_API_URL=%VITE_API_URL% -t aditivermacodes/smartprep-client:%BUILD_NUMBER% -t aditivermacodes/smartprep-client:latest ./client'
            }
        }

        

        stage('Test Docker Hub Authentication') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_TOKEN'
                )]) {
                    bat '''
                        @echo off
                        powershell.exe -NoProfile -NonInteractive -Command "$psi = New-Object System.Diagnostics.ProcessStartInfo; $psi.FileName = 'docker'; $psi.Arguments = 'login --username ' + $env:DOCKER_USER + ' --password-stdin'; $psi.UseShellExecute = $false; $psi.RedirectStandardInput = $true; $p = [System.Diagnostics.Process]::Start($psi); $p.StandardInput.WriteLine($env:DOCKER_TOKEN); $p.StandardInput.Close(); $p.WaitForExit(); exit $p.ExitCode"
                    '''
                }
            }
        }

    }

    post {
        success {
            echo 'SmartPrep AI CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'SmartPrep AI CI/CD Pipeline failed. Check the Console Output.'
        }
    }
}
