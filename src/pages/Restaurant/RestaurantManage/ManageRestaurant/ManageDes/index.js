import { useSelector } from "react-redux";
import { ManageDesContainer } from "./styled";
import { userInfor } from "../../../../../redux/Slice/userSlice";
import { Button, Col, Form, Input, Modal, Row, Table } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

const ManageDescription = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	// Lấy dữ liệu từ Redux store
	const user = useSelector(userInfor);
	const { description, subdescription } = user;
	const [dataSource, setDataSource] = useState([
		{
			key: "1",
			type: "Sub-Description",
			content: subdescription || "Chưa có nội dung",
		},
		{
			key: "2",
			type: "Description",
			content: description || "Chưa có nội dung",
		},
	]);
	// Hiển thị modal
	const showModal = () => {
		form.setFieldsValue({
			subdescription: subdescription,
			description: description,
		});
		setIsModalVisible(true);
	};

	const handleOk = () => {
		form.validateFields()
			.then((values) => {
				setDataSource([
					{
						key: "1",
						type: "Sub-Description",
						content: values.subdescription,
					},
					{
						key: "2",
						type: "Description",
						content: values.description,
					},
				]);
				setIsModalVisible(false);
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const columns = [
		{
			title: "Loại Mô Tả",
			dataIndex: "type",
			key: "type",
			width: "30%",
		},
		{
			title: "Nội Dung",
			dataIndex: "content",
			key: "content",
			render: (text) => (
				<div dangerouslySetInnerHTML={{ __html: text }} /> // Để hiển thị nội dung HTML
			),
		},
	];
	return (
		<ManageDesContainer>
			<div style={{ marginBottom: "20px", textAlign: "right" }}>
				<Button
					type="primary"
					style={{ height: 40 }}
					onClick={showModal}
				>
					Sửa Mô Tả
				</Button>
			</div>

			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={false}
			/>
			<Modal
				title="Sửa Mô Tả"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				width={1000}
				okText="Chỉnh sửa"
				cancelText="Hủy"
			>
				<Form form={form} layout="vertical">
					<Form.Item
						label="Sub-Description (Mô Tả Phụ)"
						name="subdescription"
					>
						<Editor
							apiKey="eo23i4oc3aozl672qtjh52pkp0tlyn0f9ie4k97himelpc1l"
							init={{
								plugins: [
									// Core editing features
									"anchor",
									"autolink",
									"charmap",
									"codesample",
									"emoticons",
									"image",
									"link",
									"lists",
									"media",
									"searchreplace",
									"table",
									"visualblocks",
									"wordcount",
									"mediaembed",
									"casechange",
									"export",
									"formatpainter",
									"pageembed",
									"a11ychecker",
									"tinymcespellchecker",
									"permanentpen",
									"powerpaste",
									"advtable",
									"advcode",
									"editimage",
									"advtemplate",
									"ai",
									"mentions",
									"tinycomments",
									"tableofcontents",
									"footnotes",
									"mergetags",
									"autocorrect",
									"typography",
									"inlinecss",
									"markdown",
								],
								toolbar:
									"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
								tinycomments_mode: "embedded",
								tinycomments_author: "Author name",
								mergetags_list: [
									{
										value: "First.Name",
										title: "First Name",
									},
									{ value: "Email", title: "Email" },
								],
								ai_request: (request, respondWith) =>
									respondWith.string(() =>
										Promise.reject(
											"See docs to implement AI Assistant"
										)
									),
							}}
							initialValue="Welcome to TinyMCE!"
						/>
					</Form.Item>

					<Form.Item
						label="Description (Mô Tả Chính)"
						name="description"
					>
						<Editor
							apiKey="eo23i4oc3aozl672qtjh52pkp0tlyn0f9ie4k97himelpc1l"
							init={{
								plugins: [
									"anchor",
									"autolink",
									"charmap",
									"codesample",
									"emoticons",
									"image",
									"link",
									"lists",
									"media",
									"searchreplace",
									"table",
									"visualblocks",
									"wordcount",
									"checklist",
									"mediaembed",
									"casechange",
									"export",
									"formatpainter",
									"pageembed",
									"a11ychecker",
									"tinymcespellchecker",
									"permanentpen",
									"powerpaste",
									"advtable",
									"advcode",
									"editimage",
									"advtemplate",
									"ai",
									"mentions",
									"tinycomments",
									"tableofcontents",
									"footnotes",
									"mergetags",
									"autocorrect",
									"typography",
									"inlinecss",
									"markdown",
								],
								toolbar:
									"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
								tinycomments_mode: "embedded",
								tinycomments_author: "Author name",
								mergetags_list: [
									{
										value: "First.Name",
										title: "First Name",
									},
									{ value: "Email", title: "Email" },
								],
								ai_request: (request, respondWith) =>
									respondWith.string(() =>
										Promise.reject(
											"See docs to implement AI Assistant"
										)
									),
							}}
							initialValue="Welcome to TinyMCE!"
						/>
					</Form.Item>
				</Form>
			</Modal>
		</ManageDesContainer>
	);
};

export default ManageDescription;
