from graphene import ObjectType, Schema, Field, Int, String, List, Mutation, Boolean
from schemas.schema import Todo
from datetime import datetime
from data.data import TODOS

class Query(ObjectType):
   all_todo = List(Todo)
   
   def resolver_all_todos(self, info):
      return TODOS

class CreateTodo(Mutation):
    class Arguments:
        id = Int()
        title = String(required=True)
        description = String(required=True)
        todo_time = String()
        image = String()

    todo = Field(lambda: Todo)

    def mutate(self, info, title, description):
        todo = Todo(id=len(TODOS)+1, title=title,
                    description=description, todo_time="DEFAULT_TIME", image="DEFAULT_IMAGE")
        TODOS.append(todo)
        return CreateTodo(todo=todo)


class UpdateTodo(Mutation):
    class Arguments:
        id = Int(required=True)
        title = String()
        description = String()
        todo_time = String()
        image = String()

    todo = Field(lambda: Todo)

    def mutate(self, info, id, title=None, description=None, todo_time=None, image=None):
        todo = next((todo for todo in TODOS if todo.id == id), None)
        if not todo:
            raise Exception("Not found")

        if title:
            todo.title = title
        if description:
            todo.description = description
        if todo_time:
            todo.todo_time = todo_time
        if image:
            todo.image = image

        return UpdateTodo(todo=todo)


class DeleteTodo(Mutation):
    class Arguments:
        id = Int(required=True)

    success = Boolean()

    def mutate(self, info, id):
        global TODOS
        TODOS = [todo for todo in TODOS if todo.id != id]
        return DeleteTodo(success=True)


class TodoMutation(ObjectType):
    create_todo = CreateTodo.Field()
    update_todo = UpdateTodo.Field()
    delete_todo = DeleteTodo.Field()
