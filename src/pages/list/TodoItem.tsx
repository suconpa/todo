import React, { useEffect, useState } from "react";
import { FormControlLabel, Checkbox, Switch } from "@mui/material";
import { getTodoList } from "../../api/useFetch";
import ButtonSu from "../../layout/ButtonSu";
import { useLocation } from "react-router-dom";

interface TodoItemProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  onChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ onClick, onChange }) => {

  const [todoDataAll, setTodoDataAll] = useState<TodoList>();
  const [switchChecked, setSwitchChecked] = useState<boolean>(false);

  const changeHandler = () => {
    setSwitchChecked(!switchChecked);
    console.log(!switchChecked);
  };

  useEffect(() => {
    const getTodoListAll = async () => {
      const response = await getTodoList();
      setTodoDataAll(response?.data.items);
      console.log(response);
    };
    getTodoListAll();
  }, []);

  const deleteHandler = () => {};

  return (
    <>
      {todoDataAll?.map((el) => {
        return (
          <div>
            <Switch color="warning" defaultChecked onChange={changeHandler} />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              onChange={onChange}
            />
            <button onClick={onClick}>{el.title}</button>
            <ButtonSu
              color="red"
              children={"삭제하기"}
              onClick={deleteHandler}
            />
          </div>
        );
      })}
    </>
  );
};

export default TodoItem;
