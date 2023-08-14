import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../recoil/atoms";
import logo from "../assets/images/Logo.svg";

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
    <div className="bg-main_skyblue">
      <div className=" flex flex-col justify-center items-center h-screen">
        <img
          src={logo}
          alt="투스트잍 로고"
          className="w-52 h-52 animate-pulse"
        />
        <p className="mt-5 text-xl font-bold text-center animate-bounce">
          투스트잍에 오늘의 할일을 <br />
          아침 점심 저녁으로 나눠보자
        </p>
      </div>
    </div>
  );
}

export default Splash;
