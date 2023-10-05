import * as S from '../PortfolioProperty.style';
import { useRecoilState } from 'recoil';
import { StockClickIdState } from '/src/recoil/animation/atom';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';

function PortforlioStockItem({ id, imgPath, title, type, cnt, value, valueChange, incDecAmount, expectedProfit, setSideBarType }) {
    const [stockId, setStockId] = useRecoilState(StockClickIdState);

    const handleButtonClick = () => {
        setSideBarType('StockCheck'); // 원하는 값으로 설정
        setStockId(id);
    };

    let percentStyleSpan;

    if (valueChange > 0) {
        percentStyleSpan = <span style={{ color: 'red' }}> (+{valueChange}%)</span>;
    } else if (valueChange < 0) {
        percentStyleSpan = <span style={{ color: 'blue' }}> ({valueChange}%)</span>;
    } else {
        percentStyleSpan = <span style={{ color: 'black' }}> ({valueChange}%)</span>;
    }

    return (
        <S.PropertyLayoutItem
            onClick={() => {
                handleButtonClick;
                effectAudioClick.play();
            }}
        >
            <S.LayoutTop>
                <S.LayoutTopLeft>
                    <img src={`Stock/${imgPath}.png`} alt='img' />
                    <div>
                        <div>{title}</div>
                        <div style={{ color: 'gray' }}>{type}</div>
                    </div>
                </S.LayoutTopLeft>
                <S.LayoutTopRight>수량: {cnt}주</S.LayoutTopRight>
            </S.LayoutTop>

            <S.DivideLine />

            <S.LayoutBottom>
                <S.LayoutBottomitem>
                    <S.LayoutBottomitemLeft>총 자산가치</S.LayoutBottomitemLeft>
                    <S.LayoutBottomitemRight>
                        {value.toLocaleString()}
                        {percentStyleSpan}
                    </S.LayoutBottomitemRight>
                </S.LayoutBottomitem>
                <S.LayoutBottomitem>
                    <S.LayoutBottomitemLeft>증감액</S.LayoutBottomitemLeft>
                    <S.LayoutBottomitemRight>{incDecAmount.toLocaleString()}</S.LayoutBottomitemRight>
                </S.LayoutBottomitem>
                <S.LayoutBottomitem>
                    <S.LayoutBottomitemLeft>예상 배당금</S.LayoutBottomitemLeft>
                    <S.LayoutBottomitemRight>{(expectedProfit * (cnt / 100)).toLocaleString()}</S.LayoutBottomitemRight>
                </S.LayoutBottomitem>
            </S.LayoutBottom>
        </S.PropertyLayoutItem>
    );
}

export default PortforlioStockItem;
