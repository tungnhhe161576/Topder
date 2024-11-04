import { Space, Table } from "antd";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import OrderDetail from "../../OrderDetail";
import dayjs from "dayjs";
import ModalCancelOrder from "../../Modal/CancelOrder";
import { useState } from "react";
import { formatNumberToK } from "../../../../../../lib/stringUtils";

const Paid = ({getHistoryOrder, orderHistory, loading, orderDetail, isDetail, setIsDetail, handleViewDetail}) => {
    const [openModalCancelOrder, setOpenModalCancelOrder] = useState(false)
    
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
            width: 200,
            render: (value) => <span> {dayjs(value).format('DD-MM-YYYY')} </span>,
        },
        {
            title: 'Giá trị đơn hàng',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: 150,
            render: (value) => <span> {formatNumberToK(value)} </span>,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'statusOrder',
            key: 'statusOrder',
            width: 120,
            render: (value) => (
                <Space size="middle d-flex">
                    <div className="status paid">Đã chuyển khoản</div>
                </Space>
            ),
        },
        {
            title: 'Chi Tiết',
            dataIndex: 'statusOrder',
            key: 'statusOrder',
            width: 200,
            render: (_, record) => (
                <Space size="middle d-flex">
                    <button onClick={() => handleViewDetail(record)} className="btn detail-btn">Chi Tiết</button>
                    <button className="btn cancel-btn" onClick={() => setOpenModalCancelOrder(record)}>Hủy</button>
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
                                dataSource={orderHistory.filter(o => o.statusOrder === 'Paid')} 
                                pagination={{pageSize: 5}}
                                bordered
                            />
                            : <OrderDetail setIsDetail={setIsDetail} detail={orderDetail}/>
                    }
                </SpinCustom>
                {!!openModalCancelOrder && (
                    <ModalCancelOrder
                        open={openModalCancelOrder}
                        onCancel={() => setOpenModalCancelOrder(false)}
                        onOk={getHistoryOrder}
				/>
			)}
        </div>
    );
}
 
export default Paid;