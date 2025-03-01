import json
import os
import boto3
import uuid
from datetime import datetime

dynamodb = boto3.resource("dynamodb")
furniture_table = dynamodb.Table(os.environ["FURNITURE_TABLE"])
user_table = dynamodb.Table(os.environ["USER_TABLE"])

def lambda_handler(event, context):
    try:
        body = json.loads(event.get("body", "{}"))
        table_type = body.get("table", "furniture")  # Default to furniture table
        item_data = body.get("data", {})

        if not item_data:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Missing data in request body"})
            }

        item = {
            "PK": str(uuid.uuid4()),
            "SK": f"ITEM#{datetime.utcnow().isoformat()}",
            **item_data
        }

        if table_type == "furniture":
            furniture_table.put_item(Item=item)
        elif table_type == "user":
            user_table.put_item(Item=item)
        else:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Invalid table type. Use 'furniture' or 'user'"})
            }

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Item added successfully", "item": item})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Error adding item", "error": str(e)})
        }

