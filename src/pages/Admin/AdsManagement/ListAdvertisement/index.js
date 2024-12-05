import { Button, Table, Select } from "antd";
import SpinCustom from "../../../../components/Common/SpinCustom";
import dayjs from "dayjs";
import { formatNumberToK } from "../../../../lib/stringUtils";
import { useState } from "react";
import ModalActiveAds from './Modal'
import {ListAdvertisementContainer} from './styled'
const {Option} = Select

const ListAdvertisement = ({loading, ads, getAllAds, setStatus, setStatusPayment}) => {
    const [openModalActive, setOpenModalActive] = useState(false)
    const [value, setValue] = useState('')

    const columns = [
        {
            title: 'STT',
            dataIndex: 'number',
            key: 'number',
            align: 'center',
            // width: 150,
            render: (_, __, index) => <span className="fs-15"> {index + 1} </span>,
        },
        {
            title: "Tên nhà hàng",
            dataIndex: "restaurantName",
            key: "restaurantName",
            align: 'center',
            // width: 150,
        },
        {
            title: "Ảnh",
            dataIndex: "restaurantImage",
            key: "restaurantImage",
            align: 'center',
            render: (value) => (<img src={value} alt="logo" width='100px'/>),
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
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: 'center',
            render: (value, record) => (
                <>
                    {
                        record?.status === 'Cancelled' 
                            ? <Button disabled type="primary" shape="round">Đã hủy</Button>
                            : <Button type="primary" shape="round" danger onClick={() => {setOpenModalActive(record); setValue('Cancelled')}}> Hủy </Button>
                    }
                </>
            ),
        },
    ];

    
    return (  
        <ListAdvertisementContainer>
            <SpinCustom spinning={loading}>
                <div className="mt-20">
                    <div className="d-flex justify-content-space-between">
                        <div className="mb-30 fs-18 pl-20 fw-500">
                            Danh sách liên hệ đặt quảng cáo
                        </div>
                        <div className="d-flex">
                            <div className="mr-20 select">
                                <Select
                                    className="nice-select w-100" 
                                    allowClear  
                                    placeholder="Trạng thái"
                                    defaultValue='Active'
                                    onChange={(e) => setStatus(e)}
                                >
                                    <Option key={1} value="Active">
                                        Đang hoạt động
                                    </Option>
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
                !!openModalActive && (
                    <ModalActiveAds
                        open={openModalActive}
                        onCancel={() => setOpenModalActive(false)}
                        onOk={getAllAds}
                        value={value}
                    />
                )
            }
        </ListAdvertisementContainer>
    );
}
 
export default ListAdvertisement;