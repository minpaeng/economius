import Modal from 'react-modal';
import * as S from './SideBar.style';
import { useState } from 'react';
import Portfolio from './Portfolio';
import EconomicIndicator from './EconomicIndicator';
import StockCheck from './StockCheck';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import { StockClickIdState, SideBarTypeState, isPortfolioState, RoomJoinUsersIdState } from '/src/recoil/animation/atom';
import { ClickUserPortfolioState } from '/src/recoil/game/atom';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';

function SideBar() {
    const clickUserColor = useRecoilValue(ClickUserPortfolioState);

    const [sideBarType, setSideBarType] = useRecoilState(SideBarTypeState);

    const [stockId, setStockId] = useRecoilState(StockClickIdState);

    const [isPortfolio, setIsPortfolio] = useRecoilState(isPortfolioState);

    const userIdArr = useRecoilValue(RoomJoinUsersIdState);

    function idxReturn(Id) {
        const returnIdx = userIdArr.indexOf(Id);

        return returnIdx + 1;
    }
    const colorIdx = idxReturn(clickUserColor);

    // 렌더링할 컴포넌트 정의
    let componentToRender;

    if (sideBarType === 'portfolio') {
        componentToRender = <Portfolio setSideBarType={setSideBarType} />;
    } else if (sideBarType === 'economicIndicator') {
        componentToRender = <EconomicIndicator setSideBarType={setSideBarType} />;
    } else if (sideBarType === 'StockCheck') {
        componentToRender = <StockCheck clickStockId={stockId} isPortfolio={isPortfolio} setIsPortfolio={setIsPortfolio} />;
    }

    // 사이드바 컬러
    const defaultColor = '#b8d4ffdb';

    let sideBarColor;

    // if (colorIdx === 1) {
    //     sideBarColor = 'rgb(252, 238, 205)';
    // } else if (colorIdx === 2) {
    //     sideBarColor = 'rgb(207, 235, 244)';
    // } else if (colorIdx === 3) {
    //     sideBarColor = 'rgb(249, 216, 202)';
    // } else if (colorIdx === 4) {
    //     sideBarColor = 'rgb(249, 212, 212)';
    // }

    if (colorIdx === 1) {
        sideBarColor = 'rgba(255, 216, 133, 0.95)';
    } else if (colorIdx === 2) {
        sideBarColor = 'rgba(131, 213, 233, 0.95)';
    } else if (colorIdx === 3) {
        sideBarColor = 'rgba(255, 166, 132, 0.95)';
    } else if (colorIdx === 4) {
        sideBarColor = 'rgba(255, 156, 159, 0.95)';
    }

    // modal style
    const modalStyle: any = {
        overlay: {
            position: 'fixed',
            top: '6%',
            left: '75%',
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            zIndex: 1,
            //   width: "0px",
        },
        content: {
            display: 'flex',
            flexDirextion: 'column',
            // backgroundColor: isPortfolio ? sideBarColor : defaultColor,
            backgroundColor: 'rgba(12,14,20,0.8)',
            overflow: 'auto',
            zIndex: 1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: 'none',
            //   width: "100%",
            //   height: "100%",
            //   border: "5px solid white",
            borderRadius: '0',

            padding: '0px',
        },
    };
    return (
        <Modal isOpen={true} style={modalStyle}>
            <S.SideBar>
                <S.SideBarBtnSection>
                    <S.PushableButton
                        onClick={() => {
                            setSideBarType('portfolio');
                            setIsPortfolio(true);
                            effectAudioClick.play();
                        }}
                    >
                        <span className='front'>포트폴리오</span>
                    </S.PushableButton>
                    <S.PushableButton
                        onClick={() => {
                            setSideBarType('economicIndicator');
                            setIsPortfolio(false);
                            effectAudioClick.play();
                        }}
                    >
                        <span className='front'>경제 뉴스</span>
                    </S.PushableButton>
                </S.SideBarBtnSection>

                <S.SideBarMainSection
                    style={{
                        backgroundColor: sideBarType === 'StockCheck' ? 'white' : sideBarType === 'portfolio' ? sideBarColor : defaultColor,
                    }}
                    // style={{
                    //     backgroundColor: sideBarType === 'StockCheck' ? 'white' : sideBarColor,
                    // }}
                >
                    {componentToRender}
                </S.SideBarMainSection>
            </S.SideBar>
        </Modal>
    );
}

export default SideBar;
