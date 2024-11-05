import { Button, Table } from "antd";

const TableBookingSchedule = () => {
	const data = [
		{
			nameTable: "Đỗ Văn Đạt",
			startDate: "13-06-2024",
			endDate: "13-06-2024",
			note: "dscsadsa",
		},
	];
	const columns = [
		{
			title: "Tên bàn",
			dataIndex: "nameTable",
			key: "nameTable",
			render: (text) => <span className="fs-15"> {text} </span>,
		},
		{
			title: "Thời gian bắt đầu",
			dataIndex: "startDate",
			key: "startDate",
			render: (text) => <span className="fs-14"> {text} </span>,
		},
		{
			title: "Thời gian kết thúc",
			dataIndex: "endDate",
			key: "endDate",
			render: (text) => <span className="fs-14"> {text} </span>,
		},
		{
			title: "Ghi chú",
			dataIndex: "note",
			key: "note",
			render: (text) => <span className="fs-14"> {text} </span>,
		},
		{
			title: "",
			dataIndex: "note",
			key: "note",
			render: (text, record) => (
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
						// onClick={() => handleEdit(record)}
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
						// onClick={() => handleDelete(record.key)}
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
						// onClick={showModal}
					>
						Tạo lịch
					</Button>
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
		</>
	);
};
export default TableBookingSchedule;
