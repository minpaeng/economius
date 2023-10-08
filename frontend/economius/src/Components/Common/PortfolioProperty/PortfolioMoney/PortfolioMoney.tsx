import * as S from '../PortfolioProperty.style';
import { useSetRecoilState } from 'recoil';
import { MovementCardRequestState } from '/src/recoil/animation/atom';

function PortfolioMoney({ money }) {
    const setMovementCardRequest = useSetRecoilState(MovementCardRequestState);

    return (
        <S.ToggleLayout>
            <S.LayoutTop>
                <S.LayoutTopLeft>
                    <img onClick={() => setMovementCardRequest(true)} src='Bank/dollar-coin 15.png' alt='img' />
                    <div style={{ fontSize: '20px' }}>현금</div>
                </S.LayoutTopLeft>
                <S.LayoutTopRight>{money ? <div> {money.toLocaleString()} (원)</div> : '보유 중인 현금이 없습니다.'}</S.LayoutTopRight>
            </S.LayoutTop>
        </S.ToggleLayout>
    );
}
export default PortfolioMoney;
