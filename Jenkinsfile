pipeline {
    agent any

    environment {
        AZURE_SUBSCRIPTION_ID = "a665d3d8-048d-4a65-8279-87e932930ebc"
        AZURE_RESOURCE_GROUP = "jenkins-get-started-rg"
        AZURE_WEBAPP_NAME = "yumin540app0323"
        AZURE_TENANT_ID = "00fd09d3-4961-4606-8105-c15bd9e685d3"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Azure Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'jenkins-sp',
                    usernameVariable: 'AZURE_CLIENT_ID',
                    passwordVariable: 'AZURE_CLIENT_SECRET'
                )]) {
                    sh '''
                    az login --service-principal \
                        -u $AZURE_CLIENT_ID \
                        -p $AZURE_CLIENT_SECRET \
                        --tenant $AZURE_TENANT_ID
                    '''
                }
            }
        }

        stage('Deploy to Azure') {
            steps {
                sh '''
                zip -r app.zip .
                az webapp deploy \
                  --resource-group $AZURE_RESOURCE_GROUP \
                  --name $AZURE_WEBAPP_NAME \
                  --src-path app.zip \
                  --type zip
                '''
            }
        }

    }
}
