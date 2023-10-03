import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IsModalOpenState } from '/src/recoil/animation/atom';
import financecenterimg from '/FinanceCenter/financecenter.png';
import checksign from '/BeforeBankrupt/checksign.png';
import dollarcoin from '/BeforeBankrupt/dollarcoin.png';
import * as S from './FinanceCenter.style';

const A = [
    ['대한전력'],
    ['은행'],
    ['아람쿠'],
    ['부동산'],
    ['포스쿠'],
    ['보험사'],
    ['IG화학'],
    ['코인'],
    ['화이지'],
    ['은행'],
    ['셀트리안'],
    ['나이카'],
    ['부동산'],
    ['[코카펩시'],
    ['AIR관광'],
    ['은행'],
    ['CZ엔터'],
    ['K텔레콤'],
    ['부동산'],
    ['M소프트'],
    ['대한운송'],
    ['보험사'],
    ['대현건설'],
    ['넥서스'],
    ['금거래소'],
    ['삼성전자'],
];

function FinanceCenter() {
    const [selectedOption, setSelectedOption] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal isOpen={isModalOpen} style={S.modalStyle} onRequestClose={closeModal}>
            <S.Main>
                <S.Top>
                    <img src={financecenterimg} alt='img' style={{ width: '50px', marginRight: '10px' }} />

                    <S.TopTitle>종합거래소</S.TopTitle>
                </S.Top>
                <S.MidTitle>주식, 부동산, 적금, 보험, 금, 코인 등 금융 거래를 한 곳에서 할 수 있습니다.</S.MidTitle>
                <S.Mid>
                    <S.MidScroll>
                        <hr style={{ width: '200px', marginBottom: '5px' }} />
                        {A.map((val, idx) => (
                            <S.MidItem key={idx}>
                                <input type='radio' value={idx} checked={selectedOption === idx} onChange={() => setSelectedOption(idx)} />
                                <S.MidImg src={financecenterimg} alt='financecenterimg'></S.MidImg>
                                <S.MidDesc>{val}</S.MidDesc>
                            </S.MidItem>
                        ))}
                    </S.MidScroll>
                </S.Mid>
                {'\u00A0'}
                <S.Divide />
                <S.Button style={{ backgroundColor: selectedOption !== -1 ? '#ffaa55' : '#D9D9D9' }}>선택하기(빈껍데기)</S.Button>
            </S.Main>
        </Modal>
    );
}

export default FinanceCenter;
