import { useEffect, useState } from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import { ContactManagementContainer } from "./styled";
import SpinCustom from "../../../components/Common/SpinCustom";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import AdminService from "../../../services/AdminService";
import ModalDeleteContact from "./Modal/ModalDeleteContact";

const ContactManagement = () => {
	const [loading, setLoading] = useState(false);
	const [openModalDeleteContact, setOpenModalDeleteContact] = useState(false);
	// const [openModalUpdateContact, setOpenModalUpdateContact] = useState(false)
	const [contacts, setContacts] = useState([]);

	const getAllContact = async () => {
		try {
			setLoading(true);
			const res = await AdminService.getAllContact();
			setContacts(res?.items);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getAllContact();
	}, []);

	const columns = [
		{
			title: "STT",
			dataIndex: "number",
			key: "number",
			render: (_, __, index) => (
				<span className="fs-15"> {index + 1} </span>
			),
		},
		{
			title: "Thể loại",
			dataIndex: "topic",
			key: "topic",
			render: (value) => (
				<span className="fs-15">
					{" "}
					{value === "RestaurantRegister"
						? "Đăng ký nhà hàng"
						: "Khác"}{" "}
				</span>
			),
		},
		{
			title: "Người tạo",
			dataIndex: "name",
			key: "name",
			width: 150,
		},
		{
			title: "Ngày tạo",
			dataIndex: "contactDate",
			key: "contactDate",
			width: 150,
			render: (value) => (
				<span> {dayjs(value).format("DD-MM-YYYY")} </span>
			),
		},
		{
			title: "Số điện thoại",
			dataIndex: "phone",
			key: "phone",
			width: 150,
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
			title: "Nội dung",
			dataIndex: "content",
			key: "content",
			render: (value) => <span>{value}</span>,
		},
		{
			title: "",
			dataIndex: "",
			key: "action",
			render: (text, record) => (
				<div className="d-flex">
					{/* <Button
						type="primary"
						shape="round"
						className="mr-3"
						onClick={() => setOpenModalUpdateContact(record)}
					>
						Cập nhật
					</Button> */}
					<Button
						type="primary"
						shape="round"
						danger
						onClick={() => setOpenModalDeleteContact(record)}
					>
						Xóa
					</Button>
				</div>
			),
		},
	];

	return (
		<AdminLayout>
			<ContactManagementContainer>
				<div>
					<div className="mt-20 ml-30 fw-500 fs-20">
						Các tài khoản người dùng
					</div>
					<div className="mt-20">
						<SpinCustom spinning={loading}>
							<Table
								dataSource={contacts}
								columns={columns}
								rowKey="key"
								pagination={{ pageSize: 4 }}
							/>
						</SpinCustom>
					</div>
				</div>
			</ContactManagementContainer>

			{!!openModalDeleteContact && (
				<ModalDeleteContact
					open={openModalDeleteContact}
					onCancel={() => setOpenModalDeleteContact(false)}
					onOk={getAllContact}
				/>
			)}
		</AdminLayout>
	);
};

export default ContactManagement;
