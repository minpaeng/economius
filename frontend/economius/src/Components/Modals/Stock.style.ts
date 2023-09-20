import { styled } from "styled-components";

export const StockMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff9ee;
`;

export const StockTop = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StockTopImg = styled.img`
  width: 75px;
  margin-right: 10px;
`;

export const StockTopTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StockTopTitleEnterprise = styled.div`
  font-size: 28px;
  font-weight: 800;
`;

export const StockTopTitleType = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: gray;
`;

export const StockMid = styled.div`
  flex: 7;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const StockMidLeft = styled.div`
  flex: 5;
  border-right: 2px solid rgb(200, 200, 200);
`;

export const StockMidLeftPrice = styled.div`
  text-align: center;
  font-weight: 800;
  font-size: 20px;
`;

export const StockMidRight = styled.div`
  flex: 5;
  width: 100%;
  height: 80%;
`;

export const Main = styled.div`
  display: flex;
  width: 95%;
  height: 100%;
  flex-direction: column;
`;

export const BtnSection = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: space-evenly;
`;

export const BuyOrSellBtn = styled.button`
  border: 1px solid black;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(131, 129, 129, 0.2);
  background: rgb(251, 251, 251);
  width: 35%;
  cursor: pointer;
`;

export const StockDivide = styled.div`
  flex: 0.2;
`;

export const StockBuyBottom = styled.button`
  flex: 1.3;
  border: none;
  background: #ffdaae;
  cursor: pointer; /* 커서를 포인터로 설정 */
  transition: all 250ms ease-in-out;

  /* 호버 시 색상 변경 */
  &:hover {
    background: #ffaa55; /* 원하는 색상으로 변경 */
  }
`;

export const StockSellBottom = styled.button`
  flex: 1.3;
  border: none;
  background: #ffdaae;
  cursor: pointer; /* 커서를 포인터로 설정 */
  transition: all 250ms ease-in-out;

  /* 호버 시 색상 변경 */
  &:hover {
    background: #ffaa55; /* 원하는 색상으로 변경 */
  }
`;
