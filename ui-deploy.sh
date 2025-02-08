#!/bin/bash

STACK_NAME="react-app-stack"

# Get S3 bucket name and CloudFront ID from CloudFormation outputs
S3_BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text)
CLOUDFRONT_DISTRIBUTION_ID=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionID']|[0].OutputValue" --output text)

if [[ -z "$S3_BUCKET_NAME" || -z "$CLOUDFRONT_DISTRIBUTION_ID" ]]; then
  echo "Failed to retrieve CloudFormation outputs. Make sure the stack exists."
  exit 1
else
  echo "S3 bucket name: $S3_BUCKET_NAME"
  echo "CloudFront distribution ID: $CLOUDFRONT_DISTRIBUTION_ID"
fi

echo "Building the React project..."
cd ui
npm run build

echo "Deploying to S3 bucket: $S3_BUCKET_NAME"
aws s3 sync dist/ s3://$S3_BUCKET_NAME --delete

echo "Invalidating CloudFront cache..."
echo $CLOUDFRONT_DISTRIBUTION_ID
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

echo "Deployment complete! 🚀"
