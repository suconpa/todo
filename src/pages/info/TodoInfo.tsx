import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import BASE_URL from "../../api/BaseUrl";
import Button from "../../layout/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { getTodoItem } from "../../api/useFetch";

import "./TodoInfo.css";

const TodoInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const _id = params.get("_id");

  const [todoData, setTodoData] = useState({
    title: "",
    content: "",
    deadline: "",
    important: false,
  });
  const [isImportant, setIsImportant] = useState("");

  useEffect(() => {
    const getDetailTodo = async () => {
      const response = await getTodoItem(_id);

      const getDataItem = response.data.item;

      setTodoData({
        title: getDataItem.title,
        content: getDataItem.content,
        deadline: getDataItem.deadline,
        important: getDataItem.important,
      });

      setIsImportant(
        getDataItem.important ? "var(--star-color)" : "var(--gray-color)"
      );
    };

    getDetailTodo();
  }, [_id]);

  const deleteDetailTodo = async () => {
    if (confirm("삭제하시겠습니까?")) {
      const response = await axios.delete(`${BASE_URL}/${_id}`);
      if (response.data.ok === 1) {
        alert("삭제되었습니다!");
        navigate("/");
      }
    }
  };

  return (
    <>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="cancel-button common-button"
      >
        뒤로가기
      </button>
      <div id="contents">
        <div id="detail-container">
          <div className="title-box">
            <h3 id="detail-title">{todoData.title}</h3>
          </div>
          <div className="content-box">
            <p id="detail-content">{todoData.content}</p>
          </div>
          <div className="deadline-box">
            <label
              htmlFor="input-deadline"
              className="label-deadline detail-label"
            >
              완료날짜
            </label>
            <p id="detail-deadline">{todoData.deadline}</p>
          </div>
          <div className="important-box">
            <label htmlFor="input-important" className="detail-label">
              중요
              <span id="detail-important">
                <FontAwesomeIcon icon={faStar} className="important" />
              </span>
            </label>
          </div>
          <div className="active-box">
            <Button
              className="edit-button common-button"
              type="button"
              text="수정"
              handleClick={() => navigate("/edit")}
            />
            <Button
              className="delete-button common-button"
              type="button"
              text="삭제"
              handleClick={() => deleteDetailTodo()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoInfo;
