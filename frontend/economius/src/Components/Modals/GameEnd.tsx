import Modal from 'react-modal';
import { useRecoilValue } from 'recoil';
import { GameRoundState, PlayerRankingState, PortfolioState } from '/src/recoil/game/atom.tsx';
import { useEffect, useState } from 'react';
import { InnerDiv, InnerTextDiv, modalStyle, PlayerDiv, PlayerInformation, PrizeDiv } from '/src/Components/Modals/GameEnd.style.ts';
import { CallBackState } from '/src/recoil/animation/atom.tsx';

function GameEnd() {
    const gameRound = useRecoilValue(GameRoundState);
    const playerRanking = useRecoilValue(PlayerRankingState);
    const portfolio = useRecoilValue(PortfolioState);
    const callBack = useRecoilValue(CallBackState);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roundEndFlag, setRoundEndFlag] = useState(false);
    const [portfolioFlag, setPortfolioFlag] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (roundEndFlag && portfolioFlag) {
            setIsModalOpen(true);
        }
    }, [roundEndFlag, portfolioFlag]);

    useEffect(() => {
        setRoundEndFlag(false);
        setPortfolioFlag(false);
    }, [callBack]);

    useEffect(() => {
        setPortfolioFlag(true);
    }, [portfolio]);

    useEffect(() => {
        if (gameRound < 0) {
            setRoundEndFlag(true);
        }
    }, [gameRound]);

    useEffect(() => {
        const effectAudioPopup = new Audio('/effectSound/modal-popup.mp3'); // 출력할 소리
        effectAudioPopup.play(); // 출력할 위치에 작성
    }, []);

    return isModalOpen ? (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyle}>
            <InnerTextDiv>GameEnd</InnerTextDiv>
            <InnerDiv>
                {playerRanking.map((item, index) => (
                    <PlayerDiv>
                        <PrizeDiv>
                            {index + 1}등 - player : {item}
                        </PrizeDiv>
                        <PlayerInformation> 총자산 : {portfolio[item].totalMoney}</PlayerInformation>
                    </PlayerDiv>
                ))}
            </InnerDiv>
        </Modal>
    ) : null;
}

export default GameEnd;
