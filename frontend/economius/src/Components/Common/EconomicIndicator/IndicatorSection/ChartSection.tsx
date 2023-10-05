import * as S from '../../PortfolioProperty/PortfolioProperty.style';
import SlideToggle from 'react-slide-toggle';
import ChartSectionItem from './ChartSectionItem';
import { useState } from 'react';

import RealEstateChart from './RealEstateChart';

function ChartSection({ title, imgPath, data }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    let percentStyleSpan;

    if (data?.rate > 0) {
        percentStyleSpan = <span style={{ color: 'rgb(221,94,86)' }}> (+{data?.rate}%)</span>;
    } else if (data?.rate < 0) {
        percentStyleSpan = <span style={{ color: 'rgb(82,165,155)' }}> ({data?.rate}%)</span>;
    } else {
        percentStyleSpan = <span style={{ color: 'black' }}> ({data?.rate}%)</span>;
    }

    let layoutTopRight;
    let chartHistory;

    if (title === '금리') {
        layoutTopRight = (
            <S.LayoutTopRight>
                현재금리 : {data.currentValue}
                {percentStyleSpan}
            </S.LayoutTopRight>
        );
        chartHistory = <ChartSectionItem data={dataChange(data.rateHistory)} />;
    } else if (title === '금') {
        layoutTopRight = (
            <S.LayoutTopRight>
                가격 : {data.price.toLocaleString()} (원)
                {percentStyleSpan}
            </S.LayoutTopRight>
        );
        chartHistory = <ChartSectionItem data={dataChange(data.priceHistory)} />;
    } else {
        layoutTopRight = <S.LayoutTopRight></S.LayoutTopRight>;
        chartHistory = <RealEstateChart data={data} />;
    }

    function dataChange(arr) {
        const returnData = [];
        for (let i = 0; i < arr.length; i++) {
            returnData.push({ turn: i + 1, price: arr[i] });
        }

        return returnData;
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
                                <img src={`EconomicIndicator/${imgPath}.png`} alt='img' />
                                <div style={{ fontSize: '18px' }}>{title}</div>
                            </S.LayoutTopLeft>
                            {layoutTopRight}
                        </S.LayoutTop>
                        <div ref={setCollapsibleElement}>
                            {/* <ChartSectionItem data={dataChange(data.priceHistory)} /> */}
                            {chartHistory}
                        </div>

                        <S.ToggleBtn
                            style={{ padding: 0 }}
                            onClick={() => {
                                toggle();
                                toggleCollapse();
                            }}
                        >
                            {isCollapsed ? '▼' : '▲'} {/* 토글 상태에 따라 아이콘 변경 */}
                        </S.ToggleBtn>
                    </S.ToggleLayout>
                )}
            />
        </>
    );
}

export default ChartSection;
