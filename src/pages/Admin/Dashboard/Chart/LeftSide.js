import { Avatar, Col, Row, Select, Statistic } from "antd";
import { useEffect, useState } from "react";
import { Chart } from '@antv/g2';
import { formatNumberToK } from "../../../../lib/stringUtils";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
const {Option} = Select


const LeftSide = ({data}) => {
    const [yearSelect, setYearSelect] = useState(2024)

    // chart1
    useEffect(() => {
        if(data) {
            const chartData = data?.marketOverview?.monthlyData.flatMap(item => [
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
    }, [data]);

    const handleOnchange = (value) => {
        setYearSelect(value)
    }


    // chart2
    useEffect(() => {
        const dataChart = data?.chartCategoryRestaurants.map(i => ({
            type: i.categoryName,   
            value: i.restaurantCount 
        }));
        const chart = new Chart({
            container: 'chart2',
            autoFit: true,
            height: 300,
        });
    
        chart.data(dataChart);
    
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
            .position('value')
            .color('type') 
            .style({ stroke: '#fff', lineWidth: 1 });
    
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
    }, [data]);
    


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
                                        data?.yearsContainOrders.map(y => (
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
                                    <span className="fs-32 fw-600" style={{color: '#0dc8ed'}}> {data?.marketOverview?.orderForYear}</span>
                                    <span className="ml-10">
                                        <Statistic
                                            value={data?.marketOverview?.orderGrowthRateForYear}
                                            precision={2}
                                            valueStyle={data?.marketOverview?.orderGrowthRateForYear >= 0 ?{
                                                color: '#3f8600',
                                                fontSize: '14px'
                                            } : {
                                                color: '#cf1322',
                                                fontSize: '14px'
                                            }}
                                            prefix={data?.marketOverview?.orderGrowthRateForYear >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                            suffix="%"
                                        />
                                    </span>
                                </div>
                                <div className="mt-10">
                                    <span className="fs-20 fw-500">Tổng thu nhập thực tế:</span> 
                                    <span className="fs-32 fw-600" style={{color: '#0dc8ed'}}> {formatNumberToK(data?.marketOverview?.totalInComeForYear)} </span>
                                    <span>
                                        <Statistic
                                            value={data?.marketOverview?.totalInComeGrowthRateForYear}
                                            precision={2}
                                            valueStyle={data?.marketOverview?.totalInComeGrowthRateForYear >= 0 ?{
                                                color: '#3f8600',
                                                fontSize: '14px'
                                            } : {
                                                color: '#cf1322',
                                                fontSize: '14px'
                                            }}
                                            prefix={data?.marketOverview?.totalInComeGrowthRateForYear >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
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
                    <div className="chart1" style={{height: '370px'}}>
                        <div className="fs-18 fw-600"> 
                            Các loại nhà hàng
                        </div>
                        <div>
                            <div id="chart2" style={{ width: '100%', height: '300px' }}></div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="chart1" style={{height: '370px'}}>
                        <div className="fs-18 fw-600 mb-20"> 
                            Nhà hàng được ưu chuộng
                        </div>
                        <div className="kh-trung-thanh">
                            {
                                data?.topRestaurantDTOs.slice(0, 4).map(i => (
                                    <div className="item">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="mr-20">
                                                <Avatar size={56} src={<img src={i.image} alt="restaurant" />} />
                                            </div>
                                            <div>
                                                <div className="fw-600 fs-15 mb-5"> {i.name} </div>
                                                <div style={{color: 'gray'}}> Số đơn: {i.totalOrder} </div>
                                            </div>
                                        </div>
                                        <div style={{color: 'gray'}} className="fs-13"> Thu nhập: {formatNumberToK(i.totalInCome)} </div>
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