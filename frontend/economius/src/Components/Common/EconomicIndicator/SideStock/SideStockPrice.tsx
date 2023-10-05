import * as S from './SideStock.style';

function SideStockPrice({ companyCategory, companySubCategory, price, rate }) {
    let percentStyleSpan;

    if (rate > 0) {
        percentStyleSpan = <span style={{ color: 'rgb(221,94,86)' }}> (+{rate}%)</span>;
    } else if (rate < 0) {
        percentStyleSpan = <span style={{ color: 'rgb(82,165,155)' }}> ({rate}%)</span>;
    } else {
        percentStyleSpan = <span style={{ color: 'black' }}> ({rate}%)</span>;
    }
    return (
        <S.SideStockPrice>
            <S.SideStockPriceItem style={{ fontSize: '22px' }}>
                <div>{companyCategory} / </div>
                <div>{companySubCategory}</div>
            </S.SideStockPriceItem>
            <S.SideStockPriceItem>
                <div>{price.toLocaleString()} (원)</div>
                {percentStyleSpan}
            </S.SideStockPriceItem>
        </S.SideStockPrice>
    );
}

export default SideStockPrice;
