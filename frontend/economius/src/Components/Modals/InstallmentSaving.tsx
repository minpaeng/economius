import Modal from "react-modal";
import { useState } from "react";
import * as S from "./InstallmentSaving.style";

function InstallmentSaving() {
  // 원래는 초기값 false로 두고 해당 위치 되면 true로 바꿔줘야할듯

  // 은행 방문 시, savings 배열이 비어있으면 가입모달
  // 아니면 해지 모달
  const dummy: any = {
    player: 0,
    money: 0,
    savings: {
      totalPrice: 0, //적금 총 액
      amount: 0, //적금 총 개수
      savings: [
        //포트폴리오에 바로 적용
        {
          bankCode: "",
          savingName: "",
          perPrice: 0, //회당 적금액
          currentPrice: 0, //지금까지 낸 금액
          currentCount: 0, //지금까지 낸 횟수
          totalCount: 0, //총 적금 횟수
          rate: 0, //이율
        },
      ],
    },
  };

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
      padding: "0px",
    },
  };

  return (
    <Modal isOpen={isBankOpen} style={modalStyle} onRequestClose={closeModal}>
      <S.BankMain>
        <S.BankTop>
          {/* title은 우리가 쥐고있는 은행코드로 띄워야 할듯 */}
          <img
            src="Bank/BankTitle.png"
            alt="img"
            style={{ width: "50px", marginRight: "10px" }}
          />
          <S.BankTopTitle>신한은행</S.BankTopTitle>
        </S.BankTop>
        <S.BankMid>
          <S.BankMidImg src="Bank/image 34.png" alt="img" />
          <S.BankMidDesc>
            <div>입금액 : 500</div>
            <div>기간 : 3</div>
            <div>이율 : 기준금리 + 9%p</div>
            <div>중도 해지 : 원금만 수령</div>
          </S.BankMidDesc>
        </S.BankMid>
        <S.BankDivide />

        <S.BankJoinBottom>적금 가입하기</S.BankJoinBottom>
      </S.BankMain>
    </Modal>
  );
}

export default InstallmentSaving;
