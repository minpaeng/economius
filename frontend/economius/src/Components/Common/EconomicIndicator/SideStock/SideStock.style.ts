import styled from "styled-components";

export const SideStockTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #c64b0c;
  padding: 8px 12px;
  border: none;
  border-radius: 12px 12px 0px 0px;
  color: white;
  font-size: 24px;
  img {
    width: 40px;
  }
`;

export const SideStockPrice = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
`;

export const SideStockPriceItem = styled.div`
  display: flex;
`;
