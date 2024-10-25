import { Button, Steps } from "antd";
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

const OrderDetail = ( {setIsDetail, detail} ) => {
    
    const items = [
        {
          title: <span className='fs-15 fw-600'>Đang chờ</span>,
          status: detail?.createdAt ? 'finish' : 'wait',
          icon: <div className="step-icon"><CheckOutlined className="white fw-600"/></div>
        },
        {
          title: <span className='fs-15 fw-600'>Chấp nhận</span>,
          status: detail?.confirmedAt ? 'finish' : 'wait',
          icon: <div className="step-icon"><CheckOutlined className="white fw-600"/></div>
        },
        {
          title: <span className='fs-15 fw-600'>Đã nhận bàn</span>,
          status: detail?.paidAt ? 'finish' : 'wait',
          icon: <div className="step-icon"><CheckOutlined className="white fw-600"/></div>
        },
        {
          title: <span className='fs-15 fw-600'>Hoàn thành</span>,
          status: detail?.completedAt ? 'finish' : 'wait',
          icon: <div className="step-icon"><CheckOutlined className="white fw-600"/></div>
        },
        {
          title: <span className='fs-15 fw-600'>Hủy</span>,
          status: detail?.cancelledAt ? 'finish' : 'wait',
          icon: <div className="step-icon"><StopOutlined className="white fw-600"/></div>
        },
    ];
    
    return (  
        <div className="form-order-detail">
            <Button
                shape="round"
                className="fs-16 fw-500 return-button"
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
                    <span className="fs-16 primary">{detail?.nameReceiver}</span>
                </div>
                <div>
                    <span className="fs-16 mr-48">SĐT:</span>
                    <span className="fs-16">{detail?.phoneReceiver}</span>
                </div>
                <div>
                    <span className="fs-16 mr-10">Ngày đặt:</span>
                    <span className="fs-16 primary">{dayjs(detail?.dateReservation).format('DD-MM-YYYY')}</span>
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
                            <td className="d-flex justify-content-center"> {dayjs(detail?.dateReservation).format('DD-MM-YYYY')} </td>
                            <td> {dayjs(detail?.timeReservation, "HH:mm:ss").format('HH:mm')} </td>
                            <td> {detail?.numberPerson} </td>
                            <td> {detail?.numberChild} </td>
                            <td> {detail?.contentReservation ? detail?.contentReservation : 'Không có'} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default OrderDetail;