import ApexCharts from 'react-apexcharts';

function StockGraph({ data }) {
    return (
        <div style={{ padding: '8px 12px' }}>
            <ApexCharts
                type='candlestick'
                series={[
                    {
                        data: data?.map(price => {
                            return [price.turn, price.open, price.high, price.low, price.close];
                        }),
                    },
                ]}
                options={{
                    theme: {
                        mode: 'dark',
                    },
                    chart: {
                        type: 'candlestick',
                        height: 350,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        background: 'transparent',
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 2,
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        type: 'category',
                        categories: data?.map(price => price.turn),
                        labels: {
                            style: {
                                colors: '#9c88ff',
                            },
                        },
                    },
                    plotOptions: {
                        candlestick: {
                            colors: {
                                upward: 'rgb(82,165,155)',
                                downward: 'rgb(221,94,86)',
                            },
                        },
                    },
                }}
            ></ApexCharts>
        </div>
    );
}

export default StockGraph;
