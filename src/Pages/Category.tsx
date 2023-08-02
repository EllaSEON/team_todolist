import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "../Component/Button";
import PostItem from "../Component/PostItem";
import { TodoItem } from "./Todo";
import { todoItemState } from "../recoil/atoms";
import CommonInnerLayout from "../Component/Layout/CommonInnerLayout";

function Category() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [todoItem, setTodoItem] = useRecoilState(todoItemState);
  const timeState = useRef("");

  useEffect(() => {
    if (state === "아침") {
      timeState.current = "morning";
      setTodoItem(
        todoItem.filter((postIt: TodoItem) => {
          return postIt.todo.slice(-1) === "1";
        })
      );
    } else if (state === "점심") {
      timeState.current = "afternoon";
      setTodoItem(
        todoItem.filter((postIt: TodoItem) => {
          return postIt.todo.slice(-1) === "2";
        })
      );
    } else if (state === "저녁") {
      timeState.current = "evening";
      setTodoItem(
        todoItem.filter((postIt: TodoItem) => {
          return postIt.todo.slice(-1) === "3";
        })
      );
    }
  }, [state]);

  return (
    <>
      <CommonInnerLayout title={timeState.current}>
        {todoItem.map((postIt: TodoItem) => {
          return (
            <PostItem
              key={postIt.id}
              todoId={postIt.id}
              todoList={todoItem}
              setTodoList={setTodoItem}
              isCompleted={postIt.isCompleted}
            >
              {postIt.todo}
            </PostItem>
          );
        })}
      </CommonInnerLayout>
      <Button
        size="large"
        onClick={() => {
          navigate("/todo");
        }}
      >
        이전으로
      </Button>
    </>
  );
}

export default Category;
