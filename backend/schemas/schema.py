from graphene import ObjectType, Int, String, DateTime

class Todo(ObjectType):
   id = Int()
   title = String()
   description = String()
   todo_time = String()
   image = String()

   