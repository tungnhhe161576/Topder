import { Button, Table } from 'antd';
import SpinCustom from '../../../../components/Common/SpinCustom'
import dayjs from 'dayjs';
import { useState } from 'react';
import ModalViewDetail from './Modal/ModalViewDetail';

const RestaurantAccount = ({loading, accounts, getAccount}) => {
    const [openModalViewDetail, setOpenModalViewDetail] = useState(false)
    
    
    const columns = [
		{
			title: 'STT',
			dataIndex: 'number',
			key: 'number',
			render: (_, __, index) => <span className="fs-15"> {index + 1} </span>,
		},
        {
            title: "Tên",
            dataIndex: "nameRes",
            key: "nameRes",
            width: 150,
        },
		{
			title: "Chủ nhà hàng",
			dataIndex: "nameOwner",
			key: "nameOwner",
			width: 150,
		},
		{
			title: "Ảnh",
			dataIndex: "logo",
			key: "logo",
			render: (text) => (
				<img src={text} alt="Blog" width='100px'/>
			),
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			key: "address",
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
					<Button
						type="primary"
						shape="round"
						className="mr-3"
						onClick={() => setOpenModalViewDetail(record)}
					>
						Chi tiết
					</Button>
				</div>
			),
		},
	];
    
    return (  
        <div>
            <div className="mt-20 ml-30 fw-500 fs-20">
                Các nhà hàng
            </div>
            <div className="mt-20">
                <SpinCustom spinning={loading}>
                    <Table
                        dataSource={accounts.filter(i => i.role === 'Restaurant')}
                        columns={columns}
                        rowKey="key"
                        pagination={{ pageSize: 4 }}
                    />
                </SpinCustom>
            </div>

            {
                !!openModalViewDetail && (
                    <ModalViewDetail
                        open={openModalViewDetail}
                        onCancel={() => setOpenModalViewDetail(false)}
                    />
                )    
            }
        </div>
    );
}
 
export default RestaurantAccount;