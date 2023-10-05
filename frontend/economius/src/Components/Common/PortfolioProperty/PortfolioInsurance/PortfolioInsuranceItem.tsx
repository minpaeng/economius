import * as S from '../PortfolioProperty.style';

function PortfolioInsuranceItem({ title, guaranteeRate, monthlyDeposit }) {
    let expectedProfit;

    if (title === '의료보험') {
        expectedProfit = '교통사고, 건강검진, 임플란트';
    } else if (title === '의료특약보험') {
        expectedProfit = '교통사고, 건강검진, 임플란트, 폐암진단, 식중독, 심혈관 질환, 감기 유행';
    } else if (title === '상해보험') {
        expectedProfit = '교통사고, 화재발생, 도둑';
    } else {
        expectedProfit = '교통사고, 화재발생, 도둑, 해상사고, 토네이도, 홍수, 산재사고 ';
    }

    return (
        <S.PropertyLayoutItem>
            <S.LayoutTop>
                <S.LayoutTopLeft>
                    <img src={`Portfolio/Insurance.png`} alt='img' />
                    <div>
                        <div>{title}</div>
                    </div>
                </S.LayoutTopLeft>
                <S.LayoutTopRight>보장 정도 : {guaranteeRate} (%)</S.LayoutTopRight>
            </S.LayoutTop>

            <S.DivideLine />

            <S.LayoutBottom>
                <S.LayoutBottomitem>
                    <S.LayoutBottomitemLeft>월 납부료</S.LayoutBottomitemLeft>
                    <S.LayoutBottomitemRight>{monthlyDeposit.toLocaleString()}</S.LayoutBottomitemRight>
                </S.LayoutBottomitem>
                {/* <S.LayoutBottomitem>
          <S.LayoutBottomitemLeft>납부 횟수</S.LayoutBottomitemLeft>
          <S.LayoutBottomitemRight>{cycleCnt}</S.LayoutBottomitemRight>
        </S.LayoutBottomitem> */}
                <S.LayoutBottomitem>
                    <S.LayoutBottomitemLeft>보장 종목</S.LayoutBottomitemLeft>
                    <S.LayoutBottomitemRight>{expectedProfit}</S.LayoutBottomitemRight>
                </S.LayoutBottomitem>
            </S.LayoutBottom>
        </S.PropertyLayoutItem>
    );
}

export default PortfolioInsuranceItem;
