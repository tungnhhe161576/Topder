import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
	Button,
	Col,
	Form,
	Image,
	Input,
	message,
	Row,
	Select,
	Upload,
} from "antd";
import { CameraOutlined } from "@ant-design/icons";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import AdminService from "../../../../../../services/AdminService";
import ImageService from "../../../../../../services/ImageService";
const { Option } = Select;

const ModalCreateBlog = ({ open, onCancel, onOk, blogCategory }) => {
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [content, setContent] = useState("");
	const [form] = Form.useForm();

	const handleBeforeUpload = (file) => {
		const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
		const isAllowedType = allowedImageTypes.includes(file.type);
		if (!isAllowedType) {
			message.open({
				content:
					"Vui lòng chọn file hình ảnh đúng định dạng (JPG, PNG, GIF).",
				type: "error",
				style: {
					marginTop: "10vh",
				},
			});
		} else {
			setImage(URL.createObjectURL(file));
		}
		return isAllowedType ? false : Upload.LIST_IGNORE;
	};

	const handleEditorChange2 = (newContent) => {
		setContent(newContent);
	};

	const handleCreateBlog = async () => {
		try {
			setLoading(true);
			const formValues = await form.validateFields();
			const file = formValues.image.file;
			const formData = new FormData();
			formData.append("file", file);
			const getImage = await ImageService.uploadImage(formData);
			setImage(getImage.url);

			await AdminService.createBlog({
				...formValues,
				adminId: 1,
				imageFile: null,
				image: getImage.url,
				content: content,
			});
			message.open({
				content: "Tạo bài viết bàn thành công!",
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});
			onOk();
			onCancel();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const footer = () => {
		return (
			<div className="d-flex justify-content-center">
				<Button
					className="mr-10 fw-600"
					shape="round"
					onClick={() => onCancel()}
				>
					Đóng
				</Button>
				<Button
					className="mr-10 fw-600"
					type="primary"
					shape="round"
					onClick={() => handleCreateBlog()}
					loading={loading}
				>
					Đồng ý
				</Button>
			</div>
		);
	};

	return (
		<CustomModal
			open={!!open}
			onCancel={onCancel}
			footer={footer}
			width={1000}
			style={{ marginTop: "-70px" }}
		>
			<div className="title-type-1">Tạo bài viết</div>
			<div className="mt-20">
				<Form form={form} layout="vertical">
					<Row gutter={[16, 16]}>
						<Col span={16}>
							<Form.Item
								name="title"
								label="Tên bài viết"
								rules={[
									{
										required: true,
										message: "Vui lòng đặt tên bài viết!",
									},
								]}
							>
								<Input placeholder="Tên bài viết" />
							</Form.Item>

							<Form.Item
								name="bloggroupId"
								label="Loại bài viết"
								rules={[
									{
										required: true,
										message: "Vui lòng chọn loại bài viết!",
									},
								]}
							>
								<Select allowClear placeholder="Loại bài viết">
									{blogCategory?.map((i) => (
										<Option
											key={i?.bloggroupId}
											value={i?.bloggroupId}
										>
											{i?.bloggroupName}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>

						<Col span={8}>
							<div className="w-70 m-auto">
								{!!image ? (
									<Image src={image} alt="image" />
								) : (
									<div className="fs-16 fw-500 gray d-flex justify-content-center">
										{" "}
										Chọn ảnh{" "}
									</div>
								)}
								<Form.Item
									name="image"
									className="m-0 p-0"
									rules={[
										{
											required: true,
											message:
												"Vui lòng chọn ảnh cho bài viết!",
										},
									]}
								>
									<Upload.Dragger
										className="dragger"
										beforeUpload={(file) =>
											handleBeforeUpload(file)
										}
										style={{
											width: "100%",
											height: "150px",
											border: "none",
										}}
										accept="image/*"
										multiple={false}
										maxCount={1}
										fileList={[]}
									>
										<CameraOutlined className="fs-20" />
									</Upload.Dragger>
								</Form.Item>
							</div>
							{/* {
                                image !== open?.image 
                                    ? 
                                        <div className="d-flex justify-content-center mt-15">
                                            <Button 
                                                onClick={() => setImage(open?.image)}
                                                className="fs-12 fw-500 white out-image"
                                                style={{backgroundColor: 'gray', border: 'none'}}
                                                shape="round"
                                            >
                                                Thoát
                                            </Button>
                                        </div>
                                    : <></>
                            } */}
						</Col>

						<Col span={24}>
							<Form.Item name="content" labelCol={0}>
								<div className="pl-20 fw-500 fs-18 mb-10">
									Nội dung bài viết
								</div>
								<Editor
									onEditorChange={handleEditorChange2}
									apiKey="mbse8bnylyttkkcul3b8wf174fumv1dwoe7romoif6cirr9f"
									init={{
										height: 300,
										width: "100%",
										menubar: false,
										plugins: [
											"advlist autolink lists link image charmap print preview anchor",
											"searchreplace visualblocks code fullscreen",
											"insertdatetime media table paste code help wordcount",
										],
										toolbar:
											// eslint-disable-next-line no-multi-str
											"undo redo | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help",
									}}
									initialValue={open?.description}
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>
		</CustomModal>
	);
};

export default ModalCreateBlog;
