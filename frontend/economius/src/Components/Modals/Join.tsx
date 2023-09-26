import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import { TradeBankState } from '/src/recoil/trading/atom';
import { useState } from 'react';
import * as S from './Join.style';

export default function Join({ setShowJoin }) {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [inputValue, setInputValue] = useState(''); // input 값을 상태로 관리

    const closeModal = () => {
        setIsModalOpen(false);
        setShowJoin(false);
    };

    const JoinButtonClickHandler = () => {
        // 여기에 연결학세요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log('CLICK');

        // 모달 닫기
        // 룸 정보 데이터 받아오기
        // 룸 모달 열기
    };

    // input 값 변경 시 상태 업데이트
    const handleChange = e => {
        setInputValue(e.target.value);
    };

    const [tradeBank, setTradeBank] = useRecoilState(TradeBankState);

    return (
        <Modal isOpen={isModalOpen} style={S.modalStyle} onRequestClose={closeModal}>
            <S.Main>
                <S.Mid>
                    {/* input 추가 */}
                    <input type='text' value={inputValue} onChange={handleChange} />
                </S.Mid>
                <S.BankDivide />
                <S.BankJoinBottom onClick={JoinButtonClickHandler}>방 입장하기</S.BankJoinBottom>
            </S.Main>
        </Modal>
    );
}
