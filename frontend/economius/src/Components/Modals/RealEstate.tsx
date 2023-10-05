import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { IsModalOpenState, CallBackState } from '/src/recoil/animation/atom';
import { PlayerToRollState, PlayerIdState } from '/src/recoil/game/atom';

import { TradeRealEstateState } from '/src/recoil/trading/atom';
import { RealEstateInfoState } from '/src/recoil/modalInfo/atom';
import hotelimg from '/RealState/hotel.png';
import restaurantimg from '/RealState/restaurant.png';
import shopimg from '/RealState/shop.png';
import * as S from './RealEstate.style';
import { ExitButton } from './GlobalModal.stye';

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

    const fee = [null, '식사 비용', '쇼핑 비용', '숙박 비용'];
    const name = [null, '레스토랑', '상점', '호텔'];
    const description = [null, '식사 비용을 지불합니다', '쇼핑 비용을 지불합니다', '숙박 비용을 지불합니다'];
    const realEstateImage = [null, restaurantimg, shopimg, hotelimg];

    return (
        <>
            {playerId === playerToRoll ? (
                <Modal isOpen={isModalOpen} style={S.modalStyle}>
                    <ExitButton onClick={closeModal} src='/button/exit.png' alt='exit' />
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
                                    {!realEstateInfo.owner || (realEstateInfo.owner && realEstateInfo.owner.player !== playerToRoll)
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
                                <S.Botton onClick={() => setTradeRealEstate([true, false])}>매수하기</S.Botton>
                            ) : realEstateInfo.owner.player === playerToRoll ? (
                                <S.Botton onClick={() => setTradeRealEstate([false, true])}>매도하기</S.Botton>
                            ) : (
                                <S.Botton onClick={() => closeModal}>확인</S.Botton>
                            )}
                        </S.Main>
                    ) : (
                        '로딩중입니다.'
                    )}
                </Modal>
            ) : (
                <div style={{ position: 'absolute', left: '40%', top: '50%', height: '50px', backgroundColor: 'brown' }}>부동산에서 다른 사람이 거래중</div>
            )}
        </>
    );
}

export default RealEstate;
