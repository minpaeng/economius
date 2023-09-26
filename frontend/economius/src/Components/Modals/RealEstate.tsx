import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { NowPlayerState, IsModalOpenState, CallBackState } from '/src/recoil/animation/atom';
import { TradeRealEstateState } from '/src/recoil/trading/atom';
import { RealEstateInfoState } from '/src/recoil/modalInfo/atom';
import hotelimg from '/RealState/hotel.png';
import restaurantimg from '/RealState/restaurant.png';
import shopimg from '/RealState/shop.png';
import * as S from './RealEstate.style';

function RealEstate() {
    const [nowPlayer, setNowPlayer] = useRecoilState(NowPlayerState);
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    // 부동산 모달 정보
    const [realEstateInfo, setRealEstateInfo] = useRecoilState(RealEstateInfoState);
    // 부동산 매수, 매도 여부
    const [tradeRealEstate, setTradeRealEstate] = useRecoilState(TradeRealEstateState);
    // 턴 종료 플래그
    const setCallBack = useSetRecoilState(CallBackState);
    // 모달 끄기
    const closeModal = () => {
        setRealEstateInfo(null);
        setIsModalOpen(false);
        setCallBack(true);
    };

    const fee = [null, '식사 비용', '쇼핑 비용', '숙박 비용'];
    const name = [null, '레스토랑', '상점', '호텔'];
    const description = [null, '식사 비용을 지불합니다', '쇼핑 비용을 지불합니다', '숙박 비용을 지불합니다'];
    const realEstateImage = [null, restaurantimg, shopimg, hotelimg];

    return (
        <Modal isOpen={isModalOpen} style={S.modalStyle} onRequestClose={closeModal}>
            {!realEstateInfo ? (
                <S.Main>
                    <S.Top>
                        <S.TopTitle>{name[realEstateInfo.buildingId]}</S.TopTitle>
                    </S.Top>

                    <S.Mid>
                        <S.MidImg src={realEstateImage[realEstateInfo.buildingId]} alt='img' />
                        <S.MidDesc>
                            {realEstateInfo.owner && realEstateInfo.owner.player !== nowPlayer
                                ? description[realEstateInfo.buildingId]
                                : `가격 : ${realEstateInfo.buildingPrice}`}
                        </S.MidDesc>
                        <S.MidDesc>{`${fee[realEstateInfo.buildingId]} : ${realEstateInfo.buildingPrice / 10}`}</S.MidDesc>
                    </S.Mid>

                    <S.Divide />
                    {!realEstateInfo.owner ? (
                        <S.Botton onClick={() => setTradeRealEstate([true, false])}>매수하기</S.Botton>
                    ) : realEstateInfo.owner.player === nowPlayer + 1 ? (
                        <S.Botton onClick={() => setTradeRealEstate([false, true])}>매도하기</S.Botton>
                    ) : (
                        <S.Botton onClick={() => closeModal}>확인</S.Botton>
                    )}
                </S.Main>
            ) : (
                '로딩중입니다.'
            )}
        </Modal>
    );
}

export default RealEstate;
