import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { MonthlyModalOpenState } from '/src/recoil/animation/atom';
import monthlymalculate from '/MonthlyCalculate/monthlycalculate.png';
import dollarcoin from '/MonthlyCalculate/dollarcoin.png';
import plus from '/MonthlyCalculate/plus.png';
import minus from '/MonthlyCalculate/minus.png';
import equal from '/MonthlyCalculate/equal.png';
import * as S from './MonthlyCalculate.style';

function MonthlyCalculate() {
    const [monthlyModalOpen, setMonthlyModalOpen] = useRecoilState(MonthlyModalOpenState);
    const closeModal = () => setMonthlyModalOpen(false);
    const dummy: number[] = [3344, 324, 52, 643, 234, 55234];

    return (
        <Modal isOpen={monthlyModalOpen} style={S.modalStyle} onRequestClose={closeModal}>
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
                                + {dummy[0]}
                                <S.MidImg src={dollarcoin}></S.MidImg>
                            </S.MidAmount>
                        </S.MidItem>
                        <S.MidItem>
                            <S.MidDesc>적금 만기</S.MidDesc>
                            <S.MidAmount>
                                + {dummy[1]}
                                <S.MidImg src={dollarcoin}></S.MidImg>
                            </S.MidAmount>
                        </S.MidItem>

                        <S.MidItem />

                        <S.MidItem>
                            <S.MidDesc>적금</S.MidDesc>
                            <S.MidAmount>
                                - {dummy[2]}
                                <S.MidImg src={dollarcoin}></S.MidImg>
                            </S.MidAmount>
                        </S.MidItem>
                        <S.MidItem>
                            <S.MidDesc>보험비</S.MidDesc>
                            <S.MidAmount>
                                - {dummy[3]}
                                <S.MidImg src={dollarcoin}></S.MidImg>
                            </S.MidAmount>
                        </S.MidItem>
                        <S.MidItem>
                            <S.MidDesc>세금</S.MidDesc>
                            <S.MidAmount>
                                - {dummy[4]}
                                <S.MidImg src={dollarcoin}></S.MidImg>
                            </S.MidAmount>
                        </S.MidItem>

                        <S.MidItem />

                        <S.MidItem>
                            <S.MidDesc>총 명세액</S.MidDesc>
                            <S.MidAmount>
                                {dummy[0] + dummy[1] >= dummy[2] + dummy[3] + dummy[4] ? <span>+</span> : <span>-</span>}
                                {dummy[0] + dummy[1] - dummy[2] - dummy[3] - dummy[4]}
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
                            <S.MidDesc>내 예금</S.MidDesc>
                            <S.MidAmount>
                                {dummy[5]}({dummy[0] + dummy[1] >= dummy[2] + dummy[3] + dummy[4] ? <span>+</span> : <span>-</span>}
                                {dummy[0] + dummy[1] - dummy[2] - dummy[3] - dummy[4]})<S.MidImg src={dollarcoin}></S.MidImg>
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
        </Modal>
    );
}

export default MonthlyCalculate;
