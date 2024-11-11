import {Avatar, Button, Table} from 'antd'
import SpinCustom from '../.././../../../components/Common/SpinCustom'
import { formatNumberToK } from "../../../../../lib/stringUtils";
import { useState } from 'react';
import UserService from '../../../../../services/UserService';
import ModalDeleteMenu from './Modal/DeleteMenu';
import ModalUpdateMenu from './Modal/UpdateMenu';
import ModalCreateMenu from './Modal/CreateMenu';
import ModalCreateByExcel from './Modal/ModalCreateByExcel';

const RestaurantMenu = ({user, getMenus, loading, setLoading, menus}) => {
	const [openModalDeleteMenu, setOpenModalDeleteMenu] = useState(false)
	const [modalUpdateMenu, setModalUpdateMenu] = useState(false)
	const [modalCreateMenu, setModalCreateMenu] = useState(false)
	const [openModalCreateByExcel, setOpenModalCreateByExcel] = useState(false)
	

	const handleActiveMenu = async (menu) => {
		try {
			setLoading(true)
			await UserService.activeMenu(menu?.menuId, menu?.status === 'Active' ? 'In-Active' : 'Active')
			getMenus()
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false)
		}
	}
 	
	
	const columns = [
		{
			title: "STT",
			dataIndex: "number",
			key: "number",
			render: (_, __, index) => <span className="fs-15"> {index+1} </span>,
		},
		{
			title: "Ảnh",
			dataIndex: "image",
			key: "image",
			align: 'center',
			render: (value) => <div> 
				<Avatar size={100} src={value}/>
				{/* <img src={value} alt='menu_image'/>  */}
			</div>,
		},
		{
			title: "Tên món",
			dataIndex: "dishName",
			key: "dishName",
			align: 'center',
			render: (value) => <span className="fs-15"> {value} </span>,
		},
		{
			title: "Giá tiền",
			dataIndex: "price",
			key: "price",
			align: 'center',
			sorter: (a, b) => a.price - b.price,
			render: (value) => <span className="fs-15"> {formatNumberToK(value)} </span>,
		},
		{
			title: "Loại món ăn",
			dataIndex: "categoryMenuName",
			key: "categoryMenuName",
			align: 'center',
			render: (value) => <span className="fs-14"> {value} </span>,
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
			align: 'center',
			render: (value) => <span className="fs-14"> {!!value ? value : 'Không có mô tả'} </span>,
		},
		{
			title: "Trạng thái",
			key: "status",
			align: 'center',
			render: (_, record) => (
				<div className="d-flex justify-content-center">
					{
						record?.status === 'Active'
							? <Button
								className="mo"
								type="primary"
								shape="round"
								onClick={() => handleActiveMenu(record)}
							>
								Khóa món ăn
							</Button>
							: <Button
								className="huy-mo"
								type="primary"
								shape="round"
								onClick={() => handleActiveMenu(record)}
							>
								Mở món ăn
							</Button>
					}
				</div>
			),
		},
		{
			title: "",
			key: "note",
			align: 'center',
			render: (_, record) => (
				<div className="d-flex justify-content-center">
					<Button
						className="mr-10"
						type="primary"
						shape="round"
						onClick={() => setModalUpdateMenu(record)}
					>
						Chỉnh sửa
					</Button>
					<Button
						type="primary"
						danger
						shape="round"
						onClick={() => setOpenModalDeleteMenu(record)}
					>
						Xóa
					</Button>
				</div>
			),
		},
	];
	
	return (
		<SpinCustom spinning={loading}>
			<div>
				<div className="d-flex justify-content-space-between mt-20 mb-30">
					<div className="d-flex">
						<Button className="mr-10" type="primary" onClick={() => setModalCreateMenu(true)}>
							Tạo món mới
						</Button>
						<Button className="" type="primary" onClick={() => setOpenModalCreateByExcel(true)}>
							Tạo bằng File Excel
						</Button>
					</div>

					<div className="mr-20 select ">
						{/* <Select
							className="nice-select w-100" 
							allowClear  
							placeholder="Kiểu bàn"
							onChange={(e) => setType(e)}
						>
							<Option key={1} value={'free'}>
								Bàn tự do
							</Option>
							<Option key={2} value='room'>
								Bàn trong phòng
							</Option>
						</Select> */}
					</div>
				</div>
				<div className="table">
					<Table
						columns={columns}
						dataSource={menus}
						bordered={false}
						pagination={{ pageSize: 5 }}
					/>
				</div>
			</div>

			{!!openModalDeleteMenu && (
				<ModalDeleteMenu
					open={openModalDeleteMenu}
					onCancel={() => setOpenModalDeleteMenu(false)}
					onOk={getMenus}
					userId={user?.uid}
				/>
			)}
			{!!modalUpdateMenu && (
				<ModalUpdateMenu
					open={modalUpdateMenu}
					onCancel={() => setModalUpdateMenu(false)}
					onOk={getMenus}
					userId={user?.uid}
				/>
			)}
			{!!modalCreateMenu && (
				<ModalCreateMenu
					open={modalCreateMenu}
					onCancel={() => setModalCreateMenu(false)}
					onOk={getMenus}
					userId={user?.uid}
				/>
			)}
			{!!openModalCreateByExcel && (
				<ModalCreateByExcel
					open={openModalCreateByExcel}
					onCancel={() => setOpenModalCreateByExcel(false)}
					onOk={getMenus}
					userId={user?.uid}
				/>
			)}
		</SpinCustom>
	)
};
export default RestaurantMenu;
