#!/bin/bash

set -e

echo "Deploying React app to S3 and CloudFront..."

# Read from GitHub Actions environment
AWS_REGION=${AWS_REGION}
UI_STACK_NAME=${UI_STACK_NAME}
UI_BUCKET_NAME=${UI_BUCKET_NAME}
if [[ -z "$AWS_REGION" || -z "$STACK_NAME" || -z "$UI_BUCKET_NAME" ]]; then
  echo "Failed to retrieve GitHub Actions environment variables."
  exit 1
fi

echo "AWS Region: $AWS_REGION"
echo "Stack Name: $UI_STACK_NAME"
echo "Bucket Name: $UI_BUCKET_NAME"

echo "Building the React project..."

# Get CloudFront ID from CloudFormation outputs
CLOUDFRONT_DISTRIBUTION_ID=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionID']|[0].OutputValue" --output text)
cd ui/

aws s3 sync dist/ s3://$UI_BUCKET_NAME --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"

cd ..