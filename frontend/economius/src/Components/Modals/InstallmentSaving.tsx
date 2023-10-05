import Modal from 'react-modal';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { IsModalOpenState, CallBackState } from '/src/recoil/animation/atom';
import { PlayerToRollState, PlayerIdState } from '/src/recoil/game/atom';
import { TradeBankState } from '/src/recoil/trading/atom';
import { BankInfoState } from '/src/recoil/modalInfo/atom';
import * as S from './InstallmentSaving.style';
import { ExitButton } from './GlobalModal.stye';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';
import OtherPerson from './OtherPerson';

function InstallmentSaving() {
    const playerId = useRecoilValue(PlayerIdState);
    const playerToRoll = useRecoilValue(PlayerToRollState);
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

    useEffect(() => {
        effectAudioPopup.play(); // 출력할 위치에 작성
    }, []);

    return playerId === playerToRoll ? (
        <Modal isOpen={isModalOpen} style={modalStyle}>
            <ExitButton onClick={() => (closeModal(), effectAudioClick.play())} src='/button/exit.png' alt='exit' />
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
                                    월 납부액 : {bankInfo.monthlyDeposit.toLocaleString()}
                                    {bankInfo.have
                                        ? ` (잔여 : ${(bankInfo.monthlyDeposit * bankInfo.finishCount - bankInfo.currentPrice).toLocaleString()})`
                                        : null}
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
                                    {bankInfo.have ? ` (잔여 : ${bankInfo.finishCount - bankInfo.currentCount} 바퀴)` : ` (${bankInfo.finishCount}바퀴)`}
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
                        <S.BankJoinBottom
                            onClick={() => {
                                setTradeBank([false, true]);
                                effectAudioClick.play();
                            }}
                        >
                            적금 해지하기
                        </S.BankJoinBottom>
                    ) : (
                        <S.BankJoinBottom
                            onClick={() => {
                                setTradeBank([true, false]);
                                effectAudioClick.play();
                            }}
                        >
                            적금 가입하기
                        </S.BankJoinBottom>
                    )}
                </S.BankMain>
            ) : (
                '로딩중입니다...'
            )}
        </Modal>
    ) : (
        <OtherPerson />
    );
}

export default InstallmentSaving;
