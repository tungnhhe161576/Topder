import { useEffect, useState } from "react";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import { TransactionHistoryContainer } from "./styled";
import UserService from "../../../../services/UserService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import SpinCustom from "../../../../components/Common/SpinCustom";
import { Select, Table } from "antd";
import { formatNumberToK } from "../../../../lib/stringUtils";
import dayjs from "dayjs";
const { Option } = Select;

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')
    const user = useSelector(userInfor)

    const getAllTransactionHistory = async () => {
        try {
            setLoading(true)
            const res = await UserService.getTransactionhistory(user?.uid)
            if (status) {
                setTransactions(res.filter((transaction) => transaction.status === status))
            } else {
                setTransactions(res);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            getAllTransactionHistory()
        }
    }, [status])
    

    const columns = [
        {
            title: 'Số thứ tự',
            key: 'stt',
            width: 70,
            align: 'center',
            render: (_, __, index) => <span className="fs-15 fw-500">{index + 1}</span>,
        },
        {
            title: 'Thời gian',
            dataIndex: 'transactionDate',
            key: 'transactionDate',
            width: 200,
            align: 'center',
            sorter: (a, b) => dayjs(a.transactionDate).unix() - dayjs(b.transactionDate).unix(),
            render: (value) => (
                <>
                    <span className="fw-500" style={{margin: 0}}> Ngày: {dayjs(value).format('DD-MM-YYYY')} </span> <br/>  
                    <span className="fw-500" style={{margin: 0}}> Giờ: {dayjs(value).format('HH:mm')} </span>   
                </>
            )
        },
        {
            title: 'Loại giao dịch',
            dataIndex: 'transactionType',
            key: 'transactionType',
            width: 200,
            align: 'center',
            render: (value) => <span className="fs-15 fw-500">{value === "Recharge" ? "Nạp tiền" : (value === "Withdraw" ? "Rút tiền" : "Thanh toán")}</span>,
        },
        {
            title: 'Mệnh giá',
            dataIndex: 'transactionAmount',
            key: 'transactionAmount',
            width: 150,
            align: 'center',
            render: (value) => <span className="fs-15 fw-500">{formatNumberToK(value)}</span>,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 120,
            render: (value) => (
                <div className="d-flex justify-content-center">
                    {value === "Successful" 
                        ? <div className="success">Thành công</div> 
                        : value === "Cancelled"
                            ? <div className="fail">Thất bại</div> 
                            : <div className="fail">Đang chờ</div> 
                    }
                </div>
            ),
        },
    ]


    return (  
        <ProfileUserLayout>
            <TransactionHistoryContainer>
                <SpinCustom spinning={loading}>
                    <div className="d-flex align-items-center justify-content-space-between">
                        <div className="fs-20 fw-500">
                            Lịch sử giao dịch
                        </div>
                        <div className="pr-40 select">
                            <Select 
                                className="nice-select w-100" 
                                allowClear  
                                placeholder="Trạng thái"
                                onChange={(e) => setStatus(e)}
                            >
                                <Option key={1} value="Successful">
                                    Thành công
                                </Option>
                                <Option key={2} value="Cancelled">
                                    Thất bại
                                </Option>
                                <Option key={3} value="Pending">
                                    Đang chờ
                                </Option>
                            </Select>
                        </div>
                    </div>
                    <div className="mt-30 pr-20">
                        <Table
                            columns={columns} 
                            dataSource={transactions} 
                            pagination={{pageSize: 6}}
                            // bordered
                        />
                    </div>
                </SpinCustom>
            </TransactionHistoryContainer>
        </ProfileUserLayout>
    );
}
 
export default TransactionHistory;