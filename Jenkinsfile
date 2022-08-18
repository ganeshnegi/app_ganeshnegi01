pipeline {
  agent any
  environment {
    scannerHome = tool 'SonarQubeScanner'
  }
  tools {
    nodejs 'nodejs'
  }
  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
    buildDiscarder(logRotator(daysToKeepStr: '5', numToKeepStr: '10'))
  }
  stages {
    stage ('Build') {
      steps {
        sh "npm install"
      }
    }
    stage ('Sonarqube Analysis') {
      when {
        branch 'develop'
      }
      steps {
        script {
          withSonarQubeEnv('Test_Sonar') {
            sh '${scannerHome}/bin/sonar-scanner'
          }
        }
      }
    }
    stage ('Test case execution') {
      when {
        branch 'master'
      }
      steps {
          sh 'npm test'
      }
    }
    stage ('Kubernetes Deployment') {
      steps {
        sh "kubectl apply -f K8s-deployment/${BRANCH_NAME}.yaml"
      }
    }
  }
  post {
    // Clean after build
    always {
      cleanWs()
    }
  }
}
