import Modal from "react-modal";
import { useState } from "react";

function Gold() {
  const [isGoldOpen, setIsGoldOpen] = useState(false);

  const closeModal = () => {
    setIsGoldOpen(false);
  };

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
      top: "150px",
      left: "150px",
      right: "550px",
      bottom: "150px",
      border: "5px solid white",
      borderRadius: "20px",
      padding: "0px",
    },
  };

  return (
    <Modal
      isOpen={isGoldOpen}
      style={modalStyle}
      onRequestClose={closeModal}
    ></Modal>
  );
}

export default Gold;
