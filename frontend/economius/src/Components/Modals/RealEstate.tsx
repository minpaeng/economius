import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { nowPlayerState } from '/src/recoil/animation/atom';
import hotelimg from '/RealState/hotel.png';
import restaurantimg from '/RealState/restaurant.png';
import shopimg from '/RealState/shop.png';
import * as S from './RealEstate.style';

function RealEstate() {
    const [nowPlayer, setNowPlayer] = useRecoilState(nowPlayerState);

    // 원래는 초기값 false로 두고 해당 위치 되면 true로 바꿔줘야할듯
    const [isOpen, setIsOpen] = useState(true);

    // 은행 방문 시, savings 배열이 비어있으면 가입모달
    // 아니면 해지 모달
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

    const realEstateImage = [hotelimg, restaurantimg, shopimg];

    return (
        <Modal isOpen={isOpen} style={S.modalStyle} onRequestClose={closeModal}>
            <S.Main>
                <S.Top>
                    <S.TopTitle>{dummy.name[dummy.id]}</S.TopTitle>
                </S.Top>

                <S.Mid>
                    <S.MidImg src={realEstateImage[dummy.id]} alt='img' />
                    <S.MidDesc>{dummy.owner && dummy.owner === nowPlayer ? dummy.price[dummy.id] : dummy.description[dummy.id]}</S.MidDesc>
                    <S.MidDesc>{dummy.fee[dummy.id]}</S.MidDesc>
                </S.Mid>

                <S.Divide />
                <S.Botton>{!dummy.owner ? '매수하기' : dummy.owner === nowPlayer ? '매도하기' : '확인'}</S.Botton>
            </S.Main>
        </Modal>
    );
}

export default RealEstate;
