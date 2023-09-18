import Modal from "react-modal";
import { useState } from "react";
import * as S from "./ChanceCard.style";

function ChanceCard() {
  const dummy = {
    title: "교통사고",
    desc: "교통사고를 당했습니다.",
    // TODO: result에서 주식이든 자산이든 변경되는 뭔가가 들어올 듯
    result: "",
  };

  // 원래는 초기값 false로 두고 해당 위치 되면 true로 바꿔줘야할듯
  const [isChanceOpen, setIsChanceOpen] = useState(true);

  const closeModal = () => {
    setIsChanceOpen(false);
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
      left: "400px",
      right: "800px",
      bottom: "200px",
      border: "5px solid white",
      borderRadius: "20px",
      padding: "0px",
    },
  };

  return (
    <Modal isOpen={isChanceOpen} style={modalStyle} onRequestClose={closeModal}>
      <S.ChanceCard>
        <S.ChanceCardTop>
          <S.ChanceCardTopTitle>{dummy.title}</S.ChanceCardTopTitle>
          <S.ChanceCardTopImg src="ChanceCard/car-accident.png" alt="Image" />
        </S.ChanceCardTop>
        <S.ChanceCardDivide />
        <S.ChanceCardBottom>
          <div>{dummy.desc}</div>
          <div>병원비 : -100만</div>
        </S.ChanceCardBottom>
      </S.ChanceCard>
    </Modal>
  );
}

export default ChanceCard;
