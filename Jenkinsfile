pipeline {
  agent any
  environment {
    dockerRegistry = "ganeshnegi/i-ganeshnegi01-${BRANCH_NAME}"
    scannerHome = tool 'SonarQubeScanner'
  }
  tools {
    dockerTool 'docker'
    nodejs 'nodejs'
  }
  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
    buildDiscarder(logRotator(daysToKeepStr: '5', numToKeepStr: '10'))
  }
  stages {
    stage ('build') {
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
        script {
          // Step 1: deploy the image to docker hub
          withDockerRegistry(credentialsId: 'dockerhub', toolName: 'docker') {
              // Build the docker image with tag 'BUILD_NUMBER'
              sh "docker build -t ${dockerRegistry}:${BUILD_NUMBER} --no-cache ."

              // Create a new tag 'latest' for the image
              sh "docker tag ${dockerRegistry}:${BUILD_NUMBER} ${dockerRegistry}:latest"

              // Push images to dockerhub
              sh "docker push ${dockerRegistry}:${BUILD_NUMBER}"
              sh "docker push ${dockerRegistry}:latest"
            
              // Delete the images from the workspace 
              sh "docker rmi ${dockerRegistry}:${BUILD_NUMBER}"
              sh "docker rmi ${dockerRegistry}:latest"
            }

            // Step 2: deploy to kubernates cluster in gcloud
            sh "/Users/nagarro/google-cloud-sdk/bin/kubectl apply -f deployments/${BRANCH_NAME}.yaml"
        }
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