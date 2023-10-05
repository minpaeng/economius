import { useEffect, useRef, useState } from 'react';
import video3 from '/video/video_repeat.mp4'; // sound
import StartAccess from './Components/Modals/StartAccess';
import * as S from '../src/Components/Modals/GlobalModal.stye';
import {
    RoomCountState,
    RoomHostState,
    RoomIdState,
    RoomJoinUsersNicknameState,
    SetShowJoinState,
    SetShowWaitRoomState,
    StartReturnState,
    UseridState,
} from './recoil/animation/atom';
import { useRecoilState } from 'recoil';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import WaitRoom from './Components/Modals/WaitRoom';
import Join from './Components/Modals/Join';
import StartLoginCheck from './Components/Modals/StartLoginCheck';

import Socket from './Socket';
import { PlayerIdState, ClickUserPortfolioState } from '/src/recoil/game/atom.tsx';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';

export default function Room() {
    // 최상단 컴포넌트에서 모달을 쓸 것이라고 명시 작업이 필요
    Modal.setAppElement('#root');

    // recoil
    const [userid, setUserid] = useRecoilState(UseridState);
    const [roomid, setRoomid] = useRecoilState(RoomIdState);

    const videoRef = useRef(null);
    const [isOpen, setIsOpen] = useState(true); // 모달이 열려 있는지 확인
    const [isMuted, setIsMuted] = useState(true); // 비디오 음소거 상태
    const [currentVideo, setCurrentVideo] = useState(video3);

    const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;
    const REDIRECT_URI = import.meta.env.VITE_APP_REDIRECT_URI;
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const [isModalClosed, setIsModalClosed] = useState(false); // 모달이 닫힌 상태를 관리
    const [renderContent, setRenderContent] = useState(false); // 모달이 닫힌 후 n초 뒤에 렌더링할 상태를 관리
    const [showWaitRoom, setShowWaitRoom] = useRecoilState(SetShowWaitRoomState);
    const [roomJoinUsersNicknameState, setRoomJoinUsersNicknameState] = useRecoilState(RoomJoinUsersNicknameState);

    const [showJoin, setShowJoin] = useRecoilState(SetShowJoinState);
    const [, setPlayerId] = useRecoilState(PlayerIdState);
    const [roomHost, setRoomHost] = useRecoilState(RoomHostState);
    const [roomCount, setRoomCount] = useRecoilState(RoomCountState);
    const [startReturn, setStartReturn] = useRecoilState(StartReturnState);

    const [clickUserPortfolio, setClickUserPortfolio] = useRecoilState(ClickUserPortfolioState);

    // const [showJoin, setShowJoin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token === null) navigate('/');

        // if (!window.Kakao.isInitialized()) {
        //     window.Kakao.init(import.meta.env.VITE_APP_JavaScript_URI);
        // }
    }, [navigate]);

    // 모달 열기
    const openModal = () => {
        setIsOpen(true);
        // 모달이 열릴 때, 다른 스크립트를 일시정지하거나 제어 가능
    };

    // 모달 닫기
    const closeModal = () => {
        setIsOpen(false);
        setIsModalClosed(true);
    };

    // 시작하자마자 모달 열기
    useEffect(() => {
        openModal();
        setClickUserPortfolio(Number(localStorage.getItem('player')));
    }, []);

    // 모달이 닫히면 적용
    useEffect(() => {
        if (!isOpen) {
            const videoElement = videoRef.current;

            // 비디오를 로드하고 로드가 완료되면 비디오를 재생합니다.
            videoElement.src = currentVideo;

            // 비디오가 로드될 때마다 실행되는 이벤트 핸들러
            const handleLoadedData = () => {
                // 비디오를 재생하고 루프로 설정합니다.
                videoElement.play();
                videoElement.muted = !isMuted; // 비디오 음소거 상태를 반전시킴
                setIsMuted(!isMuted);
                console.log('DDDDDDDDDDDDDDDDDDDDDDDDDD');

                console.log(isMuted);

                // setTimeout(() => {
                //     setIsMuted(!isMuted);
                // }, 1000);
                videoElement.loop = true;

                // 비디오 1의 로드 이벤트 핸들러를 제거합니다.
                // videoElement.removeEventListener('loadeddata', handleLoadedData);

                // // 비디오 1을 재생한 후, 10초 후에 비디오 2로 변경합니다.
                // setTimeout(() => {
                //     console.log('hello');
                //     setCurrentVideo(video3);
                // }, 2000);
            };

            // 비디오 1의 로드 이벤트 핸들러를 추가합니다.
            videoElement.addEventListener('loadeddata', handleLoadedData);

            // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
            return () => {
                videoElement.removeEventListener('loadeddata', handleLoadedData);
            };
        }
    }, [isOpen]);

    // 모달이 닫힌 상태후 n초 뒤 렌더링할 내용을 활성화
    useEffect(() => {
        if (isModalClosed) {
            const timeoutId = setTimeout(() => {
                setRenderContent(true);
            }, 4000);

            // 컴포넌트가 언마운트될 때 타이머를 클리어합니다.
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isModalClosed]);

    useEffect(() => {
        if (startReturn == true) {
            navigate('/app');
        }
    }, [startReturn]);

    // 소리 허용 버튼을 클릭했을 때 실행
    const videoControl = () => {
        // 기존 적용된 비디오 실행
        console.log('비디오 컨트롤!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1');

        const videoElement = videoRef.current;
        videoElement.play();
        // 상태 업데이트
        closeModal();

        // 비디오 1을 재생한 후, 10초 후에 비디오 2로 변경합니다.
        // setTimeout(() => {
        //     setCurrentVideo(video3);
        // }, 5000);
    };

    // 방 생성
    const roomMakeHandler = async () => {
        try {
            // localStorage에서 player 값을 가져옵니다.
            const player = localStorage.getItem('player');
            const nickname = localStorage.getItem('nickname');
            setPlayerId(Number(player));
            if (!player) throw new Error('Player not found in local storage');

            const response = await axios.post('https://j9b109.p.ssafy.io/api/room/create', {
                player: Number(player), // 문자열을 숫자로 변환해주기 위해 Number를 사용합니다.
                nickname: nickname, // 문자열을 숫자로 변환해주기 위해 Number를 사용합니다.
            });

            // 룸 번호 저장
            console.log(response.data.roomId); // { roomId: 2 }와 같은 응답 출력
            setRoomid(response.data.roomId);

            setRoomJoinUsersNicknameState([nickname, 'wait..', 'wait..', 'wait..']);

            setShowWaitRoom(true);
            setRoomHost(Number(localStorage.getItem('player')));
            setRoomCount(1);
        } catch (error) {
            console.error('Axios error: ' + error.message); // 네트워크 오류 처리
        }
    };

    // 방 코드로 입장하기
    const roomJoinHandler = () => {
        setPlayerId(Number(localStorage.getItem('player')));
        setShowJoin(true);
    };

    // const shareKakao = () => {
    //     // window.Kakao.Link.sendCustom({
    //     //   templateId: 98901, // 내가 만든 템플릿 아이디를 넣어주면 된다
    //     // });
    // };

    return (
        <>
            <video muted={isMuted} ref={videoRef} loop>
                <source src={video3} type='video/mp4' />
            </video>
            <div className='content'>
                {/* 화면 처음 들어오면 자동으로 켜지는 모달 */}
                {isOpen && (
                    <>
                        <StartLoginCheck videoControl={videoControl} />
                    </>
                )}
                {/* 모달이 닫힌 후 5초 뒤에 렌더링할 내용을 렌더링합니다. */}
                {renderContent && (
                    <S.ButtonOuter>
                        <S.RoundButtonRoom onClick={() => (roomMakeHandler(), effectAudioClick.play())}>
                            <span>방 생성하기</span>
                        </S.RoundButtonRoom>
                        <S.RoundButtonRoom onClick={() => (roomJoinHandler(), effectAudioClick.play())}>
                            <span>방 입장하기</span>
                        </S.RoundButtonRoom>
                    </S.ButtonOuter>
                )}
                {showWaitRoom && <WaitRoom />}
                {showJoin && <Join />}
            </div>

            <Socket />
        </>
    );
}
