import os

from common.decorators import classproperty
from models.base_model import BaseModel


class ToDo(BaseModel):
    @classproperty
    def table_name(self):
        return os.getenv("TABLE_NAME")

    def __init__(self, description, status):
        self.description = description
        self.status = status
