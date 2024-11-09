import { useEffect, useState } from "react";
import UserService from "../../../../../services/UserService";
import { Button, Select, Table } from "antd";
import SpinCustom from "../../../../../components/Common/SpinCustom";
import { TableAllContainer } from "./styled";
import ModalDeleteTable from "./Modal/ModalDeleteTable";
import ModalCreateTable from "./Modal/ModalCreateTable";
import ModalUpdateTable from "./Modal/ModalUpdateTable";
const {Option} = Select

const AllTable = ({user, loading, setLoading, tables, getAllTables, setType}) => {
	// const [loading, setLoading] = useState(false)
	// const [tables, setTables] = useState([])
	const [openModalDeleteTable, setOpenModalDeleteTable] = useState(false)
	const [openModalCreateTable, setOpenModalCreateTable] = useState(false)
	const [openModalUpdateTable, setOpenModalUpdateTable] = useState(false)
	// const [type, setType] = useState()

	// const getAllTables = async () => {
	// 	try {
	// 		setLoading(true)
	// 		const res = await UserService.getAllRestaurantTable(user?.uid)
	// 		if (type) {
	// 			type === 'free' 
	// 				? setTables(res.items.filter(i => i?.roomId === null))
	// 				: setTables(res.items.filter(i => i?.roomId !== null))
	// 		} else {
	// 			setTables(res.items)
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	} finally {
	// 		setLoading(false)
	// 	}
	// }
	// useEffect(() => {
	// 	if (!!user?.uid) {
	// 		getAllTables()
	// 	}
	// }, [user, type])

	const handleUpdateStatus = async (record) => {
		try {
			setLoading(true)
			await UserService.updateTable({
				restaurantId: user?.uid,
				...record,
				isBookingEnabled: !record.isBookingEnabled
			})
			getAllTables()
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
			title: "Tên bàn",
			dataIndex: "tableName",
			key: "tableName",
			align: 'center',
			render: (value) => <span className="fs-15"> {value} </span>,
		},
		{
			title: "Tên phòng",
			dataIndex: "roomName",
			key: "roomName",
			align: 'center',
			render: (value) => <span className="fs-15"> {!!value ? value : 'Phòng tự do'} </span>,
		},
		{
			title: "Sức chứa",
			dataIndex: "maxCapacity",
			key: "maxCapacity",
			align: 'center',
			sorter: (a, b) => a.maxCapacity - b.maxCapacity,
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
			title: "",
			key: "note",
			align: 'center',
			render: (_, record) => (
				<div className="d-flex justify-content-center">
					{
						record?.isBookingEnabled 
							? <Button
								className="huy-mo"
								type="primary"
								shape="round"
								onClick={() => handleUpdateStatus(record)}
							>
								Hủy mở bàn
							</Button>
							: <Button
								className="mo"
								type="primary"
								shape="round"
								onClick={() => handleUpdateStatus(record)}
							>
								Mở bàn
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
						onClick={() => setOpenModalUpdateTable(record)}
					>
						Chỉnh sửa
					</Button>
					<Button
						type="primary"
						danger
						onClick={() => setOpenModalDeleteTable(record)}
					>
						Xóa
					</Button>
				</div>
			),
		},
	];
	
	return (
		<SpinCustom spinning={loading}>
			<TableAllContainer>
				<div className="d-flex justify-content-space-between mt-20 mb-30">
					<div className="d-flex">
						<Button className="mr-10" type="primary" onClick={() => setOpenModalCreateTable(true)}>
							Tạo bàn mới
						</Button>
						<Button className="" type="primary" onClick={() => setOpenModalCreateTable(true)}>
							Tạo bằng File Excel
						</Button>
					</div>

					<div className="mr-20 select ">
						<Select
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
						</Select>
					</div>
				</div>
				<div className="table">
					<Table
						columns={columns}
						dataSource={tables}
						bordered={false}
						pagination={{ pageSize: 5 }}
					/>
				</div>
			</TableAllContainer>

			{!!openModalDeleteTable && (
				<ModalDeleteTable
					open={openModalDeleteTable}
					onCancel={() => setOpenModalDeleteTable(false)}
					onOk={getAllTables}
					userId={user?.uid}
				/>
			)}
			{!!openModalCreateTable && (
				<ModalCreateTable
					open={openModalCreateTable}
					onCancel={() => setOpenModalCreateTable(false)}
					onOk={getAllTables}
					userId={user?.uid}
				/>
			)}
			{!!openModalUpdateTable && (
				<ModalUpdateTable
					open={openModalUpdateTable}
					onCancel={() => setOpenModalUpdateTable(false)}
					onOk={getAllTables}
					userId={user?.uid}
				/>
			)}
		</SpinCustom>
	)
	
};
export default AllTable;
