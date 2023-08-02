import { Outlet } from "react-router-dom";
function CommonOuterLayout() {
  return (
    <div className="bg-main_skyblue flex flex-col justify-center items-center h-screen">
      <Outlet />
    </div>
  );
}

export default CommonOuterLayout;
