# Slack2Whatsapp

Log public Slack messages from a Slack Workspace to a Whatsapp Group.

Implemented serverlessly with [AWS Lambda](https://aws.amazon.com/lambda/), [AWS API Gateway](https://aws.amazon.com/api-gateway/), and the [Wassenger API](https://wassenger.com/).

## Setup

#### AWS Lambda

-   Create a new Lambda function with the code from [index.js].
-   Comment out the variables that use environmental variables, and uncomment the validation code.

#### AWS API Gateway

-   Create a new REST API in API Gateway
-   Create a POST method and name the Lambda function from above as the integration point.
-   Deploy the API and note the Invoke URL.

#### Slack

-   Create a new app at [https://api.slack.com/apps] for your workspace.
-   Under 'Event Subscriptions' add the API Gateway Invoke URL.
-   Slack will immediately send a verification code to the Lambda function. If done correctly, the Request URL will be indicated as 'Verified'.
-   Go to 'OAuth & Permissions' and note your OAuth Access Token. This will be used in the environmental variable section of the Lambda function.

#### Wassenger

-   Link your WhatsApp account to Wassenger and note your API token and ID of the chat group for logging. These will also be used in the environmental variable section of the Lambda function.

#### AWS Lambda

-   The validation code can be deleted. Uncomment the environmental variables in the code and add the actual values below the code editor under 'Environmental variables'.

## Files

[.vscode] - Settings to run the lambda function locally in VS Code. Create your own .env file with the environmental variables listed above to test locally.
[.eslintrc.json] - Using ESLint for linting.
[.packignore] - For the npm dev dependency 'repack-zip' that zips up all required files for uploading to Lambda.
[.prettierrc.json] - Formatting code with Prettier.
[index.js] - Lambda function.
[localEvent.js] - A test for running the lambda function locally.
[localRun.js] - The event for running the lambda function locally.
[package.json] - For node. Can run repack-zip with the command 'npm run build'.
