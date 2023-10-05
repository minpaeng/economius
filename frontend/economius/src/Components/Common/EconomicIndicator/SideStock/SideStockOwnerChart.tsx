import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { RoomJoinUsersNicknameState, RoomJoinUsersIdState } from '/src/recoil/animation/atom';

function SideStockOwnerChart({ remainingAmount, owners }) {
    const userIdArr = useRecoilValue(RoomJoinUsersIdState);
    const userNickArr = useRecoilValue(RoomJoinUsersNicknameState);

    const colors = ['#FFD885B2', '#83D5E9B2', '#FF9C9FB2', '#FFA684B2', 'rgb(100,100,100)'];
    return (
        <div style={{ margin: '16px' }}>
            <ReactApexChart
                options={{
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
                    labels: [userNickArr[0], userNickArr[1], userNickArr[2], userNickArr[3], '구매 가능 주식'],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        },
                    ],
                    colors: colors,
                }}
                series={[owners[0][userIdArr[0]], owners[0][userIdArr[1]], owners[0][userIdArr[2]], owners[0][userIdArr[3]], remainingAmount]}
                type='pie'
                width={330}
            />
        </div>
    );
}

export default SideStockOwnerChart;
