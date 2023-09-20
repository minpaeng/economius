import Modal from 'react-modal';
import { useState } from 'react';
import financecenterimg from '/FinanceCenter/financecenter.png';
import checksign from '/BeforeBankrupt/checksign.png';
import dollarcoin from '/BeforeBankrupt/dollarcoin.png';
import * as S from './BeforeBankrupt.style';

// 자산들 이름
// 자산들 가격
// 소유한 자산들
const A = ['삼성전자', '레스토랑', '호텔', '삼성전자', '레스토랑', '호텔'];
const B = [41, 34423];
const ownedAssets = [false, false, false, false, false, false];

function BeforeBankrupt() {
    // 원래는 초기값 false로 두고 해당 위치 되면 true로 바꿔줘야할듯
    const [isOpen, setIsOpen] = useState(true);
    // 아니면 해지 모달
    const closeModal = () => {
        setIsOpen(false);
    };
    // 체크 함수
    const [selected, setSelected] = useState(ownedAssets);
    const Selecting = (idx: number) => {
        setSelected(prev => [...prev.slice(0, idx), !prev[idx], ...prev.slice(idx + 1)]);
    };

    return (
        <Modal isOpen={isOpen} style={S.modalStyle} onRequestClose={closeModal}>
            <S.Main>
                <S.Top>
                    <S.TopTitle>현금이 부족합니다.</S.TopTitle>
                </S.Top>

                <S.Mid>
                    <S.MidTitle>내 자산</S.MidTitle>
                    <hr style={{ width: '200px' }} />
                    <S.MidScroll>
                        {A.map((val, idx) => (
                            <S.MidItem key={idx}>
                                <S.MidCheck onClick={() => Selecting(idx)}>
                                    {selected[idx] ? <S.MidCheckImg src={checksign} alt='checksign' /> : null}
                                </S.MidCheck>

                                <S.MidImg src={financecenterimg} alt='financecenterimg'></S.MidImg>
                                <S.MidDesc>{val}</S.MidDesc>
                            </S.MidItem>
                        ))}
                    </S.MidScroll>
                </S.Mid>

                <S.MidCalc>
                    <S.MidCalcDesc>
                        필요 금액 : {B[0]}
                        <S.CoinImg src={dollarcoin} alt='dollarcoin' />
                    </S.MidCalcDesc>
                    <S.MidCalcDesc>
                        매각 금액 : {B[1]}
                        <S.CoinImg src={dollarcoin} alt='dollarcoin' />
                    </S.MidCalcDesc>
                    <div style={{ width: '230px', padding: '3px' }}>
                        <hr />
                    </div>
                    <S.MidCalcDesc>
                        <b>잔여 금액 :</b>
                        {'\u00A0'}
                        <b style={{ color: B[1] - B[0] < 0 ? 'red' : undefined }}>{B[1] - B[0]}</b>
                        <S.CoinImg src={dollarcoin} alt='dollarcoin' />
                    </S.MidCalcDesc>
                </S.MidCalc>

                <S.Divide />
                <S.Button
                    onClick={() => alert('파산 매각 모달')}
                    disabled={!(B[1] - B[0] >= 0)}
                    style={{ backgroundColor: B[1] - B[0] >= 0 ? '#ffaa55' : '#D9D9D9' }}
                ></S.Button>
            </S.Main>
        </Modal>
    );
}

export default BeforeBankrupt;
