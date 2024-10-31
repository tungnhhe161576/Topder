import { Avatar, Col, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { Chart } from '@antv/g2';
import dayjs from "dayjs";
import avatar from '../../../../assets/images/Dat.jpg'
import restaurant from '../../../../assets/images/blog-item.jpg'

const data = [
    { Date: '1-1-2024', Value: 2 },
    { Date: '2-1-2024', Value: 1 },
    { Date: '3-2-2024', Value: 0 },
    { Date: '4-3-2024', Value: 1 },
    { Date: '5-3-2024', Value: 1 },
    { Date: '6-4-2024', Value: 0 },
    { Date: '7-5-2024', Value: 5 },
    { Date: '8-6-2024', Value: 0 },
    { Date: '9-7-2024', Value: 11 },
    { Date: '10-8-2024', Value: 19 },
    { Date: '11-9-2024', Value: 0 },
    { Date: '12-10-2024', Value: 0 },
    { Date: '1-11-2024', Value: 3 },
    { Date: '4-12-2024', Value: 3 },

    { Date: '1-1-2023', Value: 5 },
    { Date: '2-1-2023', Value: 1 },
    { Date: '3-2-2023', Value: 22 },
    { Date: '4-3-2023', Value: 10 },
    { Date: '5-3-2023', Value: 0 },
    { Date: '6-4-2023', Value: 1 },
    { Date: '7-5-2023', Value: 5 },
    { Date: '8-6-2023', Value: 0 },
    { Date: '9-7-2023', Value: 3 },
    { Date: '10-8-2023', Value: 9 },
    { Date: '11-9-2023', Value: 0 },
    { Date: '12-10-2023', Value: 20 },
    { Date: '12-11-2023', Value: 30 },
    { Date: '11-12-2023', Value: 3 },
]


const categories = [
    { name: 'A', category: 'Quán ăn' },
    { name: 'B', category: 'Quán trà sữa | Cà phê' },
    { name: 'C', category: 'Quán ăn' },
    { name: 'D', category: 'Quán trà sữa | Cà phê' },
    { name: 'E', category: 'Quán ăn' },
    { name: 'F', category: 'Quán trà sữa | Cà phê' },
    { name: 'G', category: 'Quán ăn' },
    { name: 'H', category: 'Quán trà sữa | Cà phê' },
    { name: 'I', category: 'Quán trà sữa | Cà phê' },
    { name: 'J', category: 'Nhà hàng' },
    { name: 'K', category: 'Quán ăn' },
    { name: 'X', category: 'Nhà hàng' },
    { name: 'Z', category: 'Quán ăn' },
    { name: 'U', category: 'Nhà hàng' },
]

const LeftSide = () => {
    const [yearSelect, setYearSelect] = useState(2024)
    const [years, setYears] = useState([]);
    const [totalMarket, setTotalMarket] = useState()
    

    // chart1
    useEffect(() => {
        const filteredData = data
        .filter(item => item.Date.split('-')[2] === String(yearSelect))
        .reduce((acc, item) => {
            const month = item.Date.split('-')[1]; 
            if (!acc[month]) {
                acc[month] = 0;
            }
            acc[month] += item.Value;
            return acc;
        }, {});

        const calculateYearTotal = (year) => {
            return data
                .filter(item => item.Date.split('-')[2] === String(year))
                .reduce((total, item) => total + item.Value, 0);
        };
        setTotalMarket(calculateYearTotal(yearSelect));

        const chartData = Object.keys(filteredData).map(month => ({
            Month: dayjs(`${month}-1-${yearSelect}`).format('MMMM'), 
            Value: filteredData[month],
        }));

        const chart = new Chart({
            container: 'left-chart-1',
            autoFit: true,
            height: 300,
        });
        chart.data(chartData);
        chart
            .interval()
            .position('Month*Value')
            .color('Month');

        chart.render();
        return () => {
            chart.destroy();
        };
    }, [yearSelect]);

    useEffect(() => {
        const years = Array.from(new Set(data.map(item => item.Date.split('-')[2])));
        setYears(years);
    }, []);

    const handleOnchange = (value) => {
        setYearSelect(value)
    }


    // chart2
    const groupByCategoryRestaurant = (data) => {
        const categoryRestaurant = {
            'Quán ăn': 0,
            'Nhà hàng': 0,
            'Quán trà sữa | Cà phê': 0,
        };
    
        data.forEach(cate => {
            if (cate.category === 'Nhà hàng') {
                categoryRestaurant['Nhà hàng'] += 1;
            } else if (cate.category === 'Quán ăn') {
                categoryRestaurant['Quán ăn'] += 1;
            } else if (cate.category === 'Quán trà sữa | Cà phê') {
                categoryRestaurant['Quán trà sữa | Cà phê'] += 1;
            }
        });
    
        return Object.keys(categoryRestaurant).map(key => ({
            type: key,
            value: categoryRestaurant[key],
        }));
    };

    useEffect(() => {
        const data = groupByCategoryRestaurant(categories);
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
            .position('value')
            .color('type', ['#003f82', '#ffded7', '#71c3fe', '#a3e1d7', '#7d3888']) 
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
    }, []);
    


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
                                    options={years.map(year => ({ value: year, label: year }))}
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-space-between align-items-center mt-40">
                            <div className="fs-32 fw-600" style={{color: '#0dc8ed'}}> {totalMarket} </div>
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
                            <div className="item">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="mr-20">
                                        <Avatar size={56} src={<img src={restaurant} alt="restaurant" />} />
                                    </div>
                                    <div>
                                        <div className="fw-600 fs-15 mb-5"> Mer.coffee & Tea </div>
                                        <div style={{color: 'gray'}}> 30 </div>
                                    </div>
                                </div>
                                <div style={{color: 'gray'}} className="fs-13"> id: 1000 </div>
                            </div>
                            <div className="item">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="mr-20">
                                        <Avatar size={56} src={<img src={restaurant} alt="restaurant" />} />
                                    </div>
                                    <div>
                                        <div className="fw-600 fs-15 mb-5"> Street Coffee </div>
                                        <div style={{color: 'gray'}}> 10 </div>
                                    </div>
                                </div>
                                <div style={{color: 'gray'}} className="fs-13"> id: 1000 </div>
                            </div>
                            <div className="item">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="mr-20">
                                        <Avatar size={56} src={<img src={restaurant} alt="restaurant" />} />
                                    </div>
                                    <div>
                                        <div className="fw-600 fs-15 mb-5"> VNC-LIC Cafeteria </div>
                                        <div style={{color: 'gray'}}> 10 </div>
                                    </div>
                                </div>
                                <div style={{color: 'gray'}} className="fs-13"> id: 1000 </div>
                            </div>
                            <div className="item">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="mr-20">
                                        <Avatar size={56} src={<img src={restaurant} alt="restaurant" />} />
                                    </div>
                                    <div>
                                        <div className="fw-600 fs-15 mb-5"> Yukssam BBQ </div>
                                        <div style={{color: 'gray'}}> 10 </div>
                                    </div>
                                </div>
                                <div style={{color: 'gray'}} className="fs-13"> id: 1000 </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
 
export default LeftSide;