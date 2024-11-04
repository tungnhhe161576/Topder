import React, { useEffect } from 'react';
import { Col, Row } from "antd";
import { Chart } from '@antv/g2';

const RightSide = ({restaurantData}) => {
    useEffect(() => {
        const data = [
            { Star: '1 sao', value: restaurantData?.feedbackStars?.star1 },
            { Star: '2 sao', value: restaurantData?.feedbackStars?.star2 },
            { Star: '3 sao', value: restaurantData?.feedbackStars?.star3 },
            { Star: '4 sao', value: restaurantData?.feedbackStars?.star4 },
            { Star: '5 sao', value: restaurantData?.feedbackStars?.star5 },
        ];
    
        const chart = new Chart({
            container: 'container',
            autoFit: true,
            height: 300, 
        });
        chart.data(data);
        chart
            .interval()
            .position('Star*value')  
            .color('Star');   
        chart.render();
        return () => {
            chart.destroy();
        };
    }, [restaurantData]);

    return ( 
        <div className="right">
            <Row gutter={[16, 16]} className="d-flex justify-content-center">
                <Col xs={16} sm={16} md={16} lg={24} xl={24}>
                    <div className="border">
                        <div className="pt-25 pl-20 pr-20">
                            <div className="d-flex justify-content-space-between mb-20">
                                <div className="fw-600 fs-17">Trạng thái đặt bàn</div>
                            </div>
                            <div className="status d-flex flex-column">
                                <div className="wait">
                                    <div className="mb-5"> Đang đợi: {restaurantData?.orderStatus?.pending} </div>
                                    <div className="d-flex">
                                        <div className="fs-13 w-30 click-to-view">Click to view</div>
                                        <div style={{color: '#b2afaf'}}>Đợi</div>
                                    </div>
                                </div>
                                <div className="accept">
                                    <div className="mb-5"> Chấp nhận: {restaurantData?.orderStatus?.confirm} </div>
                                    <div className="d-flex">
                                        <div className="fs-13 w-30 click-to-view">Click to view</div>
                                        <div style={{color: '#73c2ff'}}>Chấp nhận</div>
                                    </div>
                                </div>
                                <div className="process">
                                    <div className="mb-5"> Đã thanh toán: {restaurantData?.orderStatus?.paid} </div>
                                    <div className="d-flex align-items-center">
                                        <div className="fs-13 w-30 click-to-view">Click to view</div>
                                        <div style={{color: '#e8b240', padding: '5px 6px', borderRadius: '10px', backgroundColor: '#fff2d6'}}>Xử lý</div>
                                    </div>
                                </div>
                                <div className="done">
                                    <div className="mb-5"> Hoàn thành: {restaurantData?.orderStatus?.complete} </div>
                                    <div className="d-flex align-items-center">
                                        <div className="fs-13 w-30 click-to-view">Click to view</div>
                                        <div style={{color: '#6ac0dd', padding: '5px 6px', borderRadius: '10px', backgroundColor: '#cbf0ee'}}>Thành công</div>
                                    </div>
                                </div>
                                <div className="cancel">
                                    <div className="mb-5"> Hủy bàn: {restaurantData?.orderStatus?.cancel} </div>
                                    <div className="d-flex">
                                        <div className="fs-13 w-30 click-to-view">Click to view</div>
                                        <div className="red">Hủy</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={16} sm={16} md={16} lg={24} xl={24}>
                    <div className="border">
                        <div className="pt-25 pl-20 pr-20">
                            <div className="mb-20">
                                <div className="fw-600 fs-17">Thống kê lượt sao đánh giá</div>
                            </div>
                            <div className="chart">
                                <div id="container" style={{ width: '100%', height: '250px' }}></div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
 
export default RightSide;