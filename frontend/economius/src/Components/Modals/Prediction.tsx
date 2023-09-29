import Modal from 'react-modal';
import {useEffect} from 'react';
import predictionimg from '/Prediction/prediction.png';
import * as S from './GlobalModal.stye';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {IsModalOpenState} from '/src/recoil/animation/atom';
import {GetPredictionState} from "/src/recoil/trading/atom.tsx";
import {PredictionState} from "/src/recoil/game/atom.tsx";
import BigEvent from "/src/Components/Modals/BigEvent.tsx";

function Prediction() {
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const setGetPrediction = useSetRecoilState(GetPredictionState);
    const [prediction, setPrediction] = useRecoilState(PredictionState);

    useEffect(() => {
        if (prediction !== null) {
            console.log(prediction);
        }
    }, [prediction]);

    const closeModal = () => {
        setIsModalOpen(false);
        setGetPrediction(false);
        setPrediction(null);
    };

    // modal style
    const modalStyle: any = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 10,
        },
        content: {
            display: 'flex',
            flexDirextion: 'column',
            backgroundColor: 'rgba(255,255,255,0.95)',
            overflow: 'auto',
            zIndex: 10,
            margin: 'auto',
            width: '500px',
            height: '350px',
            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };

    return prediction == null ? (
        <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
            <S.Main>
                <S.Top>
                    <S.TopTitle>예언소</S.TopTitle>
                </S.Top>

                <S.Mid>
                    <S.MidImg src={predictionimg} alt='predictionimg'/>
                    <S.MidDesc>다음에 일어날 경제 이슈를 예언해줍니다.</S.MidDesc>
                </S.Mid>

                <S.RoundButton onClick={() => setGetPrediction(true)}>
                    <span>예언듣기</span>
                </S.RoundButton>
            </S.Main>
        </Modal>
    ) : (
        <BigEvent issue={prediction}></BigEvent>
    )
}

export default Prediction;
