import styled from "styled-components";

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 98.5%;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SideBarBtnSection = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
  /* height: 12%; */
  height: 100px;
  align-items: center;
  width: 100%;
  /* background-color: azure; */
  margin: 20px 0px;
`;

export const PushableButton = styled.button`
  /* background: hsl(340deg 100% 32%); */
  background: gray;
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  /* height: 85%; */

  .front {
    display: block;
    padding: 26px 42px;
    border-radius: 12px;
    font-size: 1.25rem;
    /* background: hsl(345deg 100% 47%); */
    background: white;
    color: black;
    transform: translateY(-6px);
  }

  &:active .front {
    transform: translateY(-2px);
  }
`;

export const SideBarMainSection = styled.div`
  flex: 9;
  width: 95%;
  /* height: 88%; */
  /* background-color: violet; */
  border: 1px solid black;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(131, 129, 129, 0.2);
  background: rgba(255, 255, 255, 0.5);
`;

export const divideLine = styled.div`
  flex: 0.2;
`;
