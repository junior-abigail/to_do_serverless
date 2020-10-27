import uuid
from functools import reduce

import boto3
from boto3.dynamodb.conditions import Attr

from common.decorators import classproperty

dynamodb = boto3.resource("dynamodb")


class BaseModel(object):
    @classproperty
    def table_name(self):
        return "NOT_SET"

    @classproperty
    def table(self):
        if self.table_name == "NOT_SET":
            raise Exception(message="TableName not set")
        return dynamodb.Table(self.table_name)

    def save(self):
        self.id = uuid.uuid4().hex
        self.table.put_item(Item=vars(self))

    @classmethod
    def get(cls, id):
        return cls.table.get_item(Key={"id": id})

    @classmethod
    def find(cls, filters=None):
        if filters:
            expression = cls._build_filter_expression(filters)
            return cls.table.scan(FilterExpression=expression)
        else:
            return cls.table.scan()

    @classmethod
    def _build_filter_expression(cls, filters):
        supported_operators = ["contains", "eq", "ne", "gt", "gte", "lt", "lte"]

        _filters = [f for f in filters.split("::")]
        expressions = []

        for _filter in _filters:
            try:
                attr, operator, value = _filter.split(":")
            except ValueError:
                continue
            if operator not in supported_operators:
                print(f"operator {operator} not in supported_operators")
                continue
            expressions.append(getattr(Attr(attr), operator)(value))
        return reduce(lambda a, b: a & b, expressions)
