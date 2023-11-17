import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import BASE_URL from "../../api/BaseUrl";
import Button from "../../layout/Button";

import "./TodoRegist.css";

import useStore from "../../store/todoStore";

const TodoRegist: React.FC = () => {
  //zustand 로 상태값 관리하기
  const { fetchData2 } = useStore();

  const navigate = useNavigate();
  const [inputTitle, setInputTitle] = useState("");
  const [textareaContent, setTextareaContent] = useState("");
  const [inputDeadline, setInputDeadline] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [inputImportant, setInputImportant] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;

    switch (id) {
      case "regist-input-title":
        setInputTitle(value);
        break;
      case "regist-textarea-content":
        setTextareaContent(value);
        break;
      case "regist-input-deadline":
        setInputDeadline(value);
        break;
      case "regist-input-important":
        setInputImportant(!inputImportant);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = {
      title: inputTitle,
      content: textareaContent,
      deadline: inputDeadline,
      important: inputImportant,
      done: false,
    };

    const res = await axios.post<TodoResponse | TodoErrorResponse>(
      `${BASE_URL}`,
      body
    );

    if (res.status === 200) {
      alert("등록이 정상적으로 완료되었습니다.");
      fetchData2();
      navigate("/");
    } else if (res.status === 500) {
      alert("서버에 오류가 발생했습니다. 나중에 다시 시도하세요");
    }
  };

  return (
    <div id="page">
      <div id="regist-contents">
        <form id="regist-todo-form" onSubmit={handleSubmit}>
          <div className="regist-title-box">
            <label
              htmlFor="regist-input-title"
              className="label-title regist-register-label"
            >
              제목
            </label>
            <input
              type="text"
              value={inputTitle}
              onChange={handleChange}
              id="regist-input-title"
              className="regist-register-input"
              placeholder="할일의 제목을 입력하세요"
              required
            />
          </div>
          <div className="regist-content-box">
            <label
              htmlFor="regist-textarea-content"
              className="regist-label-content regist-register-label"
            >
              내용
            </label>
            <textarea
              value={textareaContent}
              onChange={handleChange}
              id="regist-textarea-content"
              placeholder="할일의 상세 내용을 입력하세요"
              required
            ></textarea>
          </div>
          <div className="regist-deadline-box">
            <label
              htmlFor="regist-input-deadline"
              className="regist-label-deadline regist-register-label"
            >
              완료날짜
            </label>
            <input
              type="date"
              value={inputDeadline}
              onChange={handleChange}
              id="regist-input-deadline"
              className="regist-register-input"
            />
          </div>
          <div className="regist-important-box">
            <label
              htmlFor="regist-input-important"
              className="regist-label-important regist-register-label"
            >
              중요
              <input
                type="checkbox"
                checked={inputImportant}
                onChange={handleChange}
                id="regist-input-important"
                className="regist-register-input"
                name="input-important"
              />
              import useStore from '../../store/todoStore';
              <span className="regist-check-true"></span>
            </label>
          </div>
          <div className="regist-active-box">
            <Button className="submit-button" type="submit" text="등록" />
            <Button
              className="cancel-button"
              type="button"
              text="취소"
              handleClick={() => navigate("/")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoRegist;
