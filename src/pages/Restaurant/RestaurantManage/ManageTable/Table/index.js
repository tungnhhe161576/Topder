import { useState } from "react";
import UserService from "../../../../../services/UserService";
import { Button, Select, Table } from "antd";
import SpinCustom from "../../../../../components/Common/SpinCustom";
import { TableAllContainer } from "./styled";
import ModalDeleteTable from "./Modal/ModalDeleteTable";
import ModalCreateTable from "./Modal/ModalCreateTable";
import ModalUpdateTable from "./Modal/ModalUpdateTable";
import ModalCreateTableByExcel from "./Modal/ModalCreateByExcel";
const {Option} = Select

const AllTable = ({user, loading, setLoading, tables, getAllTables, setType, setStatus}) => {
	const [openModalDeleteTable, setOpenModalDeleteTable] = useState(false)
	const [openModalCreateTable, setOpenModalCreateTable] = useState(false)
	const [openModalUpdateTable, setOpenModalUpdateTable] = useState(false)
	const [openModalCreateByExcel, setOpenModalCreateByExcel] = useState(false)

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
			render: (value) => <span className="fs-15"> {!!value ? value : 'Bàn tự do'} </span>,
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
							? <div
								className="status-mo"
							>
								Đang phục vụ
							</div>
							: <div
								className="status-huy-mo"
							>
								Dừng phục vụ
							</div>
					}
				</div>
			),
		},
		{
			title: "",
			key: "note",
			align: 'center',
			render: (_, record) => (
				<div className="d-flex justify-content-start">
					<Button
						className="mr-5"
						type="primary"
						shape="round"
						onClick={() => setOpenModalUpdateTable(record)}
					>
						Chỉnh sửa
					</Button>
					<Button
						type="primary"
						shape="round"
						danger
						onClick={() => setOpenModalDeleteTable(record)}
					>
						Xóa
					</Button>
					{
						record?.isBookingEnabled 
							? <Button
								className="ml-5 huy-mo"
								type="primary"
								shape="round"
								onClick={() => handleUpdateStatus(record)}
							>
								Đóng bàn
							</Button>
							: <Button
								className="mo ml-5"
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
	];
	
	return (
		<SpinCustom spinning={loading}>
			<TableAllContainer>
				<div className="d-flex justify-content-space-between mt-20 mb-30">
					<div className="d-flex">
						<Button className="mr-10" type="primary" onClick={() => setOpenModalCreateTable(true)}>
							Tạo bàn mới
						</Button>
						<Button className="" type="primary" onClick={() => setOpenModalCreateByExcel(true)}>
							Tạo bằng File Excel
						</Button>
					</div>

					<div className="d-flex">
						<div className="mr-20 select ">
							<Select
								className="nice-select w-100" 
								allowClear  
								placeholder="Kiểu bàn"
								onChange={(e) => setType(e)}
							>
								<Option key={1} value='free'>
									Bàn tự do
								</Option>
								<Option key={2} value='room'>
									Bàn trong phòng
								</Option>
							</Select>
						</div>
						<div className="mr-20 select ">
							<Select
								className="nice-select w-100" 
								allowClear  
								defaultValue={true}
								placeholder="Kiểu bàn"
								onChange={(e) => setStatus(e)}
							>
								<Option key={1} value={true}>
									Đang phục vụ
								</Option>
								<Option key={2} value={false}>
									Đang dừng phục vụ
								</Option>
							</Select>
						</div>
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
			{!!openModalCreateByExcel && (
				<ModalCreateTableByExcel
					open={openModalCreateByExcel}
					onCancel={() => setOpenModalCreateByExcel(false)}
					onOk={getAllTables}
					userId={user?.uid}
				/>
			)}
		</SpinCustom>
	)
	
};
export default AllTable;
