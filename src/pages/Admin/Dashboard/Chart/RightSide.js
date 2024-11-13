import React, { useEffect } from 'react';
import { Avatar, Col, Row } from "antd";
import { Chart } from '@antv/g2';
import { formatNumberToK } from '../../../../lib/stringUtils';

const RightSide = ({data}) => {
    useEffect(() => {
        const dataChart = [
          { Status: 'Đang chờ', value: data?.orderStatus?.pending },
          { Status: 'Chấp nhận', value: data?.orderStatus?.confirm },
          { Status: 'Chuyển khoản', value: data?.orderStatus?.paid },
          { Status: 'Hoàn thành', value: data?.orderStatus?.complete },
          { Status: 'Hủy', value: data?.orderStatus?.cancel },
        ];
    
        const chart = new Chart({
          container: 'container',
          autoFit: true,
          height: 300, 
        });
    
        chart.data(dataChart);
    
        chart
          .interval()
          .position('Status*value')  
          .color('Status');   
    
        chart.render();
    
        return () => {
          chart.destroy();
        };
    }, []);

    


    return ( 
        <div className="right">
            <Row gutter={[16, 16]} className="d-flex justify-content-center">
                <Col xs={16} sm={16} md={16} lg={24} xl={24}>
                    <div className="border">
                        <div className="pt-25 pl-20 pr-20">
                            <div className="chart1" style={{height: '570px'}}>
                                <div className="fs-18 fw-600 mb-20"> 
                                    Nhà hàng được ưu chuộng
                                </div>
                                <div>
                                    {
                                        data?.topRestaurantDTOs.slice(0, 4).map((i, index) => (
                                            <div className="item" key={index}>
                                                <div className="d-flex justify-content-space-between align-items-center">
                                                    <div className="d-flex align-items-center flex-column">
                                                        <div>
                                                            <Avatar size={56} src={<img src={i.image} alt="restaurant" />} />
                                                        </div>
                                                        <div style={{color: 'gray'}} className="fs-13 mt-10"> 
                                                            Thu nhập: {formatNumberToK(i.totalInCome)} 
                                                        </div>
                                                    </div>
                                                    <div className='pr-30'>
                                                        <div className="fw-600 fs-15 mb-5"> {i.name} </div>
                                                        <div style={{color: 'gray'}}> Số đơn: {i.totalOrder} </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={16} sm={16} md={16} lg={24} xl={24}>
                    <div className="border">
                        <div className="pt-25 pl-20 pr-20">
                            {/* <div className="mb-20">
                                <div className="fw-600 fs-17">Trạng thái đơn hàng</div>
                            </div> */}
                            <div className="chart">
                                <div className='fs-20 fw-500 mb-20 pl-10'>
                                    <span>Tổng đơn hàng: </span>
                                    <span className='primary'>{data?.orderStatus?.totalOrder}</span>
                                </div>
                                <div id="container" style={{ width: '100%', height: '330px' }}></div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
 
export default RightSide;