import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Button from "../../Component/Button";
import { TodoItem } from "../Todo/Todo";
import { todoItemState } from "../../recoil/atoms";
import ResultPostItem from "../../Component/ResultPostItem";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const { REACT_APP_KAKAO_KEY } = process.env;
const { Kakao } = window;

function Result() {
  const [todoItem] = useRecoilState<TodoItem[]>(todoItemState);
  console.log(todoItem);

  // const realUrl = "https://tostit.vercel.app/todo/result"; //배포사이트
  const resultUrl = window.location.href; // 현재 url 가져오기

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
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "오늘의 한 일",
        imageUrl: "https://ifh.cc/g/rp3SdN.png",
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      itemContent: {
        profileText: "Tost It",
        profileImageUrl: "https://ifh.cc/g/rp3SdN.png",
        items: [
          {
            item: "Cake1",
            itemOp: "저녁",
          },
          {
            item: "Cake2",
            itemOp: "저녁",
          },
        ],
      },
      buttons: [
        {
          title: "나머지 한 일 목록 구경하기",
          link: {
            mobileWebUrl: resultUrl,
            webUrl: resultUrl,
          },
        },
      ],
    });
  };
  return (
    <div className="bg-main_skyblue flex flex-col justify-center items-center h-screen">
      <section className="bg-main_bg_cloud max-w-7xl w-98 rounded-xl h-600 relative">
        <div className="sticky top-0 pb-5 rounded-t-xl bg-main_bg_cloud ">
          <h1 className=" text-center pt-9 text-3xl font-semibold ">
            오늘 한 일 목록 공유하기
          </h1>
        </div>
        <ul className="h-fit max-h-450 pt-11 pb-5 pr-10 pl-10 grid grid-cols-2 gap-4 overflow-y-scroll">
          {todoItem.map((postIt) => {
            return (
              <ResultPostItem key={postIt.id} timeTypes={postIt.todo.slice(-1)}>
                {postIt.todo.slice(0, -1)}
              </ResultPostItem>
            );
          })}
        </ul>
      </section>
      <div className="mt-3">
        <Button size="large" onClick={handleShareKaKao}>
          친구에게 공유하기
        </Button>
      </div>
    </div>
  );
}

export default Result;
