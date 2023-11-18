import React, { useEffect, useState } from "react";
import { FormControlLabel, Checkbox, Switch } from "@mui/material";
import { deleteTodoItem, getTodoList } from "../../api/useFetch";
import ButtonSu from "../../layout/ButtonSu";
import { useNavigate } from "react-router-dom";

interface TodoItemProps {
  // onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  onClick?: () => void;
  children?: React.ReactNode;
  onChange?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  todoData: TodoItem;
}

const TodoItem: React.FC<TodoItemProps> = ({ todoData, onClick }) => {
  const [switchChecked, setSwitchChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const changeHandler = () => {
    setSwitchChecked(!switchChecked);
  };

  // const deleteHandler = () => {
  //   deleteTodoItem(todoData._id);
  //   console.log({ todoData }, "자식");
  // };

  const HandleClick = () => {
    navigate(`/Todoinfo/${todoData._id}`);
  };
  return (
    <>
      <div>
        <Switch
          color="warning"
          defaultChecked={todoData.important}
          onChange={changeHandler}
        />
        <FormControlLabel control={<Checkbox defaultChecked />} />
        <button onClick={HandleClick}>{todoData.title}</button>
        <ButtonSu color="red" children={"삭제하기"} onClick={onClick} />
      </div>
    </>
  );
};

export default TodoItem;
