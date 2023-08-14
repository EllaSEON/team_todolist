import { useRecoilState } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Component/common/Button";
import { TodoItem } from "./Todo";
import { todoItemState } from "../recoil/atoms";
import ResultPostItem from "../Component/ResultPostItem";
import { useNavigate } from "react-router-dom";
import CommonInnerLayout from "../Component/Layout/CommonInnerLayout";
import KakaoSharedBtn from "../Component/KaKaoSharedBtn";

function ProviderResult() {
  const navigate = useNavigate();
  const [todoItem] = useRecoilState<TodoItem[]>(todoItemState);
  // console.log(todoItem);

  const completedTodos = todoItem.filter((item) => {
    return item.isCompleted === true;
  });

  const todoNames = completedTodos.map((item) => item.todo.slice(0, -1));
  const timeTypes = completedTodos.map((item) => {
    return item.todo.slice(-1);
  });

  const convertedTimeTypes = timeTypes.map((timeType) => {
    switch (timeType) {
      case "1":
        return "아침";
      case "2":
        return "점심";
      case "3":
        return "저녁";
      default:
        return "알 수 없음"; // 기본값 처리 (필요에 따라 변경 가능)
    }
  });

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText("https://tostit.vercel.app/result");
      toast.success("url이 복사되었습니다.");
    } catch (error: any) {
      toast.error("url 복사 실패");
    }
  };

  const handleMovePreviousPage = () => {
    navigate(-1);
  };

  return (
    <div className="bg-main_skyblue flex flex-col justify-center items-center h-screen">
      <CommonInnerLayout
        title="오늘 내가 한 일 자랑하러가기😎"
        textSize="text-2xl"
      >
        {completedTodos.map((postIt) => {
          return (
            <ResultPostItem key={postIt.id} timeTypes={postIt.todo.slice(-1)}>
              {postIt.todo.slice(0, -1)}
            </ResultPostItem>
          );
        })}
      </CommonInnerLayout>
      <div className="flex flex-col gap-y-3 mt-3 ">
        <KakaoSharedBtn
          todoNames={todoNames}
          convertedTimeTypes={convertedTimeTypes}
        />
        <Button size="large" onClick={handleCopyUrl}>
          url 복사하기
        </Button>
        <Button size="large" onClick={handleMovePreviousPage}>
          뒤로가기
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProviderResult;
