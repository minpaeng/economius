import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IsModalOpenState, CallBackState } from '/src/recoil/animation/atom';
import { TradeInsuranceConfirmState } from '/src/recoil/trading/atom';
import { InsuranceInfoState } from '/src/recoil/modalInfo/atom';
import * as S from './Insurance.style';
import InsuranceCard from './InsuranceCard';

function Insurance() {
    const [tradeInsuranceConfirm, setTradeInsuranceConfirm] = useRecoilState(TradeInsuranceConfirmState);
    const [insuranceInfo, setInsuranceInfo] = useRecoilState(InsuranceInfoState);
    const setCallBack = useSetRecoilState(CallBackState);
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const closeModal = () => {
        setInsuranceInfo(null);
        setTradeInsuranceConfirm(false);
        setIsModalOpen(false);
        setCallBack(true);
    };

    // 의료보험 - 일반
    const Life: any = [
        ['교통사고', 'car-accident-medical'],
        ['건강검진', 'hospital'],
        ['감기 유행', 'covid-19'],
    ];
    // 의료보험 - 특약
    const LifeSpecial: any = [
        ['교통사고', 'car-accident-medical'],
        ['건강검진', 'hospital'],
        ['임플란트', 'dental-care'],
        ['암', 'lung-cancer'],
        ['식중독', 'rotten'],
        ['심혈관 질환', 'blood-vessel'],
        ['감기 유행', 'covid-19'],
    ];
    // 손해보험
    const NonLife: any = [
        ['교통사고', 'car-accident'],
        ['화재발생', 'fire'],
        ['도둑', 'robbery'],
    ];
    const NonLifeSpecial: any = [
        ['교통사고', 'car-accident'],
        ['화재발생', 'fire'],
        ['해상사고', 'shipwreck'],
        ['토네이도', 'tornado'],
        ['홍수', 'flood'],
        ['산재사고', 'slip'],
        ['도둑', 'robbery'],
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

    return (
        <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
            {!(insuranceInfo === null) ? (
                <S.InsuranceMain>
                    <S.InsuranceTop>
                        <img src='Insurance/Insurance.png' alt='img' style={{ width: '50px', marginRight: '10px' }} />
                        <S.InsuranceTopTitle>삼성화재</S.InsuranceTopTitle>
                    </S.InsuranceTop>
                    <S.InsuranceMid>
                        {order.map(index => {
                            return <InsuranceCard index={index} CardInfo={insuranceInfo[`insurance${index}`]} ItemInfo={Items[index - 1]}></InsuranceCard>;
                        })}
                    </S.InsuranceMid>
                    <S.InsuranceConfirmButton onClick={() => setTradeInsuranceConfirm(true)}>확인</S.InsuranceConfirmButton>
                </S.InsuranceMain>
            ) : (
                '로딩중입니다'
            )}
        </Modal>
    );
}

export default Insurance;
