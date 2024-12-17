import { useLocation, useNavigate, useParams } from "react-router-dom";
import { OrderDetailContainer } from "./styled";
import logo from '../../../assets/images/logo.png'
import { Image } from "antd";
import UserService from "../../../services/UserService";
import GuestService from "../../../services/GuestService";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { formatNumberToK } from "../../../lib/stringUtils";

const OrderDetail = () => {
    const {id} = useParams()
    const location = useLocation()
    const nav = useNavigate()
    const [detail, setDetail] = useState()

    const orderDetail = async () => {
		try {
			const res = await GuestService.getOrderDetail(id);
			setDetail(res);
		} catch (error) {
            console.log(error);
		}
	};
    
    useEffect(() => {
        if (!!id) {
            orderDetail();
        }
    }, [id]);

    console.log('detail', detail);

    return (  
        <OrderDetailContainer>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <img src={logo} alt="logo" width='20%' style={{cursor: 'pointer'}} onClick={() => nav(location.pathname)}/>
                </div>
                <h3 className="title">Thông tin đơn hàng </h3>
                <div className="booking-info">
                <h4>Thông tin đặt bàn của bạn như sau:</h4>
                <div className="info-item"><strong>Tên khách hàng:</strong> <span><strong>{detail?.nameReceiver}</strong></span></div>
                {/* <div className="info-item"><strong>Nhà hàng:</strong> <span><strong>{detail?.}</strong></span></div> */}
                <div className="info-item"><strong>Số lượng khách:</strong> <span><strong>{detail?.numberPerson + detail?.numberChild}</strong></span></div>
                <div className="info-item"><strong>Ngày đặt bàn:</strong> <span>{dayjs(detail?.createdAt).format('DD-MM-YYYY')}</span></div>
                <div className="info-item"><strong>Thời gian nhận bàn:</strong> <span>Ngày: {dayjs(detail?.dateReservation).format('DD-MM-YYYY')}</span> <span className="ml-8">{detail?.timeReservation}</span></div>
                <div className="info-item"><strong>Tổng tiền đã thanh toán:</strong> <span> {formatNumberToK(detail?.totalPaymentAmount)}</span></div>
                </div>
                <div className="room-info">
                <h4>Danh sách phòng và bàn đã đặt:</h4>
                {
                    detail?.orderTables?.map(i => (
                        <div key={i?.tableId}>
                            <ul>
                                {i?.roomName 
                                    ? <li>Phòng: {i?.roomName}</li>
                                    : <></>
                                }
                                
                                <ul>
                                    <li>{i?.tableName}</li>
                                </ul>
                            </ul>
                        </div>
                    ))
                }
                <h4>Danh sách món ăn:</h4>
                {
                    detail?.orderMenus.map(i => (
                        <div key={i?.orderMenuId}>
                            <span>
                                <strong>Tên món: </strong> <span>{i?.menuName}</span>    
                                <strong className="ml-10">Số lượng: </strong> <span>{i?.quantity}</span>    
                            </span>
                        </div>
                    ))
                }
                {
                    detail?.orderMenusAdd.length === 0
                        ? <></>
                        : <div>
                            <h4>Danh sách món ăn:</h4>
                            {
                                detail?.orderMenusAdd?.map(i => (
                                    <div key={i?.orderMenuId}>
                                        <span>
                                            <strong>Tên món: </strong> <span>{i?.menuName}</span>    
                                            <strong className="ml-10">Số lượng: </strong> <span>{i?.quantity}</span>    
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                }
                </div>
            </div>
        </OrderDetailContainer>
    );
}
 
export default OrderDetail;