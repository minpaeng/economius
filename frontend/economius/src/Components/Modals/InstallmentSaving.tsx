import Modal from "react-modal";
import { useState } from "react";
import * as S from "./InstallmentSaving.style";

function InstallmentSaving() {
  // 원래는 초기값 false로 두고 해당 위치 되면 true로 바꿔줘야할듯
  const [isBankOpen, setIsBankOpen] = useState(true);

  const closeModal = () => {
    setIsBankOpen(false);
  };

  // modal style
  const modalStyle: any = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: 10,
    },
    content: {
      display: "flex",
      flexDirextion: "column",
      backgroundColor: "rgba(255,255,255,0.95)",
      overflow: "auto",
      zIndex: 10,
      top: "200px",
      left: "250px",
      right: "650px",
      bottom: "200px",
      border: "5px solid white",
      borderRadius: "20px",
    },
  };

  return (
    <Modal
      isOpen={isBankOpen}
      style={modalStyle}
      onRequestClose={closeModal}
    ></Modal>
  );
}

export default InstallmentSaving;
