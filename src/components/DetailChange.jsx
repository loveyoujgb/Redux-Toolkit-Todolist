import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos, __putTodos } from "../redux/modules/todosSlice";
import styled from "styled-components";
// import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./elements/Button";

const DetailChange = () => {

  const param = useParams();
  const { isLoading, error, todos } = useSelector((state) => state.todos);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [content, setContent] = useState("")

  const [updateContent, setUpdateContent] = useState("");

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const handleContent = (e) => {
    // document.getElementById("content")
    //     .addEventListener("input", (event) => alert("change!"))
    setUpdateContent(e.target.value);
  };

  const onSubmitHandler = () => {
    console.log(updateContent)
    dispatch(
      __putTodos({
        id: param.id,
        content: updateContent,
      }
    ))
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <DetailTotal onSubmit={onSubmitHandler}>
      <DetailContainer >
        <DetailTop>
          <div>
            {todos.map((todo) => (
              <div key={todo.id}>{todo.title}</div>
            ))}
          </div>
        </DetailTop>
        <StTextArea>
          <div>
            {todos.map((todo) => (
                <textarea
                  key={todo.id}
                  // className="content"
                  onChange={handleContent}
                  rows="10"
                  maxLength="200"
                  style={{ border: "1px solid rgb(238,238,238)", padding: "12px", fontSize: "14px", width: "100%" }}
                >
                  {todo.content}
                </textarea>
            ))}
          </div>
        </StTextArea>
        <DetailBottom>
          <Button
            type="submit"
            bordercolor="rgb(221,221,221)"
            bgcolor="white"
            width="100%"
            height="50px"
            onClick={() =>{
              // navigate(`/detail/${param.id}`);
            }}
          >
            저장
          </Button>
        </DetailBottom>
      </DetailContainer>
      <DetailComment onClick={() => { }}>눌러서 댓글보기</DetailComment>
    </DetailTotal>
  );
};
export default DetailChange;

const DetailTotal = styled.form``;

const DetailContainer = styled.div`
  /* height: calc(100vh - 45px); */
  background-color: rgb(255, 255, 255);
  padding: 24px;
`;

const DetailTop = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 32px;
`;

const StTextArea = styled.div``;
const DetailBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 50px;
  min-height: 550px;
`;

const DetailComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 50px;
  padding: 0px 12px;
  border-top: 1px solid rgb(238, 238, 238);
`;
