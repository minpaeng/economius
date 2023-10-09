import Modal from 'react-modal';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MonthlyModalOpenState, NowPlayerPositionState, CallBackState } from '/src/recoil/animation/atom';
import { MonthlyInfoState } from '/src/recoil/modalInfo/atom';
import { PlayerToRollState, PlayerIdState } from '/src/recoil/game/atom';
import monthlymalculate from '/MonthlyCalculate/monthlycalculate.png';
import dollarcoin from '/MonthlyCalculate/dollarcoin.png';
import plus from '/MonthlyCalculate/plus.png';
import minus from '/MonthlyCalculate/minus.png';
import equal from '/MonthlyCalculate/equal.png';
import * as S from './MonthlyCalculate.style';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';
import OtherPerson from './OtherPerson';

function MonthlyCalculate() {
    const [monthlyModalOpen, setMonthlyModalOpen] = useRecoilState(MonthlyModalOpenState);
    const [monthlyInfo, setMonthlyInfo] = useRecoilState(MonthlyInfoState);
    const NowPlayerPosition = useRecoilValue(NowPlayerPositionState);
    const PlayerToRoll = useRecoilValue(PlayerToRollState);
    const PlayerId = useRecoilValue(PlayerIdState);
    const setCallBack = useSetRecoilState(CallBackState);
    const closeModal = () => {
        setMonthlyModalOpen(false);
        setMonthlyInfo(null);
        if (NowPlayerPosition === 0) {
            setCallBack(true);
        }
    };

    useEffect(() => {
        effectAudioPopup.play(); // 출력할 위치에 작성
        return () => {
            effectAudioClick.play(); // 출력할 위치에 작성
        };
    }, []);

    return PlayerToRoll === PlayerId ? (
        <Modal isOpen={monthlyModalOpen} style={S.modalStyle} onRequestClose={closeModal}>
            {monthlyInfo === null ? (
                '로딩중입니다...'
            ) : (
                <S.Main>
                    <S.Top>
                        <S.TopImg src={monthlymalculate} alt='monthlymalculate' />
                        <S.TopTitle>월말정산</S.TopTitle>
                    </S.Top>
                    <S.Divide />

                    <S.Mid>
                        <div>
                            <S.MidItem>
                                <S.MidDesc>월급</S.MidDesc>
                                <S.MidAmount>
                                    + {monthlyInfo.salary.toLocaleString()}
                                    <S.MidImg src={dollarcoin}></S.MidImg>
                                </S.MidAmount>
                            </S.MidItem>
                            <S.MidItem>
                                <S.MidDesc>적금 만기</S.MidDesc>
                                <S.MidAmount>
                                    + {monthlyInfo.savingFinishBenefit.toLocaleString()}
                                    <S.MidImg src={dollarcoin}></S.MidImg>
                                </S.MidAmount>
                            </S.MidItem>

                            <S.MidItem />

                            <S.MidItem>
                                <S.MidDesc>적금</S.MidDesc>
                                <S.MidAmount>
                                    - {monthlyInfo.savingsPrice.toLocaleString()}
                                    <S.MidImg src={dollarcoin}></S.MidImg>
                                </S.MidAmount>
                            </S.MidItem>
                            <S.MidItem>
                                <S.MidDesc>보험비</S.MidDesc>
                                <S.MidAmount>
                                    - {monthlyInfo.insurancePrice.toLocaleString()}
                                    <S.MidImg src={dollarcoin}></S.MidImg>
                                </S.MidAmount>
                            </S.MidItem>
                            <S.MidItem>
                                <S.MidDesc>세금</S.MidDesc>
                                <S.MidAmount>
                                    - {monthlyInfo.tax.toLocaleString()}
                                    <S.MidImg src={dollarcoin}></S.MidImg>
                                </S.MidAmount>
                            </S.MidItem>

                            <S.MidItem />

                            <S.MidItem>
                                <S.MidDesc>총 명세액</S.MidDesc>
                                <S.MidAmount>
                                    {monthlyInfo.totalIncome.toLocaleString() >= 0 ? `+` : `-`}
                                    {monthlyInfo.totalIncome.toLocaleString()}
                                    <S.MidImg src={dollarcoin}></S.MidImg>
                                </S.MidAmount>
                            </S.MidItem>
                            <div style={{ width: '220px', height: '10px', paddingTop: '10px' }}>
                                <hr />
                            </div>
                            <S.MidItem
                                style={{
                                    width: '240px',
                                    fontWeight: 'bold',
                                }}
                            >
                                <S.MidDesc></S.MidDesc>
                                <S.MidAmount>
                                    {monthlyInfo.money.toLocaleString()}({monthlyInfo.totalIncome >= 0 ? `+` : `-`}
                                    {monthlyInfo.totalIncome.toLocaleString()})<S.MidImg src={dollarcoin}></S.MidImg>
                                </S.MidAmount>
                            </S.MidItem>
                        </div>
                        <S.MidImg style={{ width: '18px', height: '18px', position: 'absolute', left: '129px', top: '125px' }} src={plus}></S.MidImg>
                        <S.MidImg style={{ width: '18px', height: '18px', position: 'absolute', left: '129px', top: '232px' }} src={minus}></S.MidImg>
                        <S.MidImg style={{ width: '18px', height: '18px', position: 'absolute', left: '129px', top: '325px' }} src={equal}></S.MidImg>
                    </S.Mid>

                    <S.Footer>
                        <S.RoundButton onClick={closeModal}>확인</S.RoundButton>
                    </S.Footer>
                </S.Main>
            )}
        </Modal>
    ) : (
        <OtherPerson />
    );
}

export default MonthlyCalculate;
