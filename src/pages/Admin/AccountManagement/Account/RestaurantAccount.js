import { Button, Table } from "antd";
import SpinCustom from "../../../../components/Common/SpinCustom";
import dayjs from "dayjs";
import { useState } from "react";
import ModalViewDetail from "./Modal/ModalViewDetail";
import ModalBanAccount from "./Modal/ModalBanAccount";
import { AccountManagerContainer } from "./styled";

const RestaurantAccount = ({ loading, accounts, getAccount }) => {
	const [openModalViewDetail, setOpenModalViewDetail] = useState(false);
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
			dataIndex: "nameRes",
			key: "nameRes",
			width: 150,
			align: "center",
		},
		{
			title: "Chủ nhà hàng",
			dataIndex: "nameOwner",
			key: "nameOwner",
			width: 150,
			align: "center",
		},
		{
			title: "Ảnh",
			dataIndex: "logo",
			key: "logo",
			render: (text) => <img src={text} alt="Blog" width="100px" />,
			align: "center",
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			key: "address",
			width: 150,
			align: "center",
			// render: (value) => <span> {dayjs(value).format('DD-MM-YYYY')} </span>
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
			// render: (value, record) => (
			// 	<div className="d-flex">
			// 		{value === 'Active'
			// 			? <Button
			// 				type="primary"
			// 				shape="round"
			// 				className="mr-3"
			// 				onClick={() => setOpenModalBanAccount(record)}
			// 			>
			// 				Khóa tài khoản
			// 			</Button>
			// 			: <Button
			// 				type="primary"
			// 				shape="round"
			// 				className="mr-3"
			// 				onClick={() => setOpenModalBanAccount(record)}
			// 			>
			// 				Mở tài khoản
			// 			</Button>
			// 		}
			// 	</div>
			// ),
		},
		{
			title: "",
			dataIndex: "",
			key: "action",
			align: "center",
			render: (value, record) => (
				<div className="d-flex flex-column align-items-center">
					<div className="d-flex mb-3">
						<Button
							type="primary"
							shape="round"
							className="mr-3"
							onClick={() => setOpenModalViewDetail(record)}
						>
							Chi tiết
						</Button>
					</div>
					<div className="d-flex">
						{record?.status === "Active" ? (
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
				</div>
			),
		},
	];

	return (
		<AccountManagerContainer>
			<div className="mt-20 ml-30 fw-500 fs-20">Các nhà hàng</div>
			<div className="mt-20">
				<SpinCustom spinning={loading}>
					<Table
						dataSource={accounts.filter(
							(i) => i.role === "Restaurant"
						)}
						columns={columns}
						rowKey="key"
						pagination={{ pageSize: 5 }}
					/>
				</SpinCustom>
			</div>

			{!!openModalViewDetail && (
				<ModalViewDetail
					open={openModalViewDetail}
					onCancel={() => setOpenModalViewDetail(false)}
				/>
			)}
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

export default RestaurantAccount;
