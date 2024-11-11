import SpinCustom from "../../../../components/Common/SpinCustom";
import { Table } from 'antd'
import dayjs from "dayjs";

const CustomerAccount = ({loading, accounts, getAllAccount}) => {

    const columns = [
		{
			title: 'STT',
			dataIndex: 'number',
			key: 'number',
			render: (_, __, index) => <span className="fs-15"> {index + 1} </span>,
		},
		{
			title: "Tên",
			dataIndex: "name",
			key: "name",
			width: 150,
		},
		{
			title: "Ảnh",
			dataIndex: "image",
			key: "image",
			render: (text) => (
				<img src={text} alt="Blog" width='100px'/>
			),
		},
		{
			title: "Ngày sinh",
			dataIndex: "dob",
			key: "dob",
			width: 150,
            render: (value) => <span> {dayjs(value).format('DD-MM-YYYY')} </span>
		},
		{
			title: "Số điện thoại",
			dataIndex: "phone",
			key: "phone",
			width: 150,
            // render: (value) => <span> {dayjs(value).format('DD-MM-YYYY')} </span>
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			width: 150,
            // render: (value) => <span> {dayjs(value).format('DD-MM-YYYY')} </span>
		},
		{
			title: "Giới tính",
			dataIndex: "gender",
			key: "gender",
			width: 150,
            render: (value) => <span> {value === 'Male' ? 'Nam' : (value === 'Female' ? 'Nữ' : 'Khác')} </span>
		},
		// {
		// 	title: "Trạng thái",
		// 	dataIndex: "status",
		// 	key: "status",
		// 	render: (value, record) => (
        //         <></>
		// 	),
		// },
		{
			title: "",
			dataIndex: "",
			key: "action",
			render: (text, record) => (
				<div className="d-flex">
					{/* <Button
						type="primary"
						shape="round"
						className="mr-3"
						onClick={() => setOpenModalViewDetail(record)}
					>
						Chi tiết
					</Button> */}
				</div>
			),
		},
	];

    return (  
        <div>
            <div className="mt-20 ml-30 fw-500 fs-20">
                Các tài khoản người dùng
            </div>
            <div className="mt-20">
                <SpinCustom spinning={loading}>
                    <Table
                        dataSource={accounts.filter(i => i.role === 'Customer')}
                        columns={columns}
                        rowKey="key"
                        pagination={{ pageSize: 4 }}
                    />
                </SpinCustom>
            </div>
        </div>
    );
}
 
export default CustomerAccount;