import * as S from '../PortfolioProperty.style';

function PortfolioRealEstateItem({ imgPath, title, price, earningRate, earningPrice, buildingFee }) {
    let percentStyleSpan;

    if (earningRate > 0) {
        percentStyleSpan = <span style={{ color: 'rgb(82,165,155)' }}> (+{earningRate}%)</span>;
    } else if (earningRate < 0) {
        percentStyleSpan = <span style={{ color: 'rgb(221,94,86)' }}> ({earningRate}%)</span>;
    } else {
        percentStyleSpan = <span style={{ color: 'black' }}> ({earningRate}%)</span>;
    }

    let buildingitem;

    if (title === 'restaurant') {
        buildingitem = '레스토랑';
    } else if (title === 'hotel') {
        buildingitem = '호텔';
    } else {
        buildingitem = '가게';
    }

    return (
        <S.PropertyLayoutItem>
            <S.LayoutTop>
                <S.LayoutTopLeft>
                    <img src={`RealState/${imgPath}.png`} alt='img' />
                    <div>
                        <div>{buildingitem}</div>
                    </div>
                </S.LayoutTopLeft>
                <S.LayoutTopRight></S.LayoutTopRight>
            </S.LayoutTop>

            <S.DivideLine />

            <S.LayoutBottom>
                <S.LayoutBottomitem>
                    <S.LayoutBottomitemLeft>총 자산가치</S.LayoutBottomitemLeft>
                    <S.LayoutBottomitemRight>
                        {price.toLocaleString()}
                        {percentStyleSpan}
                    </S.LayoutBottomitemRight>
                </S.LayoutBottomitem>
                <S.LayoutBottomitem>
                    <S.LayoutBottomitemLeft>증감액</S.LayoutBottomitemLeft>
                    <S.LayoutBottomitemRight>{earningPrice.toLocaleString()}</S.LayoutBottomitemRight>
                </S.LayoutBottomitem>
                <S.LayoutBottomitem>
                    <S.LayoutBottomitemLeft>시설 이용 수입</S.LayoutBottomitemLeft>
                    <S.LayoutBottomitemRight>{buildingFee.toLocaleString()}</S.LayoutBottomitemRight>
                </S.LayoutBottomitem>
            </S.LayoutBottom>
        </S.PropertyLayoutItem>
    );
}
export default PortfolioRealEstateItem;
