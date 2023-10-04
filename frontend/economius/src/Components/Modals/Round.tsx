import Modal from "react-modal";
import { useRecoilValue } from "recoil";
import { Img, modalStyle, TextOverlay } from "/src/Components/Modals/Round.style.ts";
import { GameRoundState } from "/src/recoil/game/atom.tsx";
import { useEffect } from "react";

interface RoundProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
function Round({ isOpen, onClose }: RoundProps) {
  const gameRound = useRecoilValue(GameRoundState);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isOpen && gameRound !== 0) {
      timerId = setTimeout(() => {
        onClose();
      }, 2500); 
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [gameRound, isOpen, onClose]);

  return (
    <div className="RoundModal">
      <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyle}>
        <Img src={"/2D_Chracter/Bear/Bear Pose - 02.png"}/>
        <TextOverlay>
          <div style={{fontSize: "40px", paddingTop:"35px"}}>Round : {gameRound}</div>
        </TextOverlay>
      </Modal>
    </div>
  );
}

export default Round;
