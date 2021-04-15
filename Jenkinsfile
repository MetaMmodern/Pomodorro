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
        stage('test api'){
            steps {
                  sh 'npm run server'
                  sh 'npm test api'
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