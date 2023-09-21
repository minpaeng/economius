import Modal from "react-modal";
import { useState } from "react";
import * as S from "./Stock.style";
import PlayerChracter from "./PlayerChracter";
import PlayerProperty from "./PlayerProperty";
import PlayerRanking from "./PlayerRanking";
import styled from "styled-components";

const PlayerLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function PlayerPlace({
  borderRadius,
  top,
  left,
  bgColor,
  idx,
  character,
  AllProperty,
  money,
  Ranking,
  Nick,
}) {
  // modal style
  const modalStyle: any = {
    overlay: {
      position: "fixed",
      //  변동해야하는 값 top="6%", left="0"
      top: top,
      left: left,

      width: "25%",
      height: "19%",
      backgroundColor: "rgba(0,0,0,0)",
      zIndex: "1",
    },
    content: {
      display: "flex",
      flexDirextion: "column",
      backgroundColor: bgColor,
      overflow: "auto",
      zIndex: "1",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: "none",
      width: "100%",
      height: "100%",
      padding: "0px",
      borderRadius: borderRadius,
    },
  };
  return (
    <Modal isOpen={true} style={modalStyle}>
      {!(idx % 2) ? (
        <PlayerLayout>
          <PlayerRanking Ranking={Ranking} />
          <PlayerProperty AllProperty={AllProperty} money={money} Nick={Nick} />
          <PlayerChracter character={character} />
        </PlayerLayout>
      ) : (
        <PlayerLayout>
          <PlayerChracter character={character} />
          <PlayerProperty AllProperty={AllProperty} money={money} Nick={Nick} />
          <PlayerRanking Ranking={Ranking} />
        </PlayerLayout>
      )}
    </Modal>
  );
}

export default PlayerPlace;
