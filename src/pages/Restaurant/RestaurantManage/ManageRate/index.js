import { Table } from "antd";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { ManageRateContainer } from "./styled";
import dayjs from "dayjs";

const data = [
    { name: 'Đỗ Văn Đạt', phoneNumber: '0968228847', content: 'Ngon', stars: 4, date: '13-06-2024' },
    { name: 'Nguyễn Huy Tùng', phoneNumber: '0968228847', content: 'Ngon', stars: 5, date: '13-06-2024' },
    { name: 'Đỗ Văn Đạt', phoneNumber: '0968228847', content: 'Ngon', stars: 4, date: '13-06-2024' },
    { name: 'Đoàn Ngọc Minh', phoneNumber: '0968228847', content: 'Ngon', stars: 5, date: '13-06-2024' },
    { name: 'Đỗ Văn Đạt', phoneNumber: '0968228847', content: 'Ngon', stars: 2, date: '13-06-2024' },
    { name: 'Đoàn Ngọc Minh', phoneNumber: '0968228847', content: 'Ngon', stars: 3, date: '13-06-2024' },
    { name: 'Đỗ Văn Đạt', phoneNumber: '0968228847', content: 'Ngon', stars: 5, date: '13-06-2024' },
    { name: 'Nguyễn Văn Đức', phoneNumber: '0968228847', content: 'Ngon', stars: 3, date: '13-06-2024' },
    { name: 'Đoàn Ngọc Minh', phoneNumber: '0968228847', content: 'Ngon', stars: 5, date: '13-06-2024' },
    { name: 'Đỗ Văn Đạt', phoneNumber: '0968228847', content: 'Ngon', stars: 1, date: '13-06-2024' },
    { name: 'Nguyễn Văn Đức', phoneNumber: '0968228847', content: 'Ngon', stars: 3, date: '13-06-2024' },
]   
const ManageRate = () => {

    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="fs-15"> {text} </span>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (text) => <span className="fs-14"> {text} </span>,
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            render: (text) => <span className="fs-14"> {text} </span>,
        },
        {
            title: 'Số sao',
            dataIndex: 'stars',
            key: 'stars',
            render: (text) => <span className="fs-14"> {text} </span>,
            sorter: (a, b) => a.stars - b.stars,
            filters: [
                {
                    text: '5 sao',
                    value: 5,
                },
                {
                    text: '4 sao',
                    value: 4,
                },
                {
                    text: '3 sao',
                    value: 3,
                },
                {
                    text: '2 sao',
                    value: 2,
                },
                {
                    text: '1 sao',
                    value: 1,
                },
            ],
            onFilter: (value, record) => record.stars === value,
        },
        {
            title: 'Ngày/Tháng/Năm',
            dataIndex: 'date',
            key: 'date',
            render: (d) => <span className="fs-14"> {d} </span>,
        },
    ]

    return (  
        <RestaurantLayout>
            <ManageRateContainer>
                <div className="body">
                    <div className="fw-600 fs-22 pl-15 mb-22">
                        Đánh giá của khách hàng
                    </div>
                    <div className="table">
                        <Table 
                            columns={columns}
                            dataSource={data} 
                            bordered={false}
                            rowSelection
                            pagination={{ pageSize: 5 }}
                        />

                    </div>
                </div>
            </ManageRateContainer>
        </RestaurantLayout>
    );
}
 
export default ManageRate;