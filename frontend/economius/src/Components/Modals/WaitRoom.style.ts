// import { UserBox } from './WaitRoom.style';
import { styled } from "styled-components";

// modal style
export const modalStyle: any = {
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
    // backgroundColor: 'rgba(255,255,255,0.85)',
    backgroundColor: "#fff9ee",
    overflow: "auto",
    zIndex: 10,
    margin: "auto",
    width: "900px",
    height: "550px",
    border: "5px solid white",
    borderRadius: "20px",
    padding: "100px 50px 50px 50px",
  },
};

export const UserBoxOuter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

export const UserBox = styled.div`
  width: 300px;
  height: 200px;
  /* flex-basis: 50%; */
  /* flex-grow: 1; */
  border: 5px solid white;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ffdaae;
`;

export const InfoBar = styled.div`
  padding-left: 75px;
  padding-right: 55px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: inline;
    width: auto;
    padding: 10px 50px;
    border: 5px solid white;
    border-radius: 5px;
    margin-right: 20px;
    background-color: #ffdaae;

    cursor: pointer;
  }

    div:hover {
        background-color: #ffaa55;
        transition: all 250ms ease-in-out;
    }

    .no {
        display: flex;
        justify-content: space-between;
    }
`;

export const RoomInput = styled.div`
  height: auto;
`;
