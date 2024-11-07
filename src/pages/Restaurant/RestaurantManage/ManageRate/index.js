import { Table } from "antd";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { ManageRateContainer } from "./styled";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import UserService from '../../../../services/UserService'
import SpinCustom from '../../../../components/Common/SpinCustom'

const ManageRate = () => {
    const [loading, setLoading] = useState(false)
    const [feedbacks, setFeedbacks] = useState([])
    const user = useSelector(userInfor)

    const getFeedbacks = async () => {
        try {
            setLoading(true)
            const res = await UserService.getAllFeedbackByRestaurant(user?.uid)
            setFeedbacks(res?.items)
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if(!!user?.uid) {
            getFeedbacks()
        }
    }, [user])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'number',
            key: 'number',
            render: (_, __, value) => <span className="fs-15"> {value+1} </span>,
            align: 'center',
        },
        {
            align: 'center',
            title: 'Ngày tạo',
            dataIndex: 'createDate',
            key: 'createDate',
            sorter: (a, b) => dayjs(a.createDate).unix() - dayjs(b.createDate).unix(),
            render: (text) => <span className="fs-14"> {dayjs(text).format('DD-MM-YYYY')} </span>,
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
            align: 'center',
            render: (text) => <span className="fs-15"> {text} </span>,
        },
        {
            title: 'Số sao',
            dataIndex: 'star',
            key: 'star',
            align: 'center',
            sorter: (a, b) => a.star - b.star,
            render: (text) => <span className="fs-14"> {text} </span>,
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            render: (text) => <span className="fs-14"> {text} </span>,
        },
    ]

    return (  
        <RestaurantLayout>
            <ManageRateContainer>
                <div className="body">
                    <div className="fw-600 fs-22 pl-15 mb-22">
                        Đánh giá của khách hàng
                    </div>
                    <SpinCustom spinning={loading}>
                        <div className="table">
                            <Table 
                                columns={columns}
                                dataSource={feedbacks} 
                                bordered={false}
                                pagination={{ pageSize: 8 }}
                            />
                        </div>
                    </SpinCustom>
                </div>
            </ManageRateContainer>
        </RestaurantLayout>
    );
}
 
export default ManageRate;