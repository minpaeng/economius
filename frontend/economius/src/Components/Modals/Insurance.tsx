import Modal from 'react-modal';
import { useState } from 'react';
import * as S from './Insurance.style';
import InsuranceCard from './InsuranceCard';

function Insurance() {
    // 의료보험
    const Life: any = [
        ['교통사고', 'car-accident'],
        ['건강검진', 'hospital'],
        ['임플란트', 'dental-care'],
        ['폐암 진단', 'lung-cancer'],
        ['식중독', 'rotten'],
        ['심혈관 질환', 'blood-vessel'],
        ['감기 유행', 'covid-19'],
    ];
    // 손해보험
    const NonLife: any = [
        ['교통사고', 'car-accident'],
        ['화재발생', 'fire'],
        ['해상사고', 'shipwreck'],
        ['토네이도', 'tornado'],
        ['홍수', 'flood'],
        ['산재사고', 'slip'],
        ['도둑', 'robbery'],
    ];

    // 보험 정보
    const InsuranceInfo: any = [
        {
            type: 1,
            title: '의료보험',
            perPrice: 100,
            ensurePercent: 30,
            ensureInfo: Life,
            isJoin: true,
        },
        {
            type: 2,
            title: '의료보험 + 특약',
            perPrice: 250,
            ensurePercent: 120,
            ensureInfo: Life,
            isJoin: false,
        },
        {
            type: 3,
            title: '손해보험',
            perPrice: 100,
            ensurePercent: 30,
            ensureInfo: NonLife,
            isJoin: false,
        },
        {
            type: 4,
            title: '손해보험 + 특약',
            perPrice: 250,
            ensurePercent: 120,
            ensureInfo: NonLife,
            isJoin: true,
        },
    ];

    const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);

    const closeModal = () => {
        setIsInsuranceOpen(false);
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
        <Modal isOpen={isInsuranceOpen} style={modalStyle} onRequestClose={closeModal}>
            <S.InsuranceMain>
                <S.InsuranceTop>
                    <img src='Insurance/Insurance.png' alt='img' style={{ width: '50px', marginRight: '10px' }} />
                    <S.InsuranceTopTitle>한화생명</S.InsuranceTopTitle>
                </S.InsuranceTop>
                <S.InsuranceMid>
                    {InsuranceInfo.map(insurance => {
                        return <InsuranceCard CardInfo={insurance}></InsuranceCard>;
                    })}
                </S.InsuranceMid>
            </S.InsuranceMain>
        </Modal>
    );
}

export default Insurance;
