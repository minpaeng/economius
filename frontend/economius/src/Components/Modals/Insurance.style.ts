import { styled } from "styled-components";

export const InsuranceMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff9ee;
`;

export const InsuranceTop = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InsuranceTopTitle = styled.div`
  font-size: 28px;
  font-weight: 800;
`;

export const InsuranceMid = styled.div`
  flex: 8.5;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const InsuranceJoinBottom = styled.button`
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

export const InsuranceCancelBottom = styled.button`
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
