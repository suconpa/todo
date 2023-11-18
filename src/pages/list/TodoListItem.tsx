import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { deleteTodoItem, getTodoList } from "../../api/useFetch";

const TodoListItem: React.FC = () => {
  const [todoItem, setTodoItem] = useState<TodoList>();
  const [updateTodo, setUpdateTodo] = useState<TodoList>();

  useEffect(() => {
    async function todoData() {
      const response = await getTodoList();
      setTodoItem(response!.data.items);
      console.log(response, "부모");
    }

    todoData();
  }, [updateTodo]);

  const deleteHandler = (id: number) => {
    const isConfirmed = confirm("삭제하시겠습니까?");

    if (isConfirmed) {
      deleteTodoItem(id);
      const upDateData = todoItem!.filter((todoData) => {
        return todoData._id !== id;
      });
      setUpdateTodo(upDateData);
    } else {
      alert("삭제가 취소 되었습니다");
    }
  };

  return (
    <>
      {todoItem?.map((el: TodoItem) => {
        return (
          <TodoItem
            key={el._id}
            todoData={el}
            onClick={() => deleteHandler(el._id)}
          />
        );
      })}
    </>
  );
};

export default TodoListItem;
