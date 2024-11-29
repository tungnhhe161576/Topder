import SpinCustom from "../../../../components/Common/SpinCustom";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import { AccountManagerContainer } from "./styled";
import { useState } from "react";
import ModalBanAccount from "./Modal/ModalBanAccount";

const CustomerAccount = ({ loading, accounts, getAccount }) => {
	const [openModalBanAccount, setOpenModalBanAccount] = useState(false);

	const columns = [
		{
			title: "STT",
			dataIndex: "number",
			key: "number",
			align: "center",
			render: (_, __, index) => (
				<span className="fs-15"> {index + 1} </span>
			),
		},
		{
			title: "Tên",
			dataIndex: "name",
			key: "name",
			align: "center",
			width: 150,
		},
		{
			title: "Ảnh",
			dataIndex: "image",
			key: "image",
			align: "center",
			render: (text) => <img src={text} alt="Blog" width="100px" />,
		},
		{
			title: "Ngày sinh",
			dataIndex: "dob",
			key: "dob",
			width: 150,
			align: "center",
			render: (value) => (
				<span> {dayjs(value).format("DD-MM-YYYY")} </span>
			),
		},
		{
			title: "Số điện thoại",
			dataIndex: "phone",
			key: "phone",
			width: 150,
			align: "center",
			render: (value) => (
				<span>
					{" "}
					<a
						href={`tel:${value}`}
						style={{
							color: "inherit",
							textDecoration: "none",
						}}
					>
						{value}
					</a>{" "}
				</span>
			),
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			width: 150,
			align: "center",
			render: (email) => (
				<a
					href={`mailto:${email}`}
					style={{ color: "inherit", textDecoration: "none" }}
				>
					{email}
				</a>
			),
		},
		{
			title: "Giới tính",
			dataIndex: "gender",
			key: "gender",
			width: 150,
			align: "center",
			render: (value) => (
				<span>
					{" "}
					{value === "Male"
						? "Nam"
						: value === "Female"
						? "Nữ"
						: "Khác"}{" "}
				</span>
			),
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (value, record) => (
				<div className="d-flex justify-content-center align-items-center">
					{value === "Active" ? (
						<div className="unban">Hoạt động</div>
					) : (
						<div className="ban">Vô hiệu hóa</div>
					)}
				</div>
			),
		},
		{
			title: "",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (value, record) => (
				<div className="d-flex">
					{value === "Active" ? (
						<Button
							type="primary"
							shape="round"
							className="mr-3"
							onClick={() => setOpenModalBanAccount(record)}
						>
							Khóa tài khoản
						</Button>
					) : (
						<Button
							type="primary"
							shape="round"
							className="mr-3"
							onClick={() => setOpenModalBanAccount(record)}
						>
							Mở tài khoản
						</Button>
					)}
				</div>
			),
		},
	];

	return (
		<AccountManagerContainer>
			<div className="mt-20 ml-30 fw-500 fs-20">
				Các tài khoản người dùng
			</div>
			<div className="mt-20">
				<SpinCustom spinning={loading}>
					<Table
						dataSource={accounts.filter(
							(i) => i.role === "Customer"
						)}
						columns={columns}
						rowKey="key"
						pagination={{ pageSize: 5 }}
					/>
				</SpinCustom>
			</div>

			{!!openModalBanAccount && (
				<ModalBanAccount
					open={openModalBanAccount}
					onCancel={() => setOpenModalBanAccount(false)}
					onOk={getAccount}
				/>
			)}
		</AccountManagerContainer>
	);
};

export default CustomerAccount;
