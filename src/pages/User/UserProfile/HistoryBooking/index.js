import { message, Pagination } from "antd";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import { HistoryContainer } from "./styled";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetail from "./OrderDetail";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import UserService from "../../../../services/UserService";
import SpinCustom from "../../../../components/Common/SpinCustom";
import dayjs from "dayjs";

const HistoryBooking = () => {
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)
    const [orderHistory, setOrderHistory] = useState([])
    const [orderDetail, setOrderDetail] = useState()
    const [isDetail, setIsDetail] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const user = useSelector(userInfor) 

    const getHistoryOrder = async () => {
        try {
            setLoading(true)
            const res = await UserService.getOrderHistory(user?.uid)
            setOrderHistory(res?.items)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getHistoryOrder()
    }, [])

    const itemPerPage = 5;
    const startIndex = (currentPage - 1) * itemPerPage;
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const handleViewDetail = async (order) => {
        try {
            const res = await UserService.getOrderDetail(user?.uid, order?.orderId)
            setOrderDetail(res)
            setIsDetail(true)
        } catch (error) {
            message.open({
                content: 'Lấy thông tin thất bại',
                type: 'error',
                style: {
                    marginTop: '10vh',
                },
            })
        }
    }

    const handleCancelBooking = async () => {
        try {
            setLoading(true)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    


    return (  
        <ProfileUserLayout>
            <HistoryContainer>
                <SpinCustom spinning={loading}>
                    <div className="title fs-22 fw-600 mb-20">
                        {isDetail === false ? 'Danh sách đặt bàn' : 'Chi tiết đơn đặt bàn'}
                    </div>

                    {
                        isDetail === false 
                            ? <div className="table">
                                <table className="order-table">
                                    <thead>
                                        <tr>
                                            <th>Tên Cửa Hàng</th>
                                            <th className="d-flex justify-content-center">SDT Cửa Hàng</th>
                                            <th>Thời Gian Đặt</th>
                                            <th>Trạng Thái</th>
                                            <th className="d-flex justify-content-center">Chi Tiết</th>
                                        </tr>
                                    </thead>
                                    {
                                        orderHistory.slice(startIndex, startIndex + itemPerPage).map((o, index) => 
                                            <tbody key={index}>
                                                <tr>
                                                    <td className="fs-16 fw-600">{o?.restaurantName}</td>
                                                    <td className="d-flex justify-content-center"><span className="phone-number">{o?.restaurantPhone}</span></td>
                                                    <td className="fs-16">{dayjs(o?.dateReservation).format('DD-MM-YYYY')}</td>
                                                    <td>
                                                        {
                                                            o?.createdAt && <span className="status pending">Đang Chờ</span>
                                                        }
                                                        {
                                                            o?.confirmedAt && <span className="status accepted">Đã chấp nhận</span>
                                                        }
                                                        {
                                                            o?.paidAt && <span className="status accepted">Đã nhận bàn</span>
                                                        }
                                                        {
                                                            o?.completedAt && <span className="status completed">Hoàn thành</span>
                                                        }
                                                        {
                                                            o?.cancelledAt && <span className="status pending">Đã hủy</span>
                                                        }
                                                        
                                                    </td>
                                                    <td className="d-flex justify-content-center">
                                                        <button onClick={() => handleViewDetail(o)} className="btn detail-btn">Chi Tiết</button>
                                                        {
                                                            index % 3 === 1 && <button onClick={handleCancelBooking} className="btn cancel-btn">Hủy</button>
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    }
                                </table>
                            </div>
                            : <OrderDetail setIsDetail={setIsDetail} detail={orderDetail}/>
                    }

                    {
                        !isDetail && <div className="pagination">
                            <Pagination
                                className="custom-pagination pb-20"
                                itemRender={(page, type, originalElement) => {
                                    if (type === "prev") {
                                        return <LeftOutlined />;
                                    }
                                    if (type === "next") {
                                        return <RightOutlined />;
                                    }
                                    return originalElement;
                                }}
                                defaultCurrent={1}
                                current={currentPage}
                                pageSize={itemPerPage}
                                total={orderHistory?.length}
                                onChange={onPageChange}
                            />
                        </div>
                    }
                </SpinCustom>
            </HistoryContainer>
        </ProfileUserLayout>
    );
}
 
export default HistoryBooking;