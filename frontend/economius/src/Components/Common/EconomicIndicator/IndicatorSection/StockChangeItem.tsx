import * as S from '../../PortfolioProperty/PortfolioProperty.style';
import { useRecoilState } from 'recoil';
import { StockClickIdState } from '/src/recoil/animation/atom';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';

function StockChangeItem({ id, imgPath, title, type, value, valueChange, setSideBarType }) {
    const [stockId, setStockId] = useRecoilState(StockClickIdState);

    let percentStyleSpan;

    if (valueChange > 0) {
        percentStyleSpan = <span style={{ color: 'rgb(82,165,155)' }}> (+{valueChange}%)</span>;
    } else if (valueChange < 0) {
        percentStyleSpan = <span style={{ color: 'rgb(221,94,86)' }}> ({valueChange}%)</span>;
    } else {
        percentStyleSpan = <span style={{ color: 'black' }}> ({valueChange}%)</span>;
    }

    const handleButtonClick = () => {
        setSideBarType('StockCheck'); // 원하는 값으로 설정
        setStockId(id);
    };

    return (
        <S.PropertyLayoutItem onClick={() => (handleButtonClick(), effectAudioClick.play())}>
            <S.LayoutTop>
                <S.LayoutTopLeft>
                    <img src={`Stock/${imgPath}.png`} alt='img' />
                    <div>
                        <div>{title}</div>
                        <div style={{ color: 'gray' }}>{type}</div>
                    </div>
                </S.LayoutTopLeft>
                <S.LayoutTopRight>
                    현재가: {value.toLocaleString()}
                    {percentStyleSpan}
                </S.LayoutTopRight>
            </S.LayoutTop>
        </S.PropertyLayoutItem>
    );
}
export default StockChangeItem;
