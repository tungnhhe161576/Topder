import { useState, useEffect } from "react";
import UserService from "../../../../../services/UserService";
import { Button, Select, Table } from "antd";
import SpinCustom from "../../../../../components/Common/SpinCustom";
import { TableAllContainer } from "../Table/styled";
import ModalDeleteRoom from "./Modal/ModalDelete";
import ModalUpdateRoom from "./Modal/ModalUpdate";
import ModalCreateRoom from "./Modal/ModalCreate";
import ModalUploadExcel from "./Modal/ModalUploadExcel";
import ModalCreateByExcel from "./Modal/ModalCreateByExcel";
const {Option} = Select

const RestaurantRoom = ({ user, getAllTables, setStatus }) => {
	const [loading, setLoading] = useState(false);
	const [rooms, setRooms] = useState([]);
	const [openModalCreateRoom, setOpenModalCreateRoom] = useState(false);
	const [openModalUpdateRoom, setOpenModalUpdateRoom] = useState(false);
	const [openModalDeleteRoom, setOpenModalDeleteRoom] = useState(false);
	const [openModalUploadExcel, setOpenModalUploadExcel] = useState(false);
	const [openModalCreateByExcel, setOpenModalCreateByExcel] = useState(false)
	const [statusRoom, setStatusRoom] = useState(true)

	const getAllRooms = async () => {
		try {
			setLoading(true);
			const res = await UserService.getAllRoom(user?.uid);
			statusRoom !== undefined
				? setRooms(res.items.filter(i => {return(i?.isBookingEnabled === statusRoom)}))
				: setRooms(res?.items);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (!!user?.uid) {
			getAllRooms();
		}
	}, [user, statusRoom]);

	const handleUpdateStatus = async (record) => {
		try {
			setLoading(true);
			await UserService.isEnabledRoom(
				user?.uid,
				record.roomId,
				!record.isBookingEnabled
			);
			getAllRooms();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const columns = [
		{
			title: "STT",
			dataIndex: "number",
			key: "number",
			render: (_, __, index) => (
				<span className="fs-15"> {index + 1} </span>
			),
		},
		// {
		// 	title: "Tên bàn",
		// 	dataIndex: "roomName",
		// 	key: "roomName",
		// 	align: 'center',
		// 	render: (value) => <span className="fs-15"> {value} </span>,
		// },
		{
			title: "Tên phòng",
			dataIndex: "roomName",
			key: "roomName",
			align: "center",
			render: (value) => (
				<span className="fs-15">
					{" "}
					{!!value ? value : "Phòng tự do"}{" "}
				</span>
			),
		},
		{
			title: "Sức chứa",
			dataIndex: "maxCapacity",
			key: "maxCapacity",
			align: "center",
			sorter: (a, b) => a.maxCapacity - b.maxCapacity,
			render: (value) => <span className="fs-14"> {value} </span>,
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
			align: "center",
			render: (value) => (
				<span className="fs-14">
					{" "}
					{!!value ? value : "Không có mô tả"}{" "}
				</span>
			),
		},
		{
			title: "",
			key: "note",
			align: "center",
			render: (_, record) => (
				<div className="d-flex justify-content-center">
					{record?.isBookingEnabled ? (
						<div
							className="status-mo"
						>
							Đang hoạt động
						</div>
					) : (
						<div
							className="status-huy-mo"
						>
							Đang đóng
						</div>
					)}
				</div>
			),
		},
		{
			title: "",
			key: "note",
			align: "center",
			render: (_, record) => (
				<div className="d-flex justify-content-start">
					<Button
						className="mr-5"
						type="primary"
						shape="round"
						onClick={() => setOpenModalUpdateRoom(record)}
					>
						Chỉnh sửa
					</Button>
					<Button
						type="primary"
						danger
						shape="round"
						onClick={() => setOpenModalDeleteRoom(record)}
					>
						Xóa
					</Button>
					{record?.isBookingEnabled ? (
						<Button
							className="huy-mo ml-5"
							type="primary"
							shape="round"
							onClick={() => handleUpdateStatus(record)}
						>
							Hủy mở bàn
						</Button>
					) : (
						<Button
							className="mo ml-5"
							type="primary"
							shape="round"
							onClick={() => handleUpdateStatus(record)}
						>
							Mở bàn
						</Button>
					)}
				</div>
			),
		},
	];

	return (
		<SpinCustom spinning={loading}>
			<TableAllContainer>
				<div className="d-flex justify-content-space-between mt-20 mb-30">
					<div className="d-flex">
						<Button
							className="mr-10"
							type="primary"
							onClick={() => setOpenModalCreateRoom(true)}
						>
							Tạo phòng mới
						</Button>
						<Button className="" type="primary" onClick={() => setOpenModalCreateByExcel(true)}>
							Tạo bằng File Excel
						</Button>
					</div>
					<div className="mr-20 select ">
							<Select
								className="nice-select w-100" 
								allowClear  
								placeholder="Kiểu phòng"
								defaultValue={true}
								onChange={(e) => setStatusRoom(e)}
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
				<div className="table">
					<Table
						columns={columns}
						dataSource={rooms}
						bordered={false}
						pagination={{ pageSize: 5 }}
					/>
				</div>

				{!!openModalDeleteRoom && (
					<ModalDeleteRoom
						open={openModalDeleteRoom}
						onCancel={() => setOpenModalDeleteRoom(false)}
						onOk={getAllRooms}
						userId={user?.uid}
						getAllTables={getAllTables}
					/>
				)}
				{!!openModalUpdateRoom && (
					<ModalUpdateRoom
						open={openModalUpdateRoom}
						onCancel={() => setOpenModalUpdateRoom(false)}
						onOk={getAllRooms}
						getAllTables={getAllTables}
					/>
				)}
				{!!openModalCreateRoom && (
					<ModalCreateRoom
						open={openModalCreateRoom}
						onCancel={() => setOpenModalCreateRoom(false)}
						onOk={getAllRooms}
						userId={user?.uid}
					/>
				)}
				{!!openModalUploadExcel && (
					<ModalUploadExcel
						open={openModalUploadExcel}
						onCancel={() => setOpenModalUploadExcel(false)}
						onOk={getAllRooms}
						userId={user?.uid}
					/>
				)}
				{!!openModalCreateByExcel && (
				<ModalCreateByExcel
					open={openModalCreateByExcel}
					onCancel={() => setOpenModalCreateByExcel(false)}
					onOk={getAllRooms}
					userId={user?.uid}
				/>
			)}
			</TableAllContainer>
		</SpinCustom>
	);
};
export default RestaurantRoom;
