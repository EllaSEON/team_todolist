import { MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../Component/common/Button";
import PostItem from "../Component/PostItem";
import SelectInputBox from "../Component/SelectInputBox";
import Loading from "./Loading";
import { customAuthAxios } from "../API/customAxios";
import { todoItemState } from "../recoil/atoms";
import SharedBtn from "../Component/SharedBtn";
import CommonInnerLayout from "../Component/Layout/CommonInnerLayout";
import LogoutBtn from "../Component/LogoutBtn";
import HomeBtn from "../Component/HomeBtn";
import WeatherBtn from "../Component/WeatherBtn";

export interface TodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

function Todo() {
  const [showInp, setShowInp] = useState<boolean>(false);
  const [todoItem, setTodoItem] = useRecoilState<TodoItem[]>(todoItemState);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleShowInput = () => {
    setShowInp(true);
  };

  const getTodo = async () => {
    try {
      const todoRes = await customAuthAxios.get("todos");
      if (todoRes) {
        setTodoItem(todoRes.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const handleViewCategory = (e: MouseEvent<HTMLButtonElement>) => {
    const timeCategory = e.currentTarget.innerText;
    navigate("/todo/category", {
      state: timeCategory,
    });
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <aside className="flex justify-end w-98  mr-5 mb-5">
          <WeatherBtn />
          <SharedBtn />
          <HomeBtn />
          <LogoutBtn />
        </aside>
        <CommonInnerLayout
          title="Today"
          description=" What are you working on today?"
        >
          {todoItem.map((postIt) => {
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
        {!showInp && (
          <section className="w-96  mt-5 flex-row text-lx">
            <Button size="small" onClick={handleViewCategory}>
              아침
            </Button>
            <Button size="small" onClick={handleViewCategory}>
              점심
            </Button>
            <Button size="small" onClick={handleViewCategory}>
              저녁
            </Button>
            <Button size="medium" onClick={handleShowInput}>
              오늘의 할 일
            </Button>
          </section>
        )}

        {showInp && (
          <section className="w-96  mt-5 flex-row text-lx">
            <SelectInputBox todoList={todoItem} setTodoList={setTodoItem} />{" "}
          </section>
        )}
      </>
    );
  }
}

export default Todo;
