import React from "react";
import { Link } from "react-router-dom";

import "./TodoListItem.css"

export interface ItemProps {
  key: number;
  isCompleteCheck: (
    e: React.ChangeEvent<HTMLInputElement>,
    important: boolean,
    _id: number
  ) => void;
  deleteItem: (
    _id: number,
    important: boolean
  ) => void;
  importantItem: (
    btn: React.MouseEvent<HTMLButtonElement>,
    _id: number,
    important: boolean
  ) => void;
  todo: TodoItem;
}

const TodoListItem: React.FC<ItemProps> = ({ isCompleteCheck, deleteItem, importantItem, todo }) => {
  return (
    <li className="todo-item">
      <button
        type="button"
        className={`todo-item--important-button ${todo.important ? 'fill' : ''}`}
        onClick={(e) => importantItem(e, todo._id, todo.important)}
      ></button>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => isCompleteCheck(e, todo.important, todo._id)}
        className="todo-item--checkbox"
      />
      <Link to={`/info?_id=${todo._id}`} className="todo-item--todoInfo-link">
        {todo.title}
      </Link>
      <button
        className="todo-item--delete-button"
        onClick={() => deleteItem(todo._id, todo.important)}
      ></button>
    </li>
  );
};

export default TodoListItem;
