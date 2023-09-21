import Modal from "react-modal";
import { useState } from "react";
import * as S from "./Stock.style";

function PlayerPlace({ borderRadius, top, left, bgColor }) {
  // modal style
  const modalStyle: any = {
    overlay: {
      position: "fixed",
      //  변동해야하는 값 top="6%", left="0"
      top: top,
      left: left,

      width: "25%",
      height: "19%",
      backgroundColor: "rgba(0,0,0,0)",
      zIndex: "1",
    },
    content: {
      display: "flex",
      flexDirextion: "column",
      backgroundColor: bgColor,
      overflow: "auto",
      zIndex: "1",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: "none",
      width: "100%",
      height: "100%",
      padding: "0px",
      borderRadius: borderRadius,
    },
  };
  return (
    <Modal isOpen={true} style={modalStyle}>
      Player
    </Modal>
  );
}

export default PlayerPlace;
