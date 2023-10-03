import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IsModalOpenState } from '/src/recoil/animation/atom';
import financecenterimg from '/FinanceCenter/financecenter.png';

import * as S from './FinanceCenter.style';

const buildings = [
    ['대한전력', 1],
    ['궁민은행', 2],
    ['아람쿠', 3],
    ['레스토랑', 4],
    ['포스쿠', 5],
    ['삼성화재', 6],
    ['IG화학', 7],
    ['화이지', 9],
    ['신혼은행', 10],
    ['셀트리안', 11],
    ['나이카', 13],
    ['상점', 14],
    ['코카펩시', 15],
    ['AIR관광', 17],
    ['은행', 18],
    ['CZ엔터', 19],
    ['K텔레콤', 21],
    ['호텔', 22],
    ['M소프트', 23],
    ['대한운송', 25],
    ['대현건설', 27],
    ['넥서스', 29],
    ['금 거래소', 30],
    ['삼성전자', 31],
];

function FinanceCenter() {
    const [selectedOption, setSelectedOption] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal isOpen={true} style={S.modalStyle} onRequestClose={closeModal}>
            <S.Main>
                <S.Top>
                    <img src={financecenterimg} alt='img' style={{ width: '50px', marginRight: '10px' }} />

                    <S.TopTitle>종합거래소</S.TopTitle>
                </S.Top>
                <S.MidTitle>주식, 부동산, 적금, 보험, 금, 코인 등 금융 거래를 한 곳에서 할 수 있습니다.</S.MidTitle>
                <S.Mid>
                    <S.MidScroll>
                        <hr style={{ width: '200px', marginBottom: '5px' }} />
                        {buildings.map((val, idx) => (
                            <S.MidItem key={idx} onClickCapture={() => setSelectedOption(idx)}>
                                <input type='radio' value={idx} checked={selectedOption === idx} style={{ marginRight: '5px' }} />
                                <S.MidImg src={`/FinanceCenter/${val[1]}.png`} alt='financecenteritem'></S.MidImg>
                                <S.MidDesc>{val[0]}</S.MidDesc>
                            </S.MidItem>
                        ))}
                    </S.MidScroll>
                </S.Mid>
                {'\u00A0'}
                <S.Divide />
                <S.Button style={{ backgroundColor: selectedOption !== -1 ? '#ffaa55' : '#D9D9D9' }}>선택하기</S.Button>
            </S.Main>
        </Modal>
    );
}

export default FinanceCenter;
