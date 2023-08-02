import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function SharedBtn() {
  const navigate = useNavigate();

  const handleMoveToResultPage = () => {
    navigate(`/todo/result`);
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
