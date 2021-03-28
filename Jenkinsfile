pipeline {
    agent any
    options {
        ansiColor('xterm')
    }
    environment { 
        homepage = 'https://evening-mesa-44346.herokuapp.com/'
    }
    tools {nodejs "node"}
    stages {
        stage('build') {
            steps {
                sh 'npm install'
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