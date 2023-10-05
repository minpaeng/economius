import Modal from 'react-modal';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Carousel } from 'react-responsive-carousel';
import Ticker, { FinancialTicker } from 'nice-react-ticker';
import { useRecoilValue } from 'recoil';
import { StockChangeArrState } from '/src/recoil/game/atom';

function NewsBar() {
    const StockRateObj = useRecoilValue(StockChangeArrState);

    // modal style
    const modalStyle: any = {
        overlay: {
            position: 'fixed',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '94%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: '1',
            //   width: "100px",
            //   height: "6%",
        },
        content: {
            display: 'flex',
            flexDirextion: 'column',
            alignItems: 'center',

            backgroundColor: 'rgb(12,14,20)',
            overflow: 'auto',
            zIndex: '1',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            //   border: "5px solid white",
            borderRadius: '0px',
            padding: '0px',
        },
    };

    function objectToArray(obj) {
        if (!obj) {
            return [];
        }
        return Object.values(obj);
    }

    const StockRateArr = objectToArray(StockRateObj);
    const LongStockRateArr = [...StockRateArr, ...StockRateArr];
    console.log(StockRateArr);

    return (
        <Modal isOpen={true} style={modalStyle}>
            <img src='NewsBar/megaphone.png' alt='img' style={{ width: '50px' }} />
            <Ticker slideSpeed={80}>
                {LongStockRateArr.map((item, idx) => {
                    return (
                        <div style={{ padding: '0px 8px' }} key={idx}>
                            <FinancialTicker
                                id={idx}
                                symbol={item.name}
                                lastPrice={`${item.companyCategory}/${item.companySubCategory}`}
                                currentPrice={item.price}
                                percentage={`${item.rateHistory[item.rateHistory.length - 1]}%`}
                                change={item.rateHistory[item.rateHistory.length - 1] >= 0 ? true : false}
                            />
                        </div>
                    );
                })}
            </Ticker>
        </Modal>
    );
}

export default NewsBar;
