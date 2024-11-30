import { Button, Select, Table } from "antd";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import { ManageReportContainer } from "./styled";
import dayjs from "dayjs";
import SpinCustom from "../../../components/Common/SpinCustom";
import { useEffect, useState } from "react";
import AdminService from "../../../services/AdminService";
import ModalHandleReport from "./Modal";
const {Option} = Select

const ManageReport = () => {
	const [loading, setLoading] = useState(false);
	const [reports, setReports] = useState([]);
	const [type, setType] = useState()
	const [openModalHandleReport, setOpenModalHandleReport] = useState(false)

	const getReports = async () => {
		try {
			setLoading(true);
			const res = await AdminService.getListReport();
			type 
				? setReports(res.filter(i => i?.reportType === type))
				: setReports(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getReports();
	}, [type]);

	// public int ReportId { get; set; }
	//     public int ReportedBy { get; set; }
	//     public int ReportedByEmail { get; set; }
	//     public int ReportedOn { get; set; }
	//     public int ReportedOnEmail { get; set; }
	//     public string ReportType { get; set; } = null!;
	//     public string Description { get; set; } = null!;
	//     public string? Status { get; set; }
	//     public DateTime? CreatedAt { get; set; }

	const columns = [
		{
			title: "Số thứ tự",
			key: "stt",
			// width: 70,
			align: "center",
			render: (_, __, index) => <span>{index + 1}</span>,
		},
		{
			title: "Tài khoản tạo",
			dataIndex: "reportedByEmail",
			key: "reportedByEmail",
			// width: 200,
			align: "center",
			render: (reportedByEmail) => (
				<a
					href={`mailto:${reportedByEmail}`}
					style={{ color: "inherit", textDecoration: "none" }}
				>
					{reportedByEmail}
				</a>
			),
		},
		{
			title: "Tài khoản bị tố cáo",
			dataIndex: "reportedOnEmail",
			key: "reportedOnEmail",
			// width: 200,
			align: "center",
			render: (reportedOnEmail) => (
				<a
					href={`mailto:${reportedOnEmail}`}
					style={{ color: "inherit", textDecoration: "none" }}
				>
					{reportedOnEmail}
				</a>
			),
		},
		{
			title: "Loại tố cáo",
			dataIndex: "reportType",
			key: "reportType",
			// width: 200,
			align: "center",
			render: (value) => (
				<>
					{value === "Restaurant" ? (
						<span>Tố cáo nhà hàng</span>
					) : value === "Feedback" 
						? <span> Tố cáo về phản hồi </span>
						: <span> Tố cáo về đơn hàng </span>
					}
				</>
			),
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			// width: 150,
			align: "center",
			sorter: (a, b) =>
				dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
			render: (value) => (
				<>
					<span>Ngày: {dayjs(value).format("DD-MM-YYYY")}</span>
				</>
			),
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
			align: "center",
			// width: 120,
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (value) => (
				<div className="fw-500">
					{value === "Active" ? (
						<div className="Active">Chờ xử lý</div>
					) : (
						<div>Đã xử lý</div>
					)}
				</div>
			),
		},
		{
			title: "",
			dataIndex: "a",
			key: "a",
			align: "center",
			render: (_, record) => (
				<div className="fw-500">
					{
						record?.status === 'Active'
							? <Button className="xu-ly" shape="round" type="primary" onClick={() => setOpenModalHandleReport(record)}>
								Xử lý
							</Button>
							: <Button shape="round" type="primary" disabled>
								Đã xử lý
							</Button>
					}
					
				</div>
			),
		},
	];

	return (
		<AdminLayout>
			<ManageReportContainer>
				<SpinCustom spinning={loading}>
					<div>
						<div className="d-flex align-items-center justify-content-space-between">
							<div className="fs-20 fw-500">Báo cáo</div>
							<div className="d-flex">
								<div className="pr-40 select">
									<Select
										className="nice-select w-100"
										allowClear
										placeholder="Loại báo cáo"
										// defaultValue="Withdraw"
										onChange={(e) => setType(e)}
									>
										<Option key={1} value="Restaurant">
											Báo cáo nhà hàng
										</Option>
										<Option key={2} value="Feedback">
											Báo cáo phản hồi
										</Option>
										<Option key={3} value="Order">
											Báo cáo đơn hàng
										</Option>
									</Select>
								</div>
							</div>
						</div>
						<div className="mt-30">
							<Table
								columns={columns}
								dataSource={reports}
								pagination={{ pageSize: 8 }}
								// bordered
							/>
						</div>
					</div>
				</SpinCustom>

				{
					!!openModalHandleReport && (
						<ModalHandleReport
							open={openModalHandleReport}
							onCancel={() => setOpenModalHandleReport(false)}
							onOk={getReports}
						/>
					)
				}
			</ManageReportContainer>
		</AdminLayout>
	);
};

export default ManageReport;
