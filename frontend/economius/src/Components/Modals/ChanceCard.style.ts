import { styled } from "styled-components";

export const ChanceCard = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
   
  justify-content: center;
  text-align: center;
`;

export const ChanceCardTop = styled.div`
  flex: 6.5;
  display: flex;
  background: linear-gradient(180deg, #ffdaae 0%, #fff 100%);
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const ChanceCardTopTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export const ChanceCardTopImg = styled.img`
  width: 60%;
  height: 60%;
`;

export const ChanceCardDivide = styled.div`
  flex: 0.2;
  background-color: white;
`;

export const ChanceCardBottom = styled.div`
  flex: 3.3;
  background-color: #b8ef5fe5;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  justify-content: space-evenly;
  align-items: center;
`;
