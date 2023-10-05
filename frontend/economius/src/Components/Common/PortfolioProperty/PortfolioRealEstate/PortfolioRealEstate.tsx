import * as S from '../PortfolioProperty.style';
import SlideToggle from 'react-slide-toggle';
import PortfolioRealEstateItem from './PortfolioRealEstateItem';
import { useState } from 'react';

function PortfolioRealEstate({
    totalPrice,
    earningRate,

    buildingList,
}) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    let percentStyleSpan;

    if (earningRate > 0) {
        percentStyleSpan = <span style={{ color: 'rgb(221,94,86)' }}> (+{earningRate}%)</span>;
    } else if (earningRate < 0) {
        percentStyleSpan = <span style={{ color: 'rgb(82,165,155)' }}> ({earningRate}%)</span>;
    } else {
        percentStyleSpan = <span style={{ color: 'black' }}> ({earningRate}%)</span>;
    }

    return (
        <>
            <SlideToggle
                duration={500}
                collapsed={isCollapsed} // 토글 상태에 따라 초기 상태 설정
                whenReversedUseBackwardEase={false}
                render={({ toggle, setCollapsibleElement }) => (
                    <S.ToggleLayout>
                        <S.LayoutTop>
                            <S.LayoutTopLeft>
                                <img src='Portfolio/RealEstate.png' alt='img' />
                                <div style={{ fontSize: '18px' }}>부동산</div>
                            </S.LayoutTopLeft>
                            <S.LayoutTopRight>
                                {totalPrice ? (
                                    <div>
                                        {' '}
                                        총 자산가치 : {totalPrice.toLocaleString()} (원)
                                        {percentStyleSpan}
                                    </div>
                                ) : (
                                    '보유 중인 부동산이 없습니다.'
                                )}
                            </S.LayoutTopRight>
                        </S.LayoutTop>
                        <div ref={setCollapsibleElement} style={{ paddingBottom: '5px' }}>
                            {buildingList.map((item, idx) => {
                                return (
                                    <PortfolioRealEstateItem
                                        key={idx}
                                        imgPath={item.building.name}
                                        title={item.building.name}
                                        price={item.building.price}
                                        earningRate={item.earningRate}
                                        earningPrice={item.earningPrice}
                                        buildingFee={item.building.buildingFee}
                                    />
                                );
                            })}
                        </div>
                        {buildingList.length ? (
                            <S.ToggleBtn
                                onClick={() => {
                                    toggle();
                                    toggleCollapse();
                                }}
                            >
                                {isCollapsed ? '▼' : '▲'} {/* 토글 상태에 따라 아이콘 변경 */}
                            </S.ToggleBtn>
                        ) : null}
                    </S.ToggleLayout>
                )}
            />
        </>
    );
}

export default PortfolioRealEstate;
