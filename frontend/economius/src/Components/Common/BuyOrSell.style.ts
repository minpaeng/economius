import styled from "styled-components";

export const SelectStockSection = styled.div`
  flex: 8.5;
  /* background-color: violet; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StockSectionMain = styled.div`
  background-color: azure;
  height: 80%;
  width: 90%;
  border: 1px solid black;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(131, 129, 129, 0.2);
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const HandleStockInputSection = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 0px auto;
`;

export const DecBtn = styled.button`
  background: rgba(250, 249, 252, 1);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(131, 129, 129, 0.2);
  color: rgb(117, 117, 117);
  font-size: 15px;
  transition: all 250ms ease-in-out;
  border-radius: 6px 0px 0px 6px;
  cursor: pointer;
  width: 100%;
  flex: 2;

  &:hover {
    background-color: #f7bc0f;
  }
`;

export const StockCntInput = styled.input`
  padding: 8px 12px;
  font-size: 15px;
  background: rgba(250, 249, 252, 1);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(131, 129, 129, 0.2);
  text-align: center;
  user-select: none;
  outline: none;

  width: 100%;
  flex: 4;
`;

export const IncBtn = styled.button`
  background: rgba(250, 249, 252, 1);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(131, 129, 129, 0.2);
  color: rgb(117, 117, 117);
  font-size: 15px;
  transition: all 250ms ease-in-out;
  border-radius: 0px 6px 6px 0px;
  cursor: pointer;
  flex: 2;
  width: 100%;

  &:hover {
    background-color: #f7bc0f;
  }
`;

// 금액 바뀌는 input

export const ChangeInput = styled.input`
  padding: 8px 12px;
  font-size: 15px;
  background: rgba(250, 249, 252, 1);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(131, 129, 129, 0.2);
  text-align: center;
  user-select: none;
  outline: none;
  width: 73%;
  border-radius: 6px;
`;
