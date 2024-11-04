import { Avatar, Col, Row, Select, Statistic } from "antd";
import { useEffect, useState } from "react";
import { Chart } from '@antv/g2';
import { formatNumberToK } from "../../../../../lib/stringUtils";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
const { Option } = Select;

const LeftSide = ({restaurantData}) => {
    const [yearSelect, setYearSelect] = useState(2024)
    
    // chart1
    useEffect(() => {
        if(restaurantData) {
            const chartData = restaurantData?.marketOverview?.monthlyData.flatMap(item => [
                {
                    month: `${item.month}`, 
                    type: 'Total Orders',
                    value: item.totalOrders,
                },
                {
                    month: `${item.month}`, 
                    type: 'Total Incomes',
                    value: item.totalInComes,
                },
            ]);
            console.log("chart data", chartData);

            const chart = new Chart({
                container: 'left-chart-1',
                autoFit: true,
                height: 300,
            });
            chart.data(chartData);
            chart.interval()
                .position('month*value')
                .color('type')
                .adjust([
                    {
                        type: 'dodge', 
                        marginRatio: 0.05,
                    },
                ]);

            chart.render();
            return () => {
                chart.destroy();
            };
        }
    }, [restaurantData]);

    const handleOnchange = (value) => {
        setYearSelect(value)
    }

    //chart 2
    useEffect(() => {
        const data = [
            { name: 'Dưới 18', age: restaurantData?.customerAgeGroup?.under18 },
            { name: 'Từ 18 đến 24', age: restaurantData?.customerAgeGroup?.between18And24 },
            { name: 'Từ 25 đến 34', age: restaurantData?.customerAgeGroup?.between25And34 },
            { name: 'Từ 35 đến 44', age: restaurantData?.customerAgeGroup?.between35And44 },
            { name: 'Từ 45 đến 54', age: restaurantData?.customerAgeGroup?.between45And54 },
            { name: 'Trên 55', age: restaurantData?.customerAgeGroup?.above55 },
        ];
        const chart = new Chart({
            container: 'chart2',
            autoFit: true,
            height: 300,
        });
        chart.data(data);
        chart.coordinate('theta', {
            radius: 0.75, 
            innerRadius: 0.6, 
        });
        chart.tooltip({
            showMarkers: false,
        });
        chart
            .interval()
            .adjust('stack')
            .position('age')
            .color('name', ['#003f82', '#ffded7', '#71c3fe', '#a3e1d7', '#7d3888'])
            .style({ stroke: '#fff', lineWidth: 1 })
    
        chart.legend({
            position: 'top',
            itemName: {
                style: {
                fontSize: 12, 
                fill: '#8c8c8c',
                },
            },
            maxItemWidth: 120, 
            layout: 'horizontal',
            itemSpacing: 20, 
            flipPage: false,
        });
        chart.render();
        return () => {
            chart.destroy();
        };
    }, [restaurantData]);
    
    return (  
        <div className="left">
            <Row gutter={[16, 16]} className="d-flex justify-content-center">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className="chart1">
                        <div className="d-flex justify-content-space-between align-items-center"> 
                            <div>
                                <div className="fs-22 fw-600"> Market Overview </div>   
                                <div className="fs-18" style={{color: '#a7b2ba'}}> Tổng hợp số đơn hàng trong năm </div>   
                            </div>
                            <div className="select">
                                <Select
                                    defaultValue="2024"
                                    style={{ width: 120 }}
                                    onChange={handleOnchange}
                                >
                                    {
                                        restaurantData?.yearsContainOrders.map(y => (
                                            <Option key={y} value={y}>
                                                {y}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className="d-flex justify-content-space-between align-items-center mt-40">
                            <div>
                                <div>
                                    <span className="fs-20 fw-500">Tổng đơn hàng:</span> 
                                    <span className="fs-32 fw-600" style={{color: '#0dc8ed'}}> {restaurantData?.marketOverview?.orderForYear}</span>
                                    <span className="ml-10">
                                        <Statistic
                                            value={restaurantData?.marketOverview?.orderGrowthRateForYear}
                                            precision={2}
                                            valueStyle={restaurantData?.marketOverview?.orderGrowthRateForYear >= 0 ?{
                                                color: '#3f8600',
                                                fontSize: '14px'
                                            } : {
                                                color: '#cf1322',
                                                fontSize: '14px'
                                            }}
                                            prefix={restaurantData?.marketOverview?.orderGrowthRateForYear >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                            suffix="%"
                                        />
                                    </span>
                                </div>
                                <div className="mt-10">
                                    <span className="fs-20 fw-500">Tổng thu nhập thực tế:</span> 
                                    <span className="fs-32 fw-600" style={{color: '#0dc8ed'}}> {formatNumberToK(restaurantData?.marketOverview?.totalInComeForYear)} </span>
                                    <span>
                                        <Statistic
                                            value={restaurantData?.marketOverview?.totalInComeGrowthRateForYear}
                                            precision={2}
                                            valueStyle={restaurantData?.marketOverview?.totalInComeGrowthRateForYear >= 0 ?{
                                                color: '#3f8600',
                                                fontSize: '14px'
                                            } : {
                                                color: '#cf1322',
                                                fontSize: '14px'
                                            }}
                                            prefix={restaurantData?.marketOverview?.totalInComeGrowthRateForYear >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                            suffix="%"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="mr-10" style={{background: '#1e39ae', height: '15px', width: '15px', borderRadius: '50%'}}></div>
                                <span style={{color: 'gray'}}> {yearSelect} </span>
                            </div>
                        </div>

                        <div className="mt-30">
                            <div id="left-chart-1" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="chart1" style={{height: '300px'}}>
                        <div className="fs-18 fw-600"> 
                            Phân tích độ tuổi 
                        </div>
                        <div>
                            <div id="chart2" style={{ width: '100%', height: '300px' }}></div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="chart1" style={{height: '300px'}}>
                        <div className="fs-18 fw-600 mb-20"> 
                            Khách hàng trung thành
                        </div>
                        <div className="kh-trung-thanh">
                            {
                                restaurantData?.loyalCustomers.slice(0, 4).map(c => (
                                    <div className="item" key={c?.uid}>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="mr-20">
                                                <Avatar size={56} src={<img src={c?.image} alt="avatar" />} />
                                            </div>
                                            <div>
                                                <div className="fw-600 fs-15 mb-5"> {c?.name} </div>
                                                <div style={{color: 'gray'}}> Số đơn đã đặt: {c?.totalOrder} </div>
                                            </div>
                                        </div>
                                        <div style={{color: 'gray'}} className="fs-13"> Tổng tiền: {formatNumberToK(c?.totalInCome)} </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
 
export default LeftSide;