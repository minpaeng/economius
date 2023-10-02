import Modal from "react-modal";
import * as S from "./BigEvent.style";

// import { useRecoilState, useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { BigEventInfoState } from "../../recoil/modalInfo/atom";
import { CallBackState, IsModalOpenState } from "/src/recoil/animation/atom";

import { useEffect, useState } from "react";
// import { BigEventInfoState } from "../../recoil/modalInfo/atom";

function BigEventRound() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const issue = useRecoilValue(BigEventInfoState);

  function closeModal() {
    setIsModalOpen(false);
    // issue = useRecoilValue(BigEventInfoState)
  }

  useEffect(() => {
    if (BigEventInfoState) {
      setIsModalOpen(true);
    }
    console.log(issue);
  }, [BigEventInfoState]);

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
      border: `5px solid white`,
      borderRadius: "20px",
      backgroundImage: `url("${issue.url}")`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  };

  return (
    <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
      <S.BigEvent>
        <S.BigEventLeft />
        <S.BigEventRight>
          <S.BigEventRightTitle>{issue.name}</S.BigEventRightTitle>
          <S.BigEventRightChange1>{issue.year}</S.BigEventRightChange1>
          <S.BigEventRightDesc>{issue.description}</S.BigEventRightDesc>
          {/* <br />
          {getGoldAndInterestRatesChanges()}
          <br />
          {getStockChanges(0)}
          {getStockChanges(1)}
          {getStockChanges(2)}
          {getStockChanges(3)}
          {getStockChanges(4)} */}
        </S.BigEventRight>
      </S.BigEvent>
    </Modal>
  );
}

export default BigEventRound;
