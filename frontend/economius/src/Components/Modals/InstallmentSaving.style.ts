import { styled } from "styled-components";

export const BankMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff9ee;
`;

export const BankTop = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BankTopTitle = styled.div`
  font-size: 28px;
  font-weight: 800;
`;

export const BankMid = styled.div`
  flex: 5.85;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const BankMidImg = styled.img`
  width: 200px;
`;

export const BankMidDesc = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const BankDivide = styled.div`
  flex: 0.15;
  background-color: white;
`;

export const BankJoinBottom = styled.button`
  flex: 2;
  border: none;
  background: #ffdaae;
  cursor: pointer; /* 커서를 포인터로 설정 */
  transition: all 250ms ease-in-out;

  /* 호버 시 색상 변경 */
  &:hover {
    background: #ffaa55; /* 원하는 색상으로 변경 */
  }
`;

export const BankCancelBottom = styled.button`
  flex: 2;
  border: none;
  background: #ffdaae;
  cursor: pointer; /* 커서를 포인터로 설정 */
  transition: all 250ms ease-in-out;

  /* 호버 시 색상 변경 */
  &:hover {
    background: #ffaa55; /* 원하는 색상으로 변경 */
  }
`;
