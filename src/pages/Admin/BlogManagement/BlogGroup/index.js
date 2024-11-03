import { Button, Col, Form, Input, message, Modal, Row, Table } from "antd";
import { BlogContainer } from "../Blog/styled";
import { useEffect, useState } from "react";

const BlogGroup = () => {
	const [isAddModalVisible, setIsAddModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [formAdd] = Form.useForm();
	const [formEdit] = Form.useForm();
	const [dataSource, setDataSource] = useState([]);
	const [editingBlog, setEditingBlog] = useState(null);
	//const [searchTitle, setSearchTitle] = useState("");

	const initialDataSource = [
		{
			key: 1,
			bloggroupName: "Công nghệ",
		},
		{
			key: 2,
			bloggroupName: "Công nghệ",
		},
		{
			key: 3,
			bloggroupName: "Công nghệ",
		},
		{
			key: 4,
			bloggroupName: "Công nghệ",
		},
	];

	const columns = [
		{
			title: "Loại Blog",
			dataIndex: "bloggroupName",
			key: "bloggroupName",
		},
		{
			title: "Hành Động",
			dataIndex: "",
			key: "action",
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
						onClick={() => handleEdit(record)}
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
						onClick={() => handleDelete(record.key)}
					>
						Xóa
					</Button>
				</div>
			),
		},
	];
	const showAddModal = () => {
		setIsAddModalVisible(true);
		formAdd.resetFields();
	};

	const handleEdit = (record) => {
		setEditingBlog(record);
		formEdit.setFieldsValue({
			bloggroupName: record.bloggroupName,
		});
		setIsEditModalVisible(true);
	};

	const handleDelete = (key) => {
		setDataSource((prev) => prev.filter((item) => item.key !== key));
		message.success("Xóa blog thành công!");
	};

	const handleAddOk = async () => {
		try {
			const values = await formAdd.validateFields();
			const newBlog = {
				key: Date.now(),
				bloggroupName: values.bloggroupName,
			};
			setDataSource((prev) => [...prev, newBlog]);
			setIsAddModalVisible(false);
			message.success("Thêm blog thành công!");
		} catch (err) {
			console.error(err);
		}
	};

	const handleEditOk = async () => {
		try {
			const values = await formEdit.validateFields();
			setDataSource((prev) =>
				prev.map((item) =>
					item.key === editingBlog.key ? { ...item, ...values } : item
				)
			);
			setIsEditModalVisible(false);
			message.success("Chỉnh sửa blog thành công!");
		} catch (err) {
			console.error(err);
		}
	};

	const handleAddCancel = () => {
		setIsAddModalVisible(false);
	};

	const handleEditCancel = () => {
		setIsEditModalVisible(false);
	};

	useEffect(() => {
		setDataSource(initialDataSource);
	}, []);

	const handleSearchByTitle = () => {
		// Logic to filter by title (if needed)
	};

	return (
		<BlogContainer>
			<div>
				<div>
					<Row
						justify="center"
						gutter={[16, 16]}
						className="search-container"
					>
						<Col>
							<label>Tiêu đề</label>
							<Input
								placeholder="Tìm theo tiêu đề"
								style={{ width: 200, marginLeft: 10 }}
								//onChange={(e) => setSearchTitle(e.target.value)}
							/>
							<Button
								className="btn"
								type="primary"
								style={{ marginLeft: 10 }}
								onClick={handleSearchByTitle}
							>
								Tìm Kiếm
							</Button>
						</Col>
					</Row>
				</div>
				<div
					style={{
						marginBottom: "20px",
						textAlign: "right",
					}}
				>
					<Button
						type="primary"
						style={{ height: 40 }}
						onClick={showAddModal}
					>
						Thêm Blog
					</Button>
				</div>
				<Table
					dataSource={dataSource}
					columns={columns}
					rowKey="key"
					pagination={{ pageSize: 4 }}
				/>

				<Modal
					title="Thêm Loại Blog"
					visible={isAddModalVisible}
					onOk={handleAddOk}
					onCancel={handleAddCancel}
					okText="Thêm"
					cancelText="Hủy"
					width={600}
				>
					<Form form={formAdd} layout="vertical">
						<Row gutter={[24, 16]}>
							<Col xs={24}>
								<Form.Item
									name="bloggroupName"
									label="Loại Blog"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập loại blog",
										},
									]}
								>
									<Input placeholder="Nhập loại blog" />
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Modal>

				<Modal
					title="Chỉnh Sửa Loại Blog"
					visible={isEditModalVisible}
					onOk={handleEditOk}
					onCancel={handleEditCancel}
					okText="Chỉnh sửa"
					cancelText="Hủy"
					width={600}
				>
					<Form form={formEdit} layout="vertical">
						<Row gutter={[24, 16]}>
							<Col xs={24}>
								<Form.Item
									name="bloggroupName"
									label="Loại Blog"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập loại blog",
										},
									]}
								>
									<Input placeholder="Nhập loại blog" />
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Modal>
			</div>
		</BlogContainer>
	);
};
export default BlogGroup;
