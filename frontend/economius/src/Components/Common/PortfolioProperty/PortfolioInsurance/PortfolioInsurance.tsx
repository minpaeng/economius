import * as S from '../PortfolioProperty.style';
import SlideToggle from 'react-slide-toggle';
import PortfolioInsuranceItem from './PortfolioInsuranceItem';
import { useState } from 'react';

function PortfolioInsurance({ totalPrice, amount, insuranceList }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

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
                                <img src='Insurance/Insurance.png' alt='img' />
                                <div style={{ fontSize: '20px' }}>보험</div>
                            </S.LayoutTopLeft>
                            <S.LayoutTopRight>
                                {insuranceList.length ? <div> 가입 상품 수 : {insuranceList.length} (개)</div> : '가입 중인 보험이 없습니다.'}
                            </S.LayoutTopRight>
                        </S.LayoutTop>
                        <div ref={setCollapsibleElement} style={{ paddingBottom: '5px' }}>
                            {insuranceList.map((item, idx) => {
                                return (
                                    <PortfolioInsuranceItem
                                        key={idx}
                                        title={item.productName}
                                        guaranteeRate={item.guaranteeRate}
                                        monthlyDeposit={item.monthlyDeposit}
                                    />
                                );
                            })}
                        </div>
                        {insuranceList.length ? (
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

export default PortfolioInsurance;
