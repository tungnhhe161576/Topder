import { Button, Steps } from "antd";
import { CheckOutlined, StopOutlined } from '@ant-design/icons';

const OrderDetail = ( {setIsDetail} ) => {
    
    const items = [
        {
          title: <span className='fs-15 fw-600'>Đang chờ</span>,
          status: 'finish',
          icon: <div className="step-icon"><CheckOutlined className="white fw-600"/></div>
        },
        {
          title: <span className='fs-15 fw-600'>Chấp nhận</span>,
          status: 'finish',
          icon: <div className="step-icon"><CheckOutlined className="white fw-600"/></div>
        },
        {
          title: <span className='fs-15 fw-600'>Đã nhận bàn</span>,
          status: 'finish',
          icon: <div className="step-icon"><CheckOutlined className="white fw-600"/></div>
        },
        {
          title: <span className='fs-15 fw-600'>Hoàn thành</span>,
          status: 'process',
          icon: <div className="step-icon"><CheckOutlined className="white fw-600"/></div>
        },
        {
          title: <span className='fs-15 fw-600'>Hủy</span>,
          status: 'wait',
          icon: <div className="step-icon"><StopOutlined className="white fw-600"/></div>
        },
    ];
    
    return (  
        <div className="form-order-detail">
            <Button
                shape="round"
                className="bg-primary white fs-16 return-button"
                onClick={() => setIsDetail(false)}
            >
                Trở về
            </Button>

            <div className="step mt-50 mb-50">
                <Steps 
                    labelPlacement="vertical" 
                    items={items} 
                />
            </div>

            <div className="fs-20 fw-600 mb-5 ml-20">
                Thông tin người nhận
            </div>
            <div className="info">
                <div>
                    <span className="fs-16 mr-50">Tên:</span>
                    <span className="fs-16 primary">Đỗ Văn Đạt</span>
                </div>
                <div>
                    <span className="fs-16 mr-48">SĐT:</span>
                    <span className="fs-16">0772260719</span>
                </div>
                <div>
                    <span className="fs-16 mr-10">Ngày đặt:</span>
                    <span className="fs-16 primary">12/06/2024</span>
                </div>
            </div>

            <div className="pl-20 pr-20">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Ngày/Tháng/Năm nhận bàn</th>
                            <th>Thời gian nhận bàn</th>
                            <th>Số người lớn</th>
                            <th>số trẻ nhỏ</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="d-flex justify-content-center"> 13/06/2024 </td>
                            <td> 08:00 </td>
                            <td> 1 </td>
                            <td> 0 </td>
                            <td> tổ chức sinh nhật </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default OrderDetail;