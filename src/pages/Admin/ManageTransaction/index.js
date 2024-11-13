import { useEffect, useState } from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import { ManageTransactionContainer } from "./styled";
import AdminService from "../../../services/AdminService";
import SpinCustom from "../../../components/Common/SpinCustom";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import ModalHideQRCode from "./Modal/ModalHideQRCode";
import ModalStatusWithDraw from "./Modal/ModalStatusWithdraw";
import { formatNumberToK } from "../../../lib/stringUtils";

const ManageTransaction = () => {
    const [loading, setLoading] =  useState(false)
    const [transactions, setTransactions] = useState([])
    const [openModalHideQRCode, setOpenModalHideQRCode] = useState(false)
    const [openModalWithdrawStatus, setOpenModalWithfrawStatus] = useState(false)
    const [value, setValue] = useState('')

    const getAllTransaction = async () => {
        try {
            setLoading(true)
            const res = await AdminService.getAllTransaction()
            setTransactions(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllTransaction()
    }, [])



    const columns = [
        {
            title: 'Số thứ tự',
            key: 'stt',
            // width: 70,
            align: 'center',
            render: (_, __, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Chủ tài khoản',
            dataIndex: 'accountName',
            key: 'accountName',
            // width: 200,
            align: 'center',
        },
        {
            title: 'Ngân hàng',
            dataIndex: 'bankCode',
            key: 'bankCode',
            // width: 200,
            align: 'center',
        },
        {
            title: 'Số tài khoản',
            dataIndex: 'accountNo',
            key: 'accountNo',
            // width: 200,
            align: 'center',
            render: (value) => <span>{value}</span>,
        },
        {
            title: 'Mệnh giá',
            dataIndex: 'transactionAmount',
            key: 'transactionAmount',
            // width: 150,
            align: 'center',
            render: (value) => <span className="fs-15 fw-500">{formatNumberToK(value)}</span>,
        },
        {
            title: 'Ngày',
            dataIndex: 'transactionDate',
            key: 'transactionDate',
            // width: 150,
            align: 'center',
            sorter: (a, b) => dayjs(a.transactionDate).unix() - dayjs(b.transactionDate).unix(),
            render: (value) => (
                <>
                    <span style={{margin: 0}}> Ngày: {dayjs(value).format('DD-MM-YYYY')} </span> <br/>  
                    <span style={{margin: 0}}> Giờ: {dayjs(value).format('HH:mm')} </span>   
                </>
            )
        },
        {
            title: 'Loại giao dịch',
            dataIndex: 'transactionType',
            key: 'transactionType',
            align: 'center',
            // width: 120,
            render: (value) => (
                <div className="d-flex justify-content-center">
                    {value === "Withdraw" 
                        ? <div className="withdraw">Rút tiền</div> 
                        : value === "Recharge"
                        ? <div className="recharge">Nạp tiền</div> 
                        : value === "SystemAdd"
                        ? <div className="systemAdd">Hệ thống cộng tiền</div> 
                        : <div className="systemsubtract">Hệ thống trừ tiền</div>
                    }
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (value) => <span className="fw-500">
                {value === 'Pending' ? 'Đang chờ' : (value === 'Cancelled' ? 'Hủy' : 'Thành công')}
            </span>
        },
        {
            title: 'Chi tiết',
            dataIndex: 'description',
            key: 'description',
            // width: 150,
            align: 'center',
            render: (value) => <span> {value} </span>,
        },
        {
            title: 'QRCode',
            dataIndex: '',
            key: '',
            // width: 150,
            align: 'center',
            render: (_, record) => (
                <div className="d-flex align-items-center">
                    {
                        (record?.transactionType === 'Withdraw' && record?.status === 'Pending')
                            ? <Button type="primary" shape="round" className="mr-3" onClick={() => setOpenModalHideQRCode(record)}>
                                Hiện QR Code
                            </Button>
                            : null
                    }
                </div>
            )
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: '',
            // width: 150,
            align: 'center',
            render: (_, record) => (
                <div className="d-flex align-items-center">
                    {
                        (record?.transactionType === 'Withdraw' && record?.status === 'Pending')
                            ? <div className="d-flex align-items-center">
                                <Button type="primary" shape="round" className="mr-3" onClick={() => {setOpenModalWithfrawStatus(record); setValue('Successful')}}>
                                    Thành công
                                </Button>
                                <Button type="primary" shape="round" className="mr-3" danger onClick={() => {setOpenModalWithfrawStatus(record); setValue('Cancelled')}}>
                                    Hủy
                                </Button>
                            </div>
                            : null
                    }
                </div>
            )
        },
    ]
    
    return (  
        <AdminLayout>
            <ManageTransactionContainer>
                <SpinCustom spinning={loading}>
                    <div>
                        <div></div>
                        <div className="mt-30">
                            <Table
                                columns={columns} 
                                dataSource={transactions} 
                                pagination={{pageSize: 6}}
                                // bordered
                            />
                        </div>
                    </div>
                </SpinCustom>


                {
                    !!openModalHideQRCode && (
                        <ModalHideQRCode
                            open={openModalHideQRCode}
                            onCancel={() => setOpenModalHideQRCode(false)}
                        />
                    )
                }
                {
                    !!openModalWithdrawStatus && (
                        <ModalStatusWithDraw
                            open={openModalWithdrawStatus}
                            value={value}
                            onCancel={() => setOpenModalWithfrawStatus(false)}
                            onOk={getAllTransaction}
                        />
                    )
                }
            </ManageTransactionContainer>
        </AdminLayout>
    );
}
 
export default ManageTransaction;