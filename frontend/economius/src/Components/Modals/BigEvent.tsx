import Modal from "react-modal";
import * as S from "./BigEvent.style";

import { useEffect, useState } from "react";

function BigEvent() {
  // TODO: axios 데이터
  const dummy: any = {
    title: "대공황",
    desc: "월 스트리트 대폭락에서 시작되어, 미국을 중심으로 세계적으로 경제 침체가 발생하였습니다. 이로 인해 실업률 급증과 빈곤이 확산되었으며 금융 시스템 붕괴와 물가 하락으로 인한 어려움이 지속되었습니다.",
    change1: "",
  };

  // 원래는 초기값 false로 두고 해당 턴이 되면 true로 바꿔줘야할듯
  const [isBigEventOpen, setIsBigEventOpen] = useState(false);

  //   const openModal = () => {
  //     if (!isBigEventOpen) {
  //       setIsBigEventOpen(true);
  //     }
  //   };

  const closeModal = () => {
    setIsBigEventOpen(false);
  };

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setIsBigEventOpen(false);
  //     }, 500);
  //   }, []);

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
      //   backgroundColor: "rgba(255,255,255,0.95)",
      overflow: "auto",
      zIndex: 10,
      top: "80px",
      left: "50px",
      right: "400px",
      bottom: "80px",
      border: "5px solid white",
      borderRadius: "20px",
      backgroundImage: 'url("BigEvent/불황 (11).png")',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  };

  return (
    <Modal
      isOpen={isBigEventOpen}
      style={modalStyle}
      onRequestClose={closeModal}
    >
      <S.BigEvent>
        <S.BigEventLeft />
        <S.BigEventRight>
          <S.BigEventRightTitle>{dummy.title}</S.BigEventRightTitle>
          <S.BigEventRightDesc>{dummy.desc}</S.BigEventRightDesc>
          <S.BigEventRightChange1>금리 변동</S.BigEventRightChange1>
          <S.BigEventRightChange2>주식 변동</S.BigEventRightChange2>
        </S.BigEventRight>
      </S.BigEvent>
    </Modal>
  );
}

export default BigEvent;
