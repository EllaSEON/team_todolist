import { MouseEvent } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../Component/Button";
import PostItem from "../../Component/PostItem";
import SelectInputBox from "../../Component/SelectInputBox";
import Loading from "../Loading/Loading";
import { customAuthAxios } from "../../API/customAxios";
import Logout from "../../assets/images/logout.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { tokenState, todoItemState } from "../../recoil/atoms";
import KakaoShare from "../../Component/SharedBtn";

export interface TodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  useId: number;
}

function Todo() {
  const [showInp, setShowInp] = useState<boolean>(false);
  const [todoItem, setTodoItem] = useRecoilState<TodoItem[]>(todoItemState);
  const [isLoading, setIsLoading] = useState(true);
  const setToken = useSetRecoilState(tokenState);

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

  const handleRefresh = () => {
    location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken("");
    navigate("/");
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="bg-main_skyblue flex flex-col justify-center items-center h-screen">
        <aside className="w-98 text-right mr-5 mb-5">
          <KakaoShare />
          <FontAwesomeIcon
            icon={faHouse}
            className="cursor-pointer mr-3 "
            style={{ color: "#50b4fc" }}
            size="xl"
            onClick={handleRefresh}
          />
          <img
            src={Logout}
            alt="로그아웃"
            className="w-6 cursor-pointer inline"
            onClick={handleLogout}
          />
        </aside>
        <section className="bg-main_bg_cloud max-w-7xl w-98 rounded-xl h-600 relative">
          <div className="sticky top-0 pb-5 rounded-t-xl bg-main_bg_cloud ">
            <h1
              className="font-mono pl-10 pt-9 text-3xl font-semibold cursor-pointer"
              onClick={handleRefresh}
            >
              Today
            </h1>
            <p className="font-mono  pl-10 pt-3 text-sm">
              What are you working on today?
            </p>
          </div>
          <ul className="h-fit max-h-450 pt-5 pb-5 pr-10 pl-10 grid grid-cols-2 gap-4 overflow-y-scroll">
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
          </ul>
        </section>
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
      </div>
    );
  }
}

export default Todo;
