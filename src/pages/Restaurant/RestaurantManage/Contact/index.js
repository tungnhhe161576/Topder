import { useEffect, useState } from "react";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { ContactContainer } from "./styled";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import UserService from "../../../../services/UserService";
import SpinCustom from '../../../../components/Common/SpinCustom'
import dayjs from "dayjs";
import { formatNumberToK } from '../../../../lib/stringUtils'
import { Button, Select, Table } from "antd";
import ModalPayment from "./Modal/ModalPayment";
import ModalCreateBooking from "./Modal/CreateBooking";
import ModalViewPrice from "./Modal/ModalViewPrice";
import ModalCancelBooking from "./Modal/CancelBooking";
const {Option} = Select

const Contact = () => {
    const [loading, setLoading] = useState(false)
    const [openModalPayment, setOpenModalPayment] = useState(false)
    const [openModalCreateBooking, setOpenModalCreateBooking] = useState(false)
    const [openModalViewPrice, setOpenModalViewPrice] = useState(false)
    const [openModalCancelBooking, setOpenModalCancelBooking] = useState(false)
    const [status, setStatus] = useState('')
    const [statusPayment, setStatusPayment] = useState('')
    const [ads, setAds] = useState([])
    const user = useSelector(userInfor)
    
    const getAllAds = async () => {
        try {
            setLoading(true)
            const res = await UserService.getAllBookingAds(user?.uid)
            status 
                ? statusPayment
                    ? setAds(res.filter((t) => {return t.status === status && t.statusPayment === statusPayment}))
                    : setAds(res.filter((t) => {return t.status === status}))
                : statusPayment
                    ? setAds(res.filter((t) => {return t.statusPayment === statusPayment}))
                    : setAds(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if(!!user) {
            getAllAds()
        }
    }, [user, status, statusPayment])


    const columns = [
        {
            title: 'STT',
            dataIndex: 'number',
            key: 'number',
            align: 'center',
            width: 150,
            render: (_, __, index) => <span className="fs-15"> {index + 1} </span>,
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            align: 'center',
            render: (value) => (<span>{dayjs(value).format('DD-MM-YYYY HH:mm')}</span>),
        },
        {
            title: "Khoảng giờ",
            dataIndex: "time",
            key: "time",
            // width: 150,
            align: 'center',
            render: (_, record) => (
                <div>
                    <div>
                        Bắt đầu: {dayjs(record?.startTime).format('DD-MM-YYYY HH:mm')}
                    </div>
                    <div>
                        Kết thúc: {dayjs(record?.endTime).format('DD-MM-YYYY HH:mm')}
                    </div>
                </div>
            )
        },
        {
            title: "Mô tả",
            dataIndex: "title",
            key: "title",
            width: 150,
            align: 'center',
            render: (value) => <span> {value} </span>
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalAmount",
            key: "totalAmount",
            width: 150,
            align: 'center',
            render: (value) => <span> {formatNumberToK(value)} </span>
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: 'center',
            render: (value, record) => (
                <div className='d-flex justify-content-center align-items-center'>
                    {
                        value === "Active" 
                            ? <div className="status active"> Đang hoạt động </div> 
                            : <div className="status cancel"> Đã hủy </div> 
                    }
                </div>
            ),
        },
        {
            title: "Trạng thái thanh toán",
            dataIndex: "statusPayment",
            key: "statusPayment",
            align: 'center',
            render: (value, record) => (
                <div className='d-flex justify-content-center align-items-center'>
                    {
                        value === "Pending" 
                            ? <div className='status pending'> Chờ chuyển khoản </div>
                            : value === "Successful"    
                                ? <div className='status paid'>Đã chuyển khoản</div>
                                : <div className='status cancel'>Đã hủy</div>
                        
                    }
                </div>
            ),
        },
        {
            title: "",
            dataIndex: "d",
            key: "d",
            align: 'center',
            render: (_, record) => (
                <div className='d-flex justify-content-center align-items-center'>
                    {
                        (record?.status === 'Active' && record?.statusPayment === 'Pending')
                            ? <div className='d-flex justify-content-center align-items-center'>
                                <Button className="mr-5" type="primary" shape="round" onClick={() => setOpenModalPayment(record)}> Thanh toán </Button>
                                <Button type="primary" danger shape="round" onClick={() => setOpenModalCancelBooking(record)}> Hủy </Button>
                            </div>
                            : null
                    }
                </div>
            ),
        },
    ];

    
    
    return (  
        <RestaurantLayout>
            <ContactContainer>
                <SpinCustom spinning={loading}>
                    <div className="mt-20">
                        <div className="d-flex justify-content-space-between">
                            <div className="mb-30 pl-20 d-flex">
                                <Button type='primary' className="mr-10" onClick={() => setOpenModalCreateBooking(true)}>
                                    Tạo yêu cầu quảng cáo
                                </Button>
                                <Button type='primary' onClick={() => setOpenModalViewPrice(true)}>
                                    Xem bảng giá
                                </Button>
                            </div>
                            <div className="d-flex">
                                <div className="mr-20 select">
                                    <Select
                                        className="nice-select w-100" 
                                        allowClear  
                                        placeholder="Trạng thái"
                                        // defaultValue='In-Active'
                                        onChange={(e) => setStatus(e)}
                                    >
                                        <Option key={1} value="Active">
                                            Đang hoạt động
                                        </Option>
                                        {/* <Option key={2} value="In-Active">
                                            Chờ duyệt
                                        </Option> */}
                                        <Option key={3} value="Cancelled">
                                            Đã hủy
                                        </Option>
                                    </Select>
                                </div>
                                <div className="pr-40 mr-10 select">
                                    <Select
                                        className="nice-select w-100" 
                                        allowClear  
                                        placeholder="Trạng thái chuyển khoản"
                                        // defaultValue='In-Active'
                                        onChange={(e) => setStatusPayment(e)}
                                    >
                                        <Option key={1} value="Pending">
                                            Chờ chuyển khoản
                                        </Option>
                                        <Option key={2} value="Successful">
                                            Đã chuyển khoản
                                        </Option>
                                        <Option key={3} value="Cancelled">
                                            Đã hủy
                                        </Option>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Table
                                dataSource={ads}
                                columns={columns}
                                pagination={{ pageSize: 5 }}
                            />
                        </div>
                    </div>
                </SpinCustom>

                {
                    !!openModalPayment && (
                        <ModalPayment
                            open={openModalPayment}
                            onCancel={() => setOpenModalPayment(false)}
                            onOk={getAllAds}
                            user={user}
                        />
                    )
                }
                {
                    !!openModalCreateBooking && (
                        <ModalCreateBooking
                            open={openModalCreateBooking}
                            onCancel={() => setOpenModalCreateBooking(false)}
                            onOk={getAllAds}
                            user={user}
                        />
                    )
                }
                {
                    !!openModalViewPrice && (
                        <ModalViewPrice
                            open={openModalViewPrice}
                            onCancel={() => setOpenModalViewPrice(false)}
                        />
                    )
                }
                {
                    !!openModalCancelBooking && (
                        <ModalCancelBooking
                            open={openModalCancelBooking}
                            onCancel={() => setOpenModalCancelBooking(false)}
                            onOk={getAllAds}
                        />
                    )
                }
            </ContactContainer>
        </RestaurantLayout>
    );
}
 
export default Contact;
