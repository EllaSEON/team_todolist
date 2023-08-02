import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../recoil/atoms";
import Logout from "../assets/images/logout.svg";

function LogoutBtn() {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenState);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken("");
    navigate("/");
  };
  return (
    <>
      <img
        src={Logout}
        alt="로그아웃"
        className="w-6 cursor-pointer inline"
        onClick={handleLogout}
      />
    </>
  );
}

export default LogoutBtn;
