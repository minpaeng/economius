import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IsModalOpenState, CallBackState } from '/src/recoil/animation/atom';
import { TradeBankState } from '/src/recoil/trading/atom';
import { BankInfoState } from '/src/recoil/modalInfo/atom';
import * as S from './InstallmentSaving.style';

function InstallmentSaving() {
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const [tradeBank, setTradeBank] = useRecoilState(TradeBankState);
    const [bankInfo, setBankInfo] = useRecoilState(BankInfoState);
    const setCallBack = useSetRecoilState(CallBackState);
    // 모달 끄기
    const closeModal = () => {
        setBankInfo(null);
        setIsModalOpen(false);
        setCallBack(true);
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
            top: '200px',
            left: '250px',
            right: '650px',
            bottom: '200px',
            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };

    return (
        <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
            {!(bankInfo === null) ? (
                <S.BankMain>
                    <S.BankTop>
                        {/* title은 우리가 쥐고있는 은행코드로 띄워야 할듯 */}
                        <img src='Bank/BankTitle.png' alt='img' style={{ width: '50px', marginRight: '10px' }} />
                        <S.BankTopTitle>{bankInfo.name}</S.BankTopTitle>
                    </S.BankTop>
                    <S.BankMid>
                        <S.BankMidImg src='Bank/image 34.png' alt='img' />
                        <S.BankMidDesc>
                            <S.BankMidPriceDesc>
                                <p>
                                    입금액 : {bankInfo.monthlyDeposit}
                                    {bankInfo.have ? ` (잔여: ${bankInfo.monthlyDeposit * bankInfo.finishCount - bankInfo.currentPrice})` : null}
                                </p>
                                <img
                                    src='Bank/dollar-coin 15.png'
                                    alt='img'
                                    style={{
                                        width: '25px',
                                        height: '25px',

                                        marginLeft: '5px',
                                    }}
                                />
                            </S.BankMidPriceDesc>
                            <S.BankMidCycle>
                                <p>
                                    기간 : {bankInfo.finishCount}
                                    {bankInfo.have ? ` (잔여: ${bankInfo.finishCount - bankInfo.currentCount})` : `(${bankInfo.finishCount}달)`}
                                </p>
                                <img
                                    src='Bank/BankCycle.png'
                                    alt='img'
                                    style={{
                                        width: '25px',
                                        height: '25px',
                                        marginRight: '5px',
                                        marginLeft: '5px',
                                    }}
                                />
                            </S.BankMidCycle>
                            <div>이율(변동) : 기준금리 + {bankInfo.rate}%p</div>
                            <div>중도 해지 : 원금만 수령</div>
                        </S.BankMidDesc>
                    </S.BankMid>
                    <S.BankDivide />
                    {bankInfo.have ? (
                        <S.BankJoinBottom onClick={() => setTradeBank([false, true])}>적금 해지하기</S.BankJoinBottom>
                    ) : (
                        <S.BankJoinBottom onClick={() => setTradeBank([true, false])}>적금 가입하기</S.BankJoinBottom>
                    )}
                </S.BankMain>
            ) : (
                '로딩중입니다...'
            )}
        </Modal>
    );
}

export default InstallmentSaving;
