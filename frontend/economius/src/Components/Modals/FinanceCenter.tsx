import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { IsModalOpenState, CallBackState } from '/src/recoil/animation/atom';
import { FinanceCenterState } from '/src/recoil/modalInfo/atom';
import { PlayerToRollState, PlayerIdState } from '/src/recoil/game/atom';
import financecenterimg from '/FinanceCenter/financecenter.png';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';

import * as S from './FinanceCenter.style';
import { ExitButton } from './GlobalModal.stye';

const buildings: [string, number][] = [
    ['대한전력', 1],
    ['궁민은행', 2],
    ['아람쿠', 3],
    ['레스토랑', 4],
    ['포스쿠', 5],
    ['삼성화재', 6],
    ['IG화학', 7],
    ['화이지', 9],
    ['신혼은행', 10],
    ['셀트리안', 11],
    ['나이카', 13],
    ['상점', 14],
    ['코카펩시', 15],
    ['AIR관광', 17],
    ['onebank', 18],
    ['CZ엔터', 19],
    ['K텔레콤', 21],
    ['호텔', 22],
    ['M소프트', 23],
    ['대한운송', 25],
    ['대현건설', 27],
    ['넥서스', 29],
    ['금 거래소', 30],
    ['삼성전자', 31],
];

function FinanceCenter() {
    const [financeCenter, setFinanceCenter] = useRecoilState(FinanceCenterState);
    const playerId = useRecoilValue(PlayerIdState);
    const PlayerToRoll = useRecoilValue(PlayerToRollState);
    const [selectedOption, setSelectedOption] = useState<number>(-1);
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const setCallBack = useSetRecoilState(CallBackState);
    const closeModal = () => {
        setCallBack(true);
        setFinanceCenter(-1);
    };

    useEffect(() => {
        effectAudioPopup.play(); // 출력할 위치에 작성
    }, []);

    return (
        <>
            {playerId === PlayerToRoll ? (
                <Modal isOpen={isModalOpen} style={S.modalStyle}>
                    <ExitButton onClick={() => (closeModal(), effectAudioClick.play())} src='/button/exit.png' alt='exit' />
                    <S.Main>
                        <S.Top>
                            <img src={financecenterimg} alt='img' style={{ width: '50px', marginRight: '10px' }} />

                            <S.TopTitle>종합거래소</S.TopTitle>
                        </S.Top>
                        <S.MidTitle>주식, 부동산, 적금, 보험, 금, 코인 등 금융 거래를 한 곳에서 할 수 있습니다.</S.MidTitle>
                        <S.Mid>
                            <S.MidScroll>
                                <hr style={{ width: '200px', marginBottom: '5px' }} />
                                {buildings.map(val => (
                                    <S.MidItem key={val[1]} onClick={() => (setSelectedOption(val[1]), effectAudioClick.play())}>
                                        <input type='radio' value={val[1]} checked={selectedOption === val[1]} style={{ marginRight: '5px' }} />
                                        <S.MidImg src={`/FinanceCenter/${val[1]}.png`} alt={`${val[0]}`}></S.MidImg>
                                        <S.MidDesc>{val[0]}</S.MidDesc>
                                    </S.MidItem>
                                ))}
                            </S.MidScroll>
                        </S.Mid>
                        {'\u00A0'}
                        <S.Divide />
                        <S.Button
                            onClick={() => (setFinanceCenter(selectedOption), setIsModalOpen(false), effectAudioClick.play())}
                            style={{ backgroundColor: selectedOption !== -1 ? '#ffaa55' : '#D9D9D9' }}
                        >
                            선택하기
                        </S.Button>
                    </S.Main>
                </Modal>
            ) : (
                <div style={{ position: 'absolute', left: '40%', top: '50%', height: '50px', backgroundColor: 'brown' }}>종합거래소에서 다른 사람이 거래중</div>
            )}
        </>
    );
}

export default FinanceCenter;
