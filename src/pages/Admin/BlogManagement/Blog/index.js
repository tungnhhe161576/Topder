import {
	Button,
	Col,
	Form,
	Input,
	message,
	Modal,
	Row,
	Table,
	Switch,
	Select,
	Upload,
} from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BlogContainer } from "./styled";

const { Option } = Select;

const Blog = () => {
	const [isAddModalVisible, setIsAddModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [formAdd] = Form.useForm();
	const [formEdit] = Form.useForm();
	const [dataSource, setDataSource] = useState([]);
	const [editingBlog, setEditingBlog] = useState(null);
	const [searchType, setSearchType] = useState("");
	const [searchTitle, setSearchTitle] = useState("");

	const blogTypes = [
		"Công nghệ",
		"Giải trí",
		"Du lịch",
		"Ẩm thực",
		"Sức khỏe",
		"Giáo dục",
		"Khoa học",
		"Thể thao",
		"Thời trang",
		"Nhà ở",
	];

	const renderBlogTypes = () => {
		return blogTypes.map((type) => (
			<Option key={type} value={type}>
				{type}
			</Option>
		));
	};

	const initialDataSource = [
		{
			key: 1,
			bloggroupId: "Công nghệ",
			image: "https://via.placeholder.com/50",
			title: "Bài viết về React",
			name: "Nguyễn Văn A",
			createdDate: "2024-11-01",
			status: true,
			content: "Nội dung bài viết về React.",
		},
		{
			key: 2,
			bloggroupId: "Giải trí",
			image: "https://via.placeholder.com/50",
			title: "Bài viết về Game",
			name: "Trần Thị B",
			createdDate: "2024-11-02",
			status: false,
			content: "Nội dung bài viết về Game.",
		},
		{
			key: 3,
			bloggroupId: "Du lịch",
			image: "https://via.placeholder.com/50",
			title: "Bài viết về các điểm đến",
			name: "Lê Văn C",
			createdDate: "2024-11-03",
			status: true,
			content: "Nội dung bài viết về các điểm đến.",
		},
		{
			key: 4,
			bloggroupId: "Ẩm thực",
			image: "https://via.placeholder.com/50",
			title: "Bài viết về ẩm thực Việt",
			name: "Phạm Thị D",
			createdDate: "2024-11-04",
			status: false,
			content: "Nội dung bài viết về ẩm thực Việt.",
		},
		{
			key: 5,
			bloggroupId: "Sức khỏe",
			image: "https://via.placeholder.com/50",
			title: "Bài viết về dinh dưỡng",
			name: "Ngô Văn E",
			createdDate: "2024-11-05",
			status: true,
			content: "Nội dung bài viết về dinh dưỡng.",
		},
		{
			key: 6,
			bloggroupId: "Giáo dục",
			image: "https://via.placeholder.com/50",
			title: "Bài viết về học tập",
			name: "Trương Thị F",
			createdDate: "2024-11-06",
			status: false,
			content: "Nội dung bài viết về học tập.",
		},
		{
			key: 7,
			bloggroupId: "Khoa học",
			image: "https://via.placeholder.com/50",
			title: "Bài viết về nghiên cứu",
			name: "Đinh Văn G",
			createdDate: "2024-11-07",
			status: true,
			content: "Nội dung bài viết về nghiên cứu.",
		},
		{
			key: 8,
			bloggroupId: "Thể thao",
			image: "https://via.placeholder.com/50",
			title: "Bài viết về bóng đá",
			name: "Bùi Thị H",
			createdDate: "2024-11-08",
			status: false,
			content: "Nội dung bài viết về bóng đá.",
		},
		{
			key: 9,
			bloggroupId: "Thời trang",
			image: "https://via.placeholder.com/50",
			title: "Bài viết về thời trang mùa đông",
			name: "Vũ Văn I",
			createdDate: "2024-11-09",
			status: true,
			content: "Nội dung bài viết về thời trang.",
		},
		{
			key: 10,
			bloggroupId: "Nhà ở",
			image: "https://via.placeholder.com/50",
			title: "Bài viết về thiết kế nội thất",
			name: "Nguyễn Thị J",
			createdDate: "2024-11-10",
			status: false,
			content: "Nội dung bài viết về thiết kế nội thất.",
		},
	];

	const columns = [
		{
			title: "Loại Blog",
			dataIndex: "bloggroupId",
			key: "bloggroupId",
		},
		{
			title: "Ảnh",
			dataIndex: "image",
			key: "image",
			render: (text) => (
				<img src={text} alt="Blog" style={{ width: 50 }} />
			),
		},
		{
			title: "Tiêu đề",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Người tạo",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdDate",
			key: "createdDate",
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			render: (text, record) => (
				<Switch
					checked={text}
					onChange={(checked) => {
						setDataSource((prev) =>
							prev.map((item) =>
								item.key === record.key
									? { ...item, status: checked }
									: item
							)
						);
					}}
				/>
			),
		},
		{
			title: "",
			dataIndex: "",
			key: "action",
			render: (text, record) => (
				<div style={{ display: "flex", gap: "15px" }}>
					{" "}
					<Button
						style={{ height: 40 }}
						type="primary"
						onClick={() => handleEdit(record)}
					>
						Chỉnh sửa
					</Button>
					<Button
						style={{ height: 40 }}
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
			bloggroupId: record.bloggroupId,
			image: [
				{
					uid: "-1",
					name: "image.png",
					status: "done",
					url: record.image,
				},
			],
			title: record.title,
			content: record.content,
			status: record.status,
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
				status: true,
				content: values.content,
				bloggroupId: values.bloggroupId,
				title: values.title,
				image: values.image[0] || "https://via.placeholder.com/50",
				name: "Admin",
				createdDate: new Date().toLocaleDateString(),
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

	const filteredDataSource = dataSource.filter((item) => {
		return (
			(item.bloggroupId.includes(searchType) || searchType === "") &&
			(item.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
				searchTitle === "")
		);
	});
	const handleSearchByType = () => {
		// Logic to filter by type (if needed)
	};

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
							<label>Loại Blog</label>
							<Select
								style={{ width: 200, marginRight: 10 }}
								placeholder="Tìm theo loại blog"
								onChange={(value) => setSearchType(value)}
							>
								{renderBlogTypes()}
							</Select>
							<Button
								className="btn"
								type="primary"
								onClick={handleSearchByType}
							>
								Tìm Kiếm Theo Loại
							</Button>
						</Col>
						<Col>
							<label>Tiêu đề</label>
							<Input
								placeholder="Tìm theo tiêu đề"
								style={{ width: 200, marginLeft: 10 }}
								onChange={(e) => setSearchTitle(e.target.value)}
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
					dataSource={filteredDataSource}
					columns={columns}
					rowKey="key"
					pagination={{ pageSize: 4 }}
				/>

				<Modal
					title="Thêm Blog"
					visible={isAddModalVisible}
					onOk={handleAddOk}
					onCancel={handleAddCancel}
					okText="Thêm"
					cancelText="Hủy"
					width={1000}
				>
					<Form form={formAdd} layout="vertical">
						<Row gutter={[24, 16]}>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									name="bloggroupId"
									label="Loại Blog"
									rules={[
										{
											required: true,
											message: "Vui lòng chọn loại blog!",
										},
									]}
								>
									<Select placeholder="Chọn loại blog">
										{renderBlogTypes()}
									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									name="image"
									label="Ảnh"
									valuePropName="fileList"
									getValueFromEvent={(e) => e && e.fileList}
								>
									<Upload
										action="/upload"
										listType="picture"
										beforeUpload={() => false}
									>
										<Button icon={<UploadOutlined />}>
											Chọn ảnh
										</Button>
									</Upload>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[24, 16]}>
							<Col xs={24}>
								<Form.Item
									name="title"
									label="Tiêu đề"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập tiêu đề!",
										},
									]}
								>
									<Input placeholder="Nhập tiêu đề" />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[24, 16]}>
							<Col xs={24}>
								<Form.Item
									name="content"
									label="Nội dung"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập nội dung!",
										},
									]}
								>
									<ReactQuill
										style={{
											width: "100%",
											minHeight: "400px", // Thay đổi chiều cao nếu cần
											border: "1px solid #d9d9d9", // Thêm border nếu muốn
										}}
									/>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Modal>

				<Modal
					title="Chỉnh Sửa Blog"
					visible={isEditModalVisible}
					onOk={handleEditOk}
					onCancel={handleEditCancel}
					okText="Chỉnh sửa"
					cancelText="Hủy"
					width={1000}
				>
					<Form form={formEdit} layout="vertical">
						<Row gutter={[24, 16]}>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									name="bloggroupId"
									label="Loại Blog"
									rules={[
										{
											required: true,
											message: "Vui lòng chọn loại blog!",
										},
									]}
								>
									<Select placeholder="Chọn loại blog">
										{renderBlogTypes()}
									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									name="image"
									label="Ảnh"
									valuePropName="fileList"
									getValueFromEvent={(e) => e && e.fileList}
								>
									<Upload
										action="/upload"
										listType="picture"
										beforeUpload={() => false}
									>
										<Button icon={<UploadOutlined />}>
											Chọn ảnh
										</Button>
									</Upload>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[24, 16]}>
							<Col xs={24}>
								<Form.Item
									name="title"
									label="Tiêu đề"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập tiêu đề!",
										},
									]}
								>
									<Input placeholder="Nhập tiêu đề" />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[24, 16]}>
							<Col xs={24}>
								<Form.Item
									name="content"
									label="Nội dung"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập nội dung!",
										},
									]}
								>
									<ReactQuill style={{ width: "100%" }} />
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Modal>
			</div>
		</BlogContainer>
	);
};

export default Blog;
