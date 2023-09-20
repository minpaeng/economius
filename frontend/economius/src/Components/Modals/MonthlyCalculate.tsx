import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { nowPlayerState } from '/src/recoil/animation/atom';
import monthlymalculate from '/MonthlyCalculate/monthlycalculate.png';
import * as S from './MonthlyCalculate.style';

function MonthlyCalculate() {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
    };

    const dummy: any = {
        id: 0,
        owner: 0,
        name: ['레스토랑', '상점', '호텔'],
        price: ['가격: 50,000', '가격: 70,000', '가격: 100,000'],
        fee: ['식사 비용: 5000', '쇼핑 비용: 7000', '숙박 비용: 10000'],
        description: ['식사 비용을 지불합니다', '쇼핑 비용을 지불합니다', '숙박 비용을 지원합니다'],
    };

    return (
        <Modal isOpen={isOpen} style={S.modalStyle} onRequestClose={closeModal}>
            <S.Main>
                <S.Top>
                    <S.TopImg src={monthlymalculate} alt='monthlymalculate' />
                    <S.TopTitle>월말정산</S.TopTitle>
                </S.Top>
                <S.Divide />

                <S.Mid>
                    <S.MidItem>
                        <S.MidDesc>월급</S.MidDesc>
                        <S.MidDesc>적금 만기</S.MidDesc>
                        <S.MidDesc></S.MidDesc>
                        <S.MidDesc>적금</S.MidDesc>
                        <S.MidDesc>보험비</S.MidDesc>
                        <S.MidDesc>세금</S.MidDesc>
                        <S.MidDesc></S.MidDesc>
                        <S.MidDesc>총 명세액</S.MidDesc>
                        <div style={{ height: '20px', paddingTop: '10px' }}>
                            <hr />
                        </div>
                        <S.MidDesc>총 명세액</S.MidDesc>
                    </S.MidItem>
                </S.Mid>
            </S.Main>
        </Modal>
    );
}

export default MonthlyCalculate;
