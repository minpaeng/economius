import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { NowPlayerState, IsModalOpenState } from '/src/recoil/animation/atom';
import { TradeRealEstateState } from '/src/recoil/trading/atom';
import hotelimg from '/RealState/hotel.png';
import restaurantimg from '/RealState/restaurant.png';
import shopimg from '/RealState/shop.png';
import * as S from './RealEstate.style';

function RealEstate() {
    const [nowPlayer, setNowPlayer] = useRecoilState(NowPlayerState);
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    // 부동산 매수, 매도 여부
    const [tradeRealEstate, setTradeRealEstate] = useRecoilState(TradeRealEstateState);
    const closeModal = () => {
        setIsModalOpen(false);
        setTradeRealEstate([false, false]);
    };

    const dummy: any = {
        id: 0,
        owner: 2,
        name: ['레스토랑', '상점', '호텔'],
        price: ['가격: 50,000', '가격: 70,000', '가격: 100,000'],
        fee: ['식사 비용: 5000', '쇼핑 비용: 7000', '숙박 비용: 10000'],
        description: ['식사 비용을 지불합니다', '쇼핑 비용을 지불합니다', '숙박 비용을 지원합니다'],
    };

    const realEstateImage = [hotelimg, restaurantimg, shopimg];

    return (
        <Modal isOpen={isModalOpen} style={S.modalStyle} onRequestClose={closeModal}>
            <S.Main>
                <S.Top>
                    <S.TopTitle>{dummy.name[dummy.id]}</S.TopTitle>
                </S.Top>

                <S.Mid>
                    <S.MidImg src={realEstateImage[dummy.id]} alt='img' />
                    <S.MidDesc>{dummy.owner && dummy.owner === nowPlayer ? dummy.price[dummy.id] : dummy.description[dummy.id]}</S.MidDesc>
                    <S.MidDesc>{dummy.fee[dummy.id]}</S.MidDesc>
                </S.Mid>

                <S.Divide />
                {!dummy.owner ? (
                    <S.Botton onClick={() => (setTradeRealEstate(([buy, sell]) => [!buy, sell]), setIsModalOpen(false))}>매수하기</S.Botton>
                ) : dummy.owner === nowPlayer + 1 ? (
                    <S.Botton onClick={() => (setTradeRealEstate(([buy, sell]) => [buy, !sell]), setIsModalOpen(false))}>매도하기</S.Botton>
                ) : (
                    <S.Botton onClick={() => setIsModalOpen(false)}>확인</S.Botton>
                )}
            </S.Main>
        </Modal>
    );
}

export default RealEstate;
