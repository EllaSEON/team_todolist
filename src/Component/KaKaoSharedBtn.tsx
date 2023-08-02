import { useEffect } from "react";
import Button from "./common/Button";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const { REACT_APP_KAKAO_KEY } = process.env;
const { Kakao } = window;

interface KakaoSharedBtnProps {
  todoNames: string[];
  convertedTimeTypes: string[];
}

function KakaoSharedBtn({
  todoNames,
  convertedTimeTypes,
}: KakaoSharedBtnProps) {
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

  return (
    <div>
      {" "}
      <Button size="large" onClick={handleShareKaKao}>
        카카오톡으로 공유하기
      </Button>
    </div>
  );
}

export default KakaoSharedBtn;
