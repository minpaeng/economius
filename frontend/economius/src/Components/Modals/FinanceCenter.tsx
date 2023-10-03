import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IsModalOpenState } from '/src/recoil/animation/atom';
import financecenterimg from '/FinanceCenter/financecenter.png';
import hotelimg from '/RealState/hotel.png';
import restaurantimg from '/RealState/restaurant.png';
import shopimg from '/RealState/shop.png';
import bankimg from '/Bank/BankTitle.png';
import stockimg from '/Portfolio/Stock.png';
import goldimg from '/Gold/goldbar.png';
import * as S from './FinanceCenter.style';

const pictures = [stockimg, bankimg, restaurantimg, shopimg, hotelimg, goldimg];

const buildings = [
    ['대한전력', 0],
    ['궁민은행', 1],
    ['아람쿠', 0],
    ['레스토랑', 2],
    ['포스쿠', 0],
    ['삼성화재', 0],
    ['IG화학', 0],
    ['코인', 0],
    ['화이지', 0],
    ['신혼은행', 1],
    ['셀트리안', 0],
    ['나이카', 0],
    ['상점', 3],
    ['코카펩시', 0],
    ['AIR관광', 0],
    ['은행', 1],
    ['CZ엔터', 0],
    ['K텔레콤', 0],
    ['호텔', 4],
    ['M소프트', 0],
    ['대한운송', 0],
    ['삼성화재', 0],
    ['대현건설', 0],
    ['넥서스', 0],
    ['금 거래소', 5],
    ['삼성전자', 0],
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
                            <S.MidItem key={idx}>
                                <input type='radio' value={idx} checked={selectedOption === idx} onChange={() => setSelectedOption(idx)} />
                                <S.MidImg src={pictures[val[1]]} alt='financecenterimg'></S.MidImg>
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
