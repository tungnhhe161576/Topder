import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import UserService from "../../../../../services/UserService";
import dayjs from "dayjs";
import ModalCreateSchedule from "./Modal/CreateSchedule";
import SpinCustom from "../../../../../components/Common/SpinCustom";
import ModalDeleteSchedule from "./Modal/DeleteSchedule";

const TableBookingSchedule = ({user}) => {
	const [loading, setLoading] = useState(false)
	const [openModalEdit, setOpenModalEdit] = useState(false)
	const [openModalDelete, setOpenModalDelete] = useState(false)
	const [openModalCreateSchedule, setOpenModalCreateSchedule] = useState(false)
	const [tables, setTables] = useState([])

	const getAllTableLazy = async () => {
		try {
			setLoading(true)
			const res = await UserService.getAllTableLazy(user?.uid)
			setTables(res)
		} catch (error) {
			
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!!user?.uid) {
			getAllTableLazy()
		}
	}, [])


	const columns = [
		{
			title: "Tên bàn",
			dataIndex: "tableName",
			key: "tableName",
			render: (text) => <span className="fs-15"> {text} </span>,
		},
		{
			title: "Thời gian bắt đầu",
			dataIndex: "startTime",
			key: "startTime",
			render: (value) => <span className="fs-14"> {dayjs(value).format('DD-MM-YYYY HH:mm')} </span>,
		},
		{
			title: "Thời gian kết thúc",
			dataIndex: "endTime",
			key: "endTime",
			render: (value) => <span className="fs-14"> {dayjs(value).format('DD-MM-YYYY HH:mm')} </span>,
		},
		{
			title: "Ghi chú",
			dataIndex: "notes",
			key: "notes",
			render: (text) => <span className="fs-14"> {text} </span>,
		},
		{
			title: "",
			key: "note",
			render: (_, record) => (
				<div
					style={{
						display: "flex",
						gap: "15px",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Button
						style={{
							height: 40,
							display: "flex",
							alignItems: "center",
						}}
						type="primary"
						onClick={() => setOpenModalEdit(record)}
					>
						Chỉnh sửa
					</Button>
					<Button
						style={{
							height: 40,
							display: "flex",
							alignItems: "center",
						}}
						type="primary"
						danger
						onClick={() => setOpenModalDelete(record)}
					>
						Xóa
					</Button>
				</div>
			),
		},
	];
	return (
		<>
			<div className="body">
				<div style={{ marginBottom: "20px", textAlign: "right" }}>
					<Button
						type="primary"
						style={{ height: 40 }}
						onClick={() => setOpenModalCreateSchedule(true)}
					>
						Tạo lịch
					</Button>
				</div>

				<div className="table">
					<SpinCustom spinning={loading}>
						<Table
							columns={columns}
							dataSource={tables}
							bordered={false}
							pagination={{ pageSize: 5 }}
						/>
					</SpinCustom>
				</div>
			</div>

			{!!openModalCreateSchedule && (
				<ModalCreateSchedule
					open={openModalCreateSchedule}
					onCancel={() => setOpenModalCreateSchedule(false)}
					onOk={getAllTableLazy}
					userId={user?.uid}
				/>
			)}
			{!!openModalDelete && (
				<ModalDeleteSchedule
					open={openModalDelete}
					onCancel={() => setOpenModalDelete(false)}
					onOk={getAllTableLazy}
				/>
			)}
		</>
	);
};
export default TableBookingSchedule;
