pipeline {
    agent any

    environment {
        AZURE_SUBSCRIPTION_ID = "a665d3d8-048d-4a65-8279-87e932930ebc"
        AZURE_RESOURCE_GROUP = "jenkins-new-rg"
        AZURE_WEBAPP_NAME = "yumin540app9999"
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

                    az account set --subscription $AZURE_SUBSCRIPTION_ID
                    '''
                }
            }
        }

        stage('Package App') {
            steps {
                sh '''
                python3 - <<'PY'
import os, zipfile

with zipfile.ZipFile("app.zip", "w", zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk("."):
        dirs[:] = [d for d in dirs if d not in [".git", "node_modules"]]
        for f in files:
            if f == "app.zip":
                continue
            path = os.path.join(root, f)
            z.write(path, os.path.relpath(path, "."))
PY
                ls -lh app.zip
                '''
            }
        }

        stage('Set Startup Command') {
            steps {
                sh '''
                az webapp config set \
                  --name $AZURE_WEBAPP_NAME \
                  --resource-group $AZURE_RESOURCE_GROUP \
                  --startup-file "npm start"
                '''
            }
        }

        stage('Deploy to Azure') {
            steps {
                sh '''
                az webapp deployment source config-zip \
                  --resource-group $AZURE_RESOURCE_GROUP \
                  --name $AZURE_WEBAPP_NAME \
                  --src app.zip
                '''
            }
        }

    }
}
