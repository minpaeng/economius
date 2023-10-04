import Modal from "react-modal";
import {useRecoilValue} from "recoil";
import {Img, modalStyle, TextOverlay} from "/src/Components/Modals/Round.style.ts";
import {GameRoundState} from "/src/recoil/game/atom.tsx";
import {useEffect, useState} from "react";

function Round() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const gameRound = useRecoilValue(GameRoundState);
    const [timerId, setTimerId] = useState(null);

    const closeModal = () => {
        setIsModalOpen(false);
        if (timerId) clearTimeout(timerId);
    };

    useEffect(() => {
        if (gameRound !== 0){
            setIsModalOpen(true);
            const timer = setTimeout(() => {
                closeModal();
            }, 2500); 
            setTimerId(timer);
        }
        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [gameRound]);

    return (
        <div className="RoundModal">
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyle}>
                <Img src={"/2D_Chracter/Bear/Bear Pose - 02.png"}/>
                <TextOverlay>
                    <div style={{fontSize: "40px", paddingTop:"35px"}}>Round : {gameRound}</div>
                </TextOverlay>
            </Modal>
        </div>
    );
}

export default Round