import { useSelector } from "react-redux"
import { userInfor } from "../../../../../redux/Slice/userSlice"
import { useEffect, useState } from "react"
import { formatNumberToK } from "../../../../../lib/stringUtils"
import dayjs from "dayjs"
import UserService from "../../../../../services/UserService"
import { TransactionHistoryContainer } from "../../../../User/UserProfile/TransactionHistory/styled"
import SpinCustom from "../../../../../components/Common/SpinCustom"
import { Select, Table } from "antd"
const {Option} = Select

const TransaactionManagement = () => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')
    const [type, setType] = useState('')
    const user = useSelector(userInfor)
    
    const getAllTransactionHistory = async () => {
        try {
            setLoading(true)
            const res = await UserService.getTransactionhistory(user?.uid)
            status
                ? type 
                    ? setTransactions(res.filter((t) => {return t.status === status && t.transactionType === type}))
                    : setTransactions(res.filter((t) => t.status === status))
                : type  
                    ? setTransactions(res.filter((t) => {return t.transactionType === type}))
                    : setTransactions(res)
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
    }, [status, type])

    
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
            render: (value) => <span className="fs-15 fw-500">{value === "Recharge" ? "Nạp tiền" : (value === "Withdraw" ? "Rút tiền" : (value === "SystemAdd" ? 'Hệ thống cộng tiền' : "Thanh toán"))}</span>,
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
                            : <div className="pending">Đang chờ</div> 
                    }
                </div>
            ),
        },
    ]
    
    return (  
        <div style={{height: '100vh'}}>
            <TransactionHistoryContainer>
                <SpinCustom spinning={loading}>
                    <div className="d-flex align-items-center justify-content-space-between">
                        <div className="fs-20 fw-500">
                            Lịch sử giao dịch
                        </div>
                        <div className="d-flex">
                            <div className="pr-40 mr-10 select">
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
                            <div className="pr-40 select">
                                <Select 
                                    className="nice-select w-100" 
                                    allowClear  
                                    placeholder="Loại giao dịch"
                                    onChange={(e) => setType(e)}
                                >
                                    <Option key={1} value="Withdraw">
                                        Rút tiền
                                    </Option>
                                    <Option key={2} value="Recharge">
                                        Nạp tiền
                                    </Option>
                                    <Option key={3} value="SystemSubtract">
                                        Thanh toán
                                    </Option>
                                    <Option key={4} value="SystemAdd">
                                        Cộng tiền
                                    </Option>
                                </Select>
                            </div>
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
        </div>
    );
}
 
export default TransaactionManagement;