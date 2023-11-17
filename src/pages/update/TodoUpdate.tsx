import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

import BASE_URL from "../../api/BaseUrl";
import Button from "../../layout/Button";

import "./TodoUpdate.css";

const TodoUpdate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputTitle, setInputTitle] = useState("");
  const [textareaContent, setTextareaContent] = useState("");
  const [inputDeadline, setInputDeadline] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [inputImportant, setInputImportant] = useState(false);

  // 쿼리스트링 값 가져오기
  const queryParams = new URLSearchParams(location.search);
  const _id = queryParams.get("_id");

  // axios 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const res = (await axios<TodoItem>(`${BASE_URL}/${_id}`)).data;

      setInputTitle(res.title);
      setTextareaContent(res.content);
      setInputDeadline(res.deadline);
      setInputImportant(res.important);
    };

    fetchData();
  }, [_id]);

  // 폼 submit
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      title: inputTitle,
      content: textareaContent,
      deadline: inputDeadline,
      important: inputImportant,
    };

    const res = await axios.patch<TodoResponse | TodoErrorResponse>(
      `${BASE_URL}/${_id}`,
      body
    );

    if (res.status === 200) {
      alert("수정되었습니다");
      navigate(`/info?_id=${_id}`);
    } else if (res.status === 500) {
      alert("서버에 오류가 발생했습니다. 나중에 다시 시도하세요");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;

    switch (id) {
      case "update-input-title":
        setInputTitle(value);
        break;
      case "update-textarea-content":
        setTextareaContent(value);
        break;
      case "update-input-deadline":
        setInputDeadline(value);
        break;
      case "update-input-important":
        setInputImportant(!inputImportant);
        break;
      default:
        break;
    }
  };

  return (
    <div id="page">
      <div id="update-contents">
        <form id="update-todo-form" onSubmit={handleEdit}>
          <div className="update-title-box">
            <label
              htmlFor="update-input-title"
              className="label-title update-register-label"
            >
              제목
            </label>
            <input
              type="text"
              value={inputTitle}
              onChange={handleChange}
              id="update-input-title"
              className="update-register-input"
              required
            />
          </div>
          <div className="update-content-box">
            <label
              htmlFor="update-textarea-content"
              className="update-label-content update-register-label"
            >
              내용
            </label>
            <textarea
              id="update-textarea-content"
              value={textareaContent}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="update-deadline-box">
            <label
              htmlFor="update-input-deadline"
              className="update-label-deadline update-register-label"
            >
              완료날짜
            </label>
            <input
              type="date"
              value={inputDeadline}
              onChange={handleChange}
              id="update-input-deadline"
              className="update-register-input"
            />
          </div>
          <div className="update-important-box">
            <label
              htmlFor="update-input-important"
              className="update-label-important update-register-label"
            >
              중요
              <input
                type="checkbox"
                checked={inputImportant}
                onChange={handleChange}
                id="update-input-important"
                className="update-register-input"
                name="input-important"
              />
              <span className="update-check-true"></span>
            </label>
          </div>
          <div className="update-active-box">
            <Button className="submit-button" type="submit" text="수정완료" />
            <Button
              className="cancel-button"
              type="button"
              text="취소"
              handleClick={() => navigate(`/info?_id=${_id}`)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoUpdate;
