import React, { useEffect } from 'react';
import { Col, Row } from "antd";
import { Chart } from '@antv/g2';

const RightSide = () => {
    useEffect(() => {
        const data = [
          { Status: 'Wait', value: 11 },
          { Status: 'Accept', value: 23 },
          { Status: 'Process', value: 12 },
          { Status: 'Done', value: 19 },
          { Status: 'Cancel', value: 5 },
        ];
    
        const chart = new Chart({
          container: 'container',
          autoFit: true,
          height: 300, 
        });
    
        chart.data(data);
    
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
                            <div className="d-flex justify-content-space-between mb-20">
                                <div className="fw-600 fs-17">Trạng thái đặt bàn</div>
                                <div className="added"> + </div>
                            </div>
                            <div className="status d-flex flex-column">
                                <div className="wait">
                                    <div className="mb-5"> Đang đợi: {0} </div>
                                    <div className="d-flex">
                                        <div className="fs-13 w-30 click-to-view">Click to view</div>
                                        <div style={{color: '#b2afaf'}}>Đợi</div>
                                    </div>
                                </div>
                                <div className="accept">
                                    <div className="mb-5"> Chấp nhận: {4} </div>
                                    <div className="d-flex">
                                        <div className="fs-13 w-30 click-to-view">Click to view</div>
                                        <div style={{color: '#73c2ff'}}>Chấp nhận</div>
                                    </div>
                                </div>
                                <div className="process">
                                    <div className="mb-5"> Đang duyệt: {0} </div>
                                    <div className="d-flex align-items-center">
                                        <div className="fs-13 w-30 click-to-view">Click to view</div>
                                        <div style={{color: '#e8b240', padding: '5px 6px', borderRadius: '10px', backgroundColor: '#fff2d6'}}>Xử lý</div>
                                    </div>
                                </div>
                                <div className="done">
                                    <div className="mb-5"> Hoàn thành: {26} </div>
                                    <div className="d-flex align-items-center">
                                        <div className="fs-13 w-30 click-to-view">Click to view</div>
                                        <div style={{color: '#6ac0dd', padding: '5px 6px', borderRadius: '10px', backgroundColor: '#cbf0ee'}}>Thành công</div>
                                    </div>
                                </div>
                                <div className="cancel">
                                    <div className="mb-5"> Hủy bàn: {0} </div>
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
                                <div className="fw-600 fs-17">Trạng thái đơn hàng</div>
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