import Modal from "react-modal";
import { useState } from "react";
import * as S from "./Stock.style";

function Portforlio() {
  // modal style
  const modalStyle: any = {
    overlay: {
      position: "fixed",
      top: "6%",
      left: "75%",
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0)",
      zIndex: 1,
      //   width: "0px",
    },
    content: {
      display: "flex",
      flexDirextion: "column",
      backgroundColor: "#b8d4ffdb",
      overflow: "auto",
      zIndex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: "none",
      //   width: "100%",
      //   height: "100%",
      //   border: "5px solid white",
      borderRadius: "0",

      padding: "0px",
    },
  };
  return (
    <Modal isOpen={true} style={modalStyle}>
      portfolio
    </Modal>
  );
}

export default Portforlio;
