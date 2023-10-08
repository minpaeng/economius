import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { IsModalOpenState, CallBackState } from '/src/recoil/animation/atom';
import { TradeInsuranceConfirmState } from '/src/recoil/trading/atom';
import { InsuranceInfoState } from '/src/recoil/modalInfo/atom';
import { PlayerToRollState, PlayerIdState } from '/src/recoil/game/atom';
import * as S from './Insurance.style';
import { ExitButton } from './GlobalModal.stye';
import InsuranceCard from './InsuranceCard';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';
import OtherPerson from './OtherPerson';

function Insurance() {
    const playerId = useRecoilValue(PlayerIdState);
    const playerToRoll = useRecoilValue(PlayerToRollState);
    const [tradeInsuranceConfirm, setTradeInsuranceConfirm] = useRecoilState(TradeInsuranceConfirmState);
    const [insuranceInfo, setInsuranceInfo] = useRecoilState(InsuranceInfoState);
    const setCallBack = useSetRecoilState(CallBackState);
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const closeModal = () => {
        setInsuranceInfo(null);
        setTradeInsuranceConfirm(false);
        setCallBack(true);
    };

    // 의료보험 - 일반
    const Life: any = [
        ['교통사고', 'car-accident'],
        ['화재발생', 'fire'],
        ['도둑', 'robbery'],
    ];
    // 의료보험 - 특약
    const LifeSpecial: any = [
        ['교통사고', 'car-accident'],
        ['화재발생', 'fire'],
        ['해상사고', 'shipwreck'],
        ['토네이도', 'tornado'],
        ['홍수', 'flood'],
        ['산재사고', 'slip'],
        ['도둑', 'robbery'],
    ];
    // 손해보험
    const NonLife: any = [
        ['교통사고', 'car-accident-medical'],
        ['건강검진', 'hospital'],
        ['감기 유행', 'covid-19'],
    ]
    const NonLifeSpecial: any = [
        ['교통사고', 'car-accident-medical'],
        ['건강검진', 'hospital'],
        ['임플란트', 'dental-care'],
        ['암', 'lung-cancer'],
        ['식중독', 'rotten'],
        ['심혈관 질환', 'blood-vessel'],
        ['감기 유행', 'covid-19'],
    ];
    const Items = [Life, LifeSpecial, NonLife, NonLifeSpecial];
    const order = [3, 4, 1, 2];

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
            top: '150px',
            left: '150px',
            right: '550px',
            bottom: '150px',
            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };

    useEffect(() => {
        effectAudioPopup.play(); // 출력할 위치에 작성
    }, []);

    return (
        <>
            {playerId === playerToRoll ? (
                <Modal isOpen={isModalOpen} style={modalStyle}>
                    <ExitButton onClick={() => (closeModal(), effectAudioClick.play())} src='/button/exit.png' alt='exit' />
                    {!(insuranceInfo === null) ? (
                        <S.InsuranceMain>
                            <S.InsuranceTop>
                                <img src='Insurance/Insurance.png' alt='img' style={{ width: '50px', marginRight: '10px' }} />
                                <S.InsuranceTopTitle>삼성화재</S.InsuranceTopTitle>
                            </S.InsuranceTop>
                            <S.InsuranceMid>
                                {order.map(index => {
                                    return (
                                        <InsuranceCard
                                            key={index}
                                            index={index}
                                            CardInfo={insuranceInfo[`insurance${index}`]}
                                            ItemInfo={Items[index - 1]}
                                        ></InsuranceCard>
                                    );
                                })}
                            </S.InsuranceMid>
                            <S.InsuranceConfirmButton onClick={() => (setTradeInsuranceConfirm(true), effectAudioClick.play())}>확인</S.InsuranceConfirmButton>
                        </S.InsuranceMain>
                    ) : (
                        '로딩중입니다'
                    )}
                </Modal>
            ) : (
                <OtherPerson />
            )}
        </>
    );
}

export default Insurance;
