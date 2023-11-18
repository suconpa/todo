import BaseUrl from "./BaseUrl";
import axios from "axios";

// const BaseUrl = "http://localhost:33088/api";

interface Body {
  title: string;
  content: string;
  deadline: string;
  important: boolean;
  done: boolean;
}

const instant = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

//할일 목록 가져오기
const getTodoList = async () => {
  try {
    const response = await instant.get("/todolist");
    return response;
  } catch (error) {
    console.error("getTodoList에러");
  }
};

//할일 등록하기
const postTodoItem = async (body: Body) => {
  try {
    const response = await instant.post(`/todolist`, body);
    return response;
  } catch (error) {
    console.error("postTodoItem에러");
  }
};

//할일 상세 조회하기
const getTodoItem = async (_id: string | null | undefined) => {
  try {
    const response = await instant.get(`/todolist/${_id}`);
    return response;
  } catch (error) {
    console.error("getTodoItem에러");
  }
};

// 할일 수정하기
const patchTodoItem = async (_id: number) => {
  try {
    const response = await instant.delete(`/todolist/${_id}`);
    return response;
  } catch (error) {
    console.error("patchTodoItem에러");
  }
};

//할일 삭제 하기
const deleteTodoItem = async (_id: number) => {
  try {
    const response = await instant.delete(`/todolist/${_id}`);
    return response;
  } catch (error) {
    console.error("deleteTodoItem 에러");
  }
};
export {
  getTodoList,
  postTodoItem,
  getTodoItem,
  patchTodoItem,
  deleteTodoItem,
};
