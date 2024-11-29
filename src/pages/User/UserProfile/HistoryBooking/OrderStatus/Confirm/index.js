import { Space, Table } from "antd";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import OrderDetail from "../../OrderDetail";
import dayjs from "dayjs";
import ModalChooseOptionPayment from "../../Modal/OptionPayment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../../../redux/Slice/userSlice";
import { formatNumberToK } from "../../../../../../lib/stringUtils";
import ModalCancelOrder from "../../Modal/CancelOrder";

const Confirm = ({getHistoryOrder, orderHistory, loading, orderDetail, isDetail, setIsDetail, handleViewDetail}) => {
    const [openModalOptionPayment, setOpenModalOpenPayment] = useState(false)
    const [openModalCancelOrder, setOpenModalCancelOrder] = useState(false)
    const user = useSelector(userInfor)
    
    const columns = [
        {
            title: 'Tên Cửa Hàng',
            dataIndex: 'restaurantName',
            key: 'restaurantName',
            width: 220,
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
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 200,
            render: (value) => <span> {dayjs(value).format('DD-MM-YYYY HH:mm')} </span>,
        },
        {
            title: 'Giá trị cọc bàn',
            dataIndex: 'depositAmount',
            key: 'depositAmount',
            width: 150,
            render: (value) => <span> {formatNumberToK(value)} </span>,
        },
        {
            title: 'Giá trị món ăn',
            dataIndex: 'foodAmount',
            key: 'foodAmount',
            width: 150,
            render: (value) => <span> {formatNumberToK(value)} </span>,
        },
        {
            title: 'Giá trị món ăn thêm',
            dataIndex: 'foodAddAmount',
            key: 'foodAddAmount',
            width: 150,
            render: (value) => <span> {!!value ? formatNumberToK(value) : '0đ'} </span>,
        },
        {
            title: 'Tổng giá trị đơn hàng',
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
                    <div className="status confirm">Đã chấp nhận</div>
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
                    <button className="btn payment" onClick={() => setOpenModalOpenPayment(record)}>Thanh toán</button>
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
                            dataSource={orderHistory.filter(o => o.statusOrder === 'Confirm')} 
                            pagination={{pageSize: 5}}
                            bordered
                        />
                        : <OrderDetail setIsDetail={setIsDetail} detail={orderDetail} getHistoryOrder={getHistoryOrder} handleViewDetail={handleViewDetail}/>
                }
            </SpinCustom>


            {!!openModalOptionPayment && (
                <ModalChooseOptionPayment 
                    open={openModalOptionPayment}
                    onCancel={() => setOpenModalOpenPayment(false)}
                    user={user}
                    orderHistory={getHistoryOrder}
                />
			)}

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
 
export default Confirm;