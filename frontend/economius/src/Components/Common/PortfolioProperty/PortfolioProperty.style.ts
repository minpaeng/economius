import { styled } from "styled-components";

// 포트폴리오 토글 레이아웃
export const ToggleLayout = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(131, 129, 129, 0.2);
  background: rgba(255, 255, 255, 0.5);
  padding: 12px 12px 9px 12px;
  width: 95%;
  margin: 20px 0px;
`;

export const ToggleBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 0px;
  font-size: 24px;
  transition: 250ms all ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

// 자산 공통
export const PropertyLayout = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(131, 129, 129, 0.2);
  background: rgba(255, 255, 255, 0.5);
  padding: 8px 12px 5px 12px;
  margin-top: 8px;
  width: 95%;
`;

export const LayoutTop = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-between;
  img {
    width: 50px;
    margin-right: 5px;
  }
`;

export const LayoutTopLeft = styled.div`
  display: flex;
  align-items: center;
`;
export const LayoutTopRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivideLine = styled.div`
  width: 100%;
  height: 3px;
  background: rgba(0, 0, 0, 0.2);
  margin: 8px 0px;
`;

export const LayoutBottom = styled.div`
  display: flex;
  flex-direction: column;
  flex: 8;
`;

export const LayoutBottomitem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
`;

export const LayoutBottomitemLeft = styled.div``;

export const LayoutBottomitemRight = styled.div``;
// 주식
