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

            backgroundColor: 'black',
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
            <Ticker slideSpeed={60}>
                {/* <FinancialTicker id='1' change={true} symbol='test' lastPrice='200' percentage='0.4' currentPrice='160' />
                <FinancialTicker id='2' change={false} symbol='test' lastPrice='200' percentage='0.4' currentPrice='160' />
                <FinancialTicker id='3' change={true} symbol='test' lastPrice='200' percentage='0.4' currentPrice='160' />
                <FinancialTicker id='4' change={true} symbol='test' lastPrice='200' percentage='0.4' currentPrice='160' />
                <FinancialTicker id='5' change={true} symbol='test' lastPrice='200' percentage='0.4' currentPrice='160' /> */}
                {LongStockRateArr.map((item, idx) => {
                    return (
                        <FinancialTicker
                            id={idx}
                            symbol={item.name}
                            lastPrice={`${item.companyCategory}/${item.companySubCategory}`}
                            currentPrice={item.price}
                            percentage={`${item.rateHistory[item.rateHistory.length - 1]}%`}
                            change={item.rateHistory[item.rateHistory.length - 1] >= 0 ? true : false}
                        />
                    );
                })}
            </Ticker>
        </Modal>
    );
}

export default NewsBar;

{
    /* <div style={{ fontSize: "25px" }}>
        <Carousel
          autoPlay={true}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          centerMode={false}
          infiniteLoop={true}
          stopOnHover={false}
          axis="vertical"
        >
          {data.map((word, index) => (
            <span key={index}>
              <b>{word}</b>
            </span>
          ))}
        </Carousel>
      </div> */
}
