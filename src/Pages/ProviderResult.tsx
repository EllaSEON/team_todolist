import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Button from "../Component/common/Button";
import { TodoItem } from "./Todo";
import { todoItemState } from "../recoil/atoms";
import ResultPostItem from "../Component/ResultPostItem";
import { useNavigate } from "react-router-dom";
import CommonInnerLayout from "../Component/Layout/CommonInnerLayout";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const { REACT_APP_KAKAO_KEY } = process.env;
const { Kakao } = window;

function ProviderResult() {
  const navigate = useNavigate();
  const [todoItem] = useRecoilState<TodoItem[]>(todoItemState);
  console.log(todoItem);

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

  const realUrl = "https://tostit.vercel.app/result"; //배포사이트
  // const resultUrl = window.location.href; // 현재 url 가져오기

  //재렌더링시에 실행되게 해준다.
  useEffect(() => {
    //init 해주기 전에 clean up 을 해준다.
    Kakao.cleanup();
    // 자신의 js 키를 넣어준다.
    Kakao.init(REACT_APP_KAKAO_KEY);
    //잘 적용되면 true 를 뱉는다.
    console.log(Kakao.isInitialized());
  }, []);

  const handleShareKaKao = () => {
    const items = todoNames.slice(0, 5).map((name, index) => ({
      item: convertedTimeTypes[index],
      itemOp: name,
    }));

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "오늘 나 이런 일 했는데 보러와!",
        imageUrl: "https://ifh.cc/g/xPjPz6.png",
        link: {
          mobileWebUrl: realUrl,
          webUrl: realUrl,
        },
      },
      itemContent: {
        profileText: "Tost It",
        profileImageUrl: "https://ifh.cc/g/aw0qmv.png",
        items: items,
      },
      buttons: [
        {
          title: "나머지 한 일 목록 구경하기",
          link: {
            mobileWebUrl: realUrl,
            webUrl: realUrl,
          },
        },
      ],
    });
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
        <Button size="large" onClick={handleShareKaKao}>
          카카오톡으로 공유하기
        </Button>
        <Button size="large" onClick={handleMovePreviousPage}>
          뒤로가기
        </Button>
      </div>
    </div>
  );
}

export default ProviderResult;
