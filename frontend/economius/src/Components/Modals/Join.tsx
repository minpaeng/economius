import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import { TradeBankState } from '/src/recoil/trading/atom';
import { useState } from 'react';
import * as S from './Join.style';
import charImg from '/navImg/join.png';
import { RoomIdState, RoomJoinState, SetShowJoinState, SetShowWaitRoomState } from '/src/recoil/animation/atom';

export default function Join() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [inputValue, setInputValue] = useState(''); // input 값을 상태로 관리

    const [showJoin, setShowJoin] = useRecoilState(SetShowJoinState);
    // const [showWaitRoom, setShowWaitRoom] = useRecoilState(SetShowWaitRoomState);

    const [roomJoin, setRoomJoin] = useRecoilState(RoomJoinState);
    const [roomId, setRoomId] = useRecoilState(RoomIdState);

    const effectAudioClick = new Audio('/effectSound/click.wav'); // 출력할 소리

    const closeModal = () => {
        setIsModalOpen(false);
        setShowJoin(false);
    };

    const JoinButtonClickHandler = () => {
        // 여기에 연결학세요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        effectAudioClick.play(); // 출력할 위치에 작성
        setRoomId(Number(inputValue)); // 방 번호를 변경
        setRoomJoin(1); // 방 입장하겠음

        // 모달 닫기
        closeModal();
        // 룸 정보 데이터 받아오기
        // 룸 모달 열기
        // setShowWaitRoom(true);
        console.log('룸 모달 출력');
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
                    <S.MidImg src={charImg} alt='char-img'></S.MidImg>

                    {/* input 추가 */}
                    <input className='input_class' type='text' value={inputValue} onChange={handleChange} placeholder='방 번호를 입력해주세요.' />
                </S.Mid>
                <S.BankDivide />
                <S.BankJoinBottom onClick={JoinButtonClickHandler}>방 입장하기</S.BankJoinBottom>
            </S.Main>
        </Modal>
    );
}
