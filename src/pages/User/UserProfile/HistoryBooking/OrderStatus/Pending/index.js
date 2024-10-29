import { Space, Table } from "antd";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import dayjs from "dayjs";
import OrderDetail from "../../OrderDetail";

const Pending = ({orderHistory, loading, orderDetail, isDetail, setIsDetail, handleViewDetail}) => {
    const columns = [
        {
            title: 'Tên Cửa Hàng',
            dataIndex: 'restaurantName',
            key: 'restaurantName',
            width: 250,
            render: (text) => <span className="fs-15">{text}</span>,
        },
        {
            title: 'SDT Cửa Hàng',
            dataIndex: 'restaurantPhone',
            key: 'restaurantPhone',
            width: 150
        },
        {
            title: 'Thời Gian Đặt',
            dataIndex: 'dateReservation',
            key: 'dateReservation',
            width: 120,
            render: (value) => <span> {dayjs(value).format('DD-MM-YYYY')} </span>,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'statusOrder',
            key: 'statusOrder',
            width: 120,
            render: (value) => (
                <Space size="middle d-flex">
                    <div className="status pending">Đang chờ</div>
                </Space>
            ),
        },
        {
            title: 'Chi Tiết',
            dataIndex: 'statusOrder',
            key: 'statusOrder',
            width: 300,
            render: (_, record) => (
                <Space size="middle d-flex">
                    <button onClick={() => handleViewDetail(record)} className="btn detail-btn">Chi Tiết</button>
                    <button className="btn cancel-btn">Hủy</button>
                </Space>
            ),
        },
    ]
    
    return (  
        <div>
            <SpinCustom spinning={loading}>
                    <div className="fs-22 fw-600 mb-20 mt-30">
                        {isDetail === false ? 'Danh sách đặt bàn' : 'Chi tiết đơn đặt bàn'}
                    </div>
                    {
                        !isDetail 
                            ? <Table 
                                columns={columns} 
                                dataSource={orderHistory.filter(o => o.statusOrder === 'Pending')} 
                                pagination={{pageSize: 5}}
                                bordered
                            />
                            : <OrderDetail setIsDetail={setIsDetail} detail={orderDetail}/>
                    }
                </SpinCustom>
        </div>
    );
}
 
export default Pending;