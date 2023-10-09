import Modal from 'react-modal';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { IsModalOpenState, CallBackState } from '/src/recoil/animation/atom';
import { PlayerToRollState, PlayerIdState, PortfolioState } from '/src/recoil/game/atom';
import { TradeRealEstateState } from '/src/recoil/trading/atom';
import { RealEstateInfoState } from '/src/recoil/modalInfo/atom';

import hotelimg from '/RealState/hotel.png';
import restaurantimg from '/RealState/restaurant.png';
import shopimg from '/RealState/shop.png';
import * as S from './RealEstate.style';
import { ExitButton } from './GlobalModal.stye';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';
import OtherPerson from './OtherPerson';

function RealEstate() {
    const playerId = useRecoilValue(PlayerIdState);
    const playerToRoll = useRecoilValue(PlayerToRollState);
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
    // 포트폴리오 잔액
    const portfolios = useRecoilValue(PortfolioState);
    const money = portfolios[playerId].money;

    const fee = [null, '식사 비용', '쇼핑 비용', '숙박 비용'];
    const name = [null, '레스토랑', '상점', '호텔'];
    const description = [null, '식사 비용을 지불합니다', '쇼핑 비용을 지불합니다', '숙박 비용을 지불합니다'];
    const realEstateImage = [null, restaurantimg, shopimg, hotelimg];

    useEffect(() => {
        effectAudioPopup.play(); // 출력할 위치에 작성
    }, []);

    return (
        <>
            {playerId === playerToRoll ? (
                <Modal isOpen={isModalOpen} style={S.modalStyle}>
                    <ExitButton onClick={() => (closeModal(), effectAudioClick.play())} src='/button/exit.png' alt='exit' />
                    {!(realEstateInfo === null) ? (
                        <S.Main>
                            <S.Top>
                                <S.TopTitle>{name[realEstateInfo.buildingId]}</S.TopTitle>
                            </S.Top>

                            <S.Mid>
                                <S.MidImg src={realEstateImage[realEstateInfo.buildingId]} alt='img' />
                                <S.MidDesc>
                                    {realEstateInfo.owner && realEstateInfo.owner.player !== playerToRoll
                                        ? description[realEstateInfo.buildingId]
                                        : `가격 : ${realEstateInfo.buildingPrice.toLocaleString()} (원)`}
                                </S.MidDesc>
                                <S.MidDesc>
                                    {!realEstateInfo.owner || (realEstateInfo.owner && realEstateInfo.owner.player === playerToRoll)
                                        ? `방문객에게 ${fee[realEstateInfo.buildingId]}으로 ${
                                              (realEstateInfo.buildingPrice / 10).toLocaleString().split('.')[0]
                                          } (원)을 받을 수 있습니다.`
                                        : `건물주에게 ${fee[realEstateInfo.buildingId]}으로 ${
                                              (realEstateInfo.buildingPrice / 10).toLocaleString().split('.')[0]
                                          } (원)을 지불합니다.`}
                                </S.MidDesc>
                            </S.Mid>

                            <S.Divide />
                            {!realEstateInfo.owner ? (
                                money >= realEstateInfo.buildingPrice ? (
                                    <S.Botton onClick={() => (setTradeRealEstate([true, false]), effectAudioClick.play())}>매수하기</S.Botton>
                                ) : (
                                    <S.Botton style={{ backgroundColor: '#D9D9D9' }}>잔액부족</S.Botton>
                                )
                            ) : realEstateInfo.owner.player === playerToRoll ? (
                                <S.Botton onClick={() => (setTradeRealEstate([false, true]), effectAudioClick.play())}>매도하기</S.Botton>
                            ) : (
                                <S.Botton onClick={() => (closeModal(), effectAudioClick.play())}>확인</S.Botton>
                            )}
                        </S.Main>
                    ) : (
                        '로딩중입니다.'
                    )}
                </Modal>
            ) : (
                <OtherPerson />
            )}
        </>
    );
}

export default RealEstate;
