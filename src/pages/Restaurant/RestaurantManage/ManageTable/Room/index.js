import { useState, useEffect } from "react";
import UserService from "../../../../../services/UserService";
import { Button, Select, Table } from "antd";
import SpinCustom from "../../../../../components/Common/SpinCustom";
import { TableAllContainer } from "../Table/styled";
import ModalDeleteRoom from "./Modal/ModalDelete";
import ModalUpdateRoom from "./Modal/ModalUpdate";
import ModalCreateRoom from "./Modal/ModalCreate";

const RestaurantRoom = ({user, getAllTables}) => {
	const [loading, setLoading] = useState(false)
	const [rooms, setRooms] = useState([])
	const [openModalCreateRoom, setOpenModalCreateRoom] = useState(false)
	const [openModalUpdateRoom, setOpenModalUpdateRoom] = useState(false)
	const [openModalDeleteRoom, setOpenModalDeleteRoom] = useState(false)

	const getAllRooms = async () => {
		try {
			setLoading(true)
			const res = await UserService.getAllRoom(user?.uid)
			setRooms(res?.items)
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if (!!user?.uid) {
			getAllRooms()
		}
	}, [user])

	const handleUpdateStatus = async (record) => {
		try {
			setLoading(true)
			await UserService.isEnabledRoom(
				user?.uid,
				record.roomId,
				!record.isBookingEnabled
			)
			getAllRooms()
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
			dataIndex: "roomName",
			key: "roomName",
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
						onClick={() => setOpenModalUpdateRoom(record)}
					>
						Chỉnh sửa
					</Button>
					<Button
						type="primary"
						danger
						onClick={() => setOpenModalDeleteRoom(record)}
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
						<Button className="mr-10" type="primary" onClick={() => setOpenModalCreateRoom(true)}>
							Tạo phòng mới
						</Button>
						<Button className="" type="primary">
							Tạo bằng File Excel
						</Button>
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
			</TableAllContainer>
		</SpinCustom>
	)
};
export default RestaurantRoom;
