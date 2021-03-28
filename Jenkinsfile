pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('build') {
            steps {
                sh 'npm install --only=dev'
            }
        }
        stage('test'){
            steps {
                  sh 'npm test'
            }
            post {
                success {
                    echo "TESTS ARE OK"
                }
                failure { 
                    echo "TESTS FAILED"
                }
            }
        }
    }
}