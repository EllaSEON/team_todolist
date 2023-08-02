import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import SignIn from "../Pages/Signin";
import SignUp from "../Pages/Signup";
import Splash from "../Pages/Splash";
import Todo from "../Pages/Todo";
import NotFound from "../Pages/NotFound";
import Category from "../Pages/Category";
import ProviderResult from "../Pages/ProviderResult";
import ConsumerResult from "../Pages/ConsumerResult";
import { tokenState } from "../recoil/atoms";
import CommonOuterLayout from "../Component/Layout/CommonOuterLayout";

export default function Router() {
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/result" element={<ConsumerResult />} />

        {token ? (
          <>
            <Route element={<CommonOuterLayout />}>
              <Route path="/todo" element={<Todo />} />
              <Route path="/todo/category" element={<Category />} />
              <Route path="/todo/result/:userId" element={<ProviderResult />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
