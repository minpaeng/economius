import Modal from "react-modal";
import { useState } from "react";
import * as S from "./Stock.style";

function NewsBar() {
  // modal style
  const modalStyle: any = {
    overlay: {
      position: "fixed",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "94%",
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: "1",
      //   width: "100px",
      //   height: "6%",
    },
    content: {
      display: "flex",
      flexDirextion: "column",
      backgroundColor: "#b8d4ffdb",
      overflow: "auto",
      zIndex: "1",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      border: "none",
      //   border: "5px solid white",
      borderRadius: "0px",
      padding: "0px",
    },
  };
  return (
    <Modal isOpen={true} style={modalStyle}>
      NewsBar
    </Modal>
  );
}

export default NewsBar;
