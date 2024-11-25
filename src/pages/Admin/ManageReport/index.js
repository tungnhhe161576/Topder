import { Button, Table } from "antd";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import { ManageReportContainer } from "./styled";
import dayjs from "dayjs";
import SpinCustom from "../../../components/Common/SpinCustom";
import { useEffect, useState } from "react";
import AdminService from "../../../services/AdminService";

const ManageReport = () => {
    const [loading, setLoading] = useState(false)
    const [reports, setReports] = useState([])

    const getReports = async () => {
        try {
            setLoading(true)
            const res = await AdminService.getListReport()
            setReports(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getReports()
    }, [])

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
		},
		{
			title: "Tài khoản bị tố cáo",
			dataIndex: "reportedOnEmail",
			key: "reportedOnEmail",
			// width: 200,
			align: "center",
		},
		{
			title: "Loại tố cáo",
			dataIndex: "reportType",
			key: "reportType",
			// width: 200,
			align: "center",
            render: (value) => (
				<>
                    {
                      value === 'Restaurant' 
                        ?    
                            <span>
                                Tố cáo nhà hàng
                            </span>
                        : <span></span>
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
					<span>
						Ngày: {dayjs(value).format("DD-MM-YYYY")}
					</span>
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
					) : <div>Đã xử lý</div>}
				</div>
			),
		},
		{
			title: "",
			dataIndex: "a",
			key: "a",
			align: "center",
			render: (value) => (
				<div className="fw-500">
					<Button className="xu-ly" shape="round" type="primary">Xử lý</Button>
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
								{/* <div className="pr-40 select">
									<Select
										className="nice-select w-100"
										allowClear
										placeholder="Loại giao dịch"
										defaultValue="Withdraw"
										onChange={(e) => setType(e)}
									>
										<Option key={1} value="Withdraw">
											Rút tiền
										</Option>
										<Option key={2} value="Recharge">
											Nạp tiền
										</Option>
										<Option key={3} value="SystemSubtract">
											Hệ thống trừ tiền
										</Option>
										<Option key={3} value="SystemAdd">
											Hệ thống cộng tiền
										</Option>
									</Select>
								</div> */}
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
            </ManageReportContainer>
        </AdminLayout>
    );
}
 
export default ManageReport;