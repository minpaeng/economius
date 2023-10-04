import * as S from '../PortfolioProperty.style';
import SlideToggle from 'react-slide-toggle';
import PortforlioStockItem from './PortfolioStockItem';
import { useState } from 'react';

function PortfolioStock({ setSideBarType, userId, earningRate, earningPrice, stockList }) {
    const dummy = [
        {
            id: 10,
            imgPath: 'samsung',
            title: '삼성전자',
            type: '반도체',
            cnt: 4,
            value: 210000,
            valueChange: 5,
            incDecAmount: 36000,
            expectedProfit: 12000,
        },
        {
            id: 11,
            imgPath: 'Aramco',
            title: '아람쿠',
            type: '석유',
            cnt: 7,
            value: 350000,
            valueChange: -3,
            incDecAmount: -40000,
            expectedProfit: 6000,
        },
    ];

    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    let percentStyleSpan;

    if (earningRate > 0) {
        percentStyleSpan = <span style={{ color: 'red' }}> (+{earningRate}%)</span>;
    } else if (earningRate < 0) {
        percentStyleSpan = <span style={{ color: 'blue' }}> ({earningRate}%)</span>;
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
                                <img src='Portfolio/Stock.png' alt='img' />
                                <div style={{ fontSize: '18px' }}>주식</div>
                            </S.LayoutTopLeft>
                            <S.LayoutTopRight>
                                {stockList.length ? (
                                    <div>
                                        {' '}
                                        총 자산가치 : {earningPrice.toLocaleString()} (원)
                                        {percentStyleSpan}
                                    </div>
                                ) : (
                                    '보유 중인 주식이 없습니다.'
                                )}
                            </S.LayoutTopRight>
                        </S.LayoutTop>
                        <div ref={setCollapsibleElement} style={{ paddingBottom: '5px' }}>
                            {stockList.map((item, idx) => {
                                return (
                                    <PortforlioStockItem
                                        key={idx}
                                        id={item.stock.stockId}
                                        imgPath={item.stock.stockId}
                                        title={item.stock.name}
                                        type={item.stock.companySubCategory}
                                        cnt={item.stock.owners[userId]}
                                        value={item.earningPrice}
                                        valueChange={item.earningRate}
                                        incDecAmount={item.earningPrice - item.totalCost}
                                        expectedProfit={item.stock.price}
                                        setSideBarType={setSideBarType}
                                    />
                                );
                            })}
                        </div>
                        {stockList.length ? (
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

export default PortfolioStock;
