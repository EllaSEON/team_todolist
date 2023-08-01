import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/atoms";

function Splash() {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    setTimeout(() => {
      if (!token) {
        navigate("/signin");
      } else {
        navigate("/todo");
      }
    }, 2000);
  }, [token, navigate]);

  return (
    <div className="bg-main_skyblue flex flex-col justify-center items-center h-screen">
      <h1 className="animate-bounce text-6xl font-mono font-bold text-center	">
        Tost It
      </h1>
      <p className="animate-bounce">
        아침/점심/저녁의 할일을 포스트잇에 붙여보세요~
      </p>
    </div>
  );
}

export default Splash;
