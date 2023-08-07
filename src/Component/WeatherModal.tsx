import { useEffect } from "react";

interface WeatherModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function WeatherModal({ setIsModal }: WeatherModalProps) {
  const handleCloseWeatherModal = () => {
    setIsModal(false);
  };

  // 모달 바깥 영역 클릭했을 때 모달 닫기
  const handleOutsideClick = (event: MouseEvent) => {
    const modalElement = document.getElementById("weather-modal");

    // 모달 바깥 영역을 클릭하면 모달을 닫음
    if (modalElement && !modalElement.contains(event.target as Node)) {
      setIsModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      id="weather-modal"
      className="w-98 h-98 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black z-50 opacity-80 rounded-lg"
    >
      <button
        className="absolute top-3 right-3 text-white text-3xl"
        onClick={handleCloseWeatherModal}
      >
        X
      </button>
    </div>
  );
}

export default WeatherModal;
