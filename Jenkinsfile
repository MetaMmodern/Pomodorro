pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm install --only=dev'
            }
        }
        stage('test'){
          sh 'npm test'
        }
        post{
            success{
                echo "TESTS ARE OK"
            }
            failure{
                echo "TESTS FAILED"
            }
        }
    }
}