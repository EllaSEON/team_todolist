import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { todoItemState } from "../recoil/atoms";
import { TodoItem } from "../Pages/Todo";

function SharedBtn() {
  const navigate = useNavigate();
  const [todoItem] = useRecoilState<TodoItem[]>(todoItemState);

  const userId = todoItem.map((item) => {
    return item.userId;
  });

  const handleMoveToResultPage = () => {
    navigate(`/todo/result/${userId[0]}`);
  };

  return (
    <>
      {" "}
      <FontAwesomeIcon
        icon={faShareNodes}
        className="cursor-pointer mr-3 "
        size="xl"
        style={{ color: "#50b4fc" }}
        onClick={handleMoveToResultPage}
      />
    </>
  );
}

export default SharedBtn;
