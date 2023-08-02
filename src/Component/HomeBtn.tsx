import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function HomeBtn() {
  const handleRefresh = () => {
    location.reload();
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faHouse}
        className="cursor-pointer mr-3 "
        style={{ color: "#50b4fc" }}
        size="xl"
        onClick={handleRefresh}
      />
    </>
  );
}
export default HomeBtn;
