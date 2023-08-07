import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import WeatherModal from "./WeatherModal";

function WeatherBtn() {
  const [isModal, setIsModal] = useState(false);

  const handleOpenWeatherModal = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링을 막아 window의 클릭 핸들러가 실행되지 않게 함
    setIsModal(true);
  };
  return (
    <div>
      <FontAwesomeIcon
        icon={faSun}
        className="cursor-pointer mr-3 "
        style={{ color: "#50b4fc" }}
        size="xl"
        onClick={handleOpenWeatherModal}
      />
      {isModal && <WeatherModal setIsModal={setIsModal} />}
    </div>
  );
}

export default WeatherBtn;
