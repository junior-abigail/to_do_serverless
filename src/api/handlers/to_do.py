import os
import json

from models import to_do


def create_to_do(event, context):
    data = json.loads(event["body"])
    _to_do = to_do.ToDo(**data)
    _to_do.save()
    return {
        "statusCode": 200,
        "body": json.dumps(vars(_to_do)),
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
        },
    }


def get_to_dos(event, context):
    _filters = (event.get("queryStringParameters") or {}).get("filters")
    _to_dos = to_do.ToDo.find(filters=_filters)
    return {
        "statusCode": 200,
        "body": json.dumps(_to_dos["Items"]),
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,GET",
        },
    }


def get_to_do(event, context):
    _id = event["pathParameters"]["id"]
    _to_do = to_do.ToDo.get(_id)["Item"]
    return {
        "statusCode": 200,
        "body": json.dumps(_to_do),
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,GET",
        },
    }
