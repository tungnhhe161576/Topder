import {
	Button,
	Col,
	Form,
	Image,
	Input,
	InputNumber,
	message,
	Row,
	Select,
	Upload,
} from "antd";
import CustomModal from "../../../../../../../components/Common/ModalCustom";
import UserService from "../../../../../../../services/UserService";
import ImageService from "../../../../../../../services/ImageService";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { CameraOutlined } from "@ant-design/icons";
const { Option } = Select;

const ModalUpdateMenu = ({ open, onCancel, onOk, userId }) => {
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [image, setImage] = useState(null);
	const [form] = Form.useForm();

	const getAllCategories = async () => {
		try {
			const res = await UserService.getAllCategoryMenu(userId);
			setCategories(res);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAllCategories();
	}, []);

	useEffect(() => {
		form.setFieldsValue({
			...open,
		});
		setImage(open.image);
	}, [open, form]);

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

	const handleUpdateMenu = async () => {
		try {
			setLoading(true);
			const formValues = await form.validateFields();
			console.log(formValues);
			let url = "";
			if (formValues.image.file) {
				const file = formValues.image.file;
				const formData = new FormData();
				formData.append("file", file);
				const getImage = await ImageService.uploadImage(formData);
				setImage(getImage.url);
				url = getImage.url;
			}

			await UserService.updateMenu({
				...formValues,
				restaurantId: userId,
				menuId: open?.menuId,
				image: url,
			});
			message.open({
				content: "Cập nhật món ăn thành công!",
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});
			onOk();
			onCancel();
		} catch (error) {
			message.open({
				content: "Cập nhật món ăn thất bại!",
				type: "error",
				style: {
					marginTop: "10vh",
				},
			});
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
					onClick={() => handleUpdateMenu()}
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
			width={800}
			// style={{marginTop: '200px'}}
		>
			<div className="title-type-1">Cập nhật món ăn</div>
			<div className="mt-20">
				<Form form={form} layout="vertical">
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item
								name="categoryMenuId"
								label={
									<span className="fs-17 fw-600 d-flex justify-content-start">
										Loại món ăn
									</span>
								}
								rules={[
									{
										required: true,
										message: "Vui lòng chọn loại món ăn!",
									},
								]}
							>
								<Select
									allowClear
									placeholder="Chọn loại món ăn"
								>
									{categories.map((i) => (
										<Option
											key={i?.categoryMenuId}
											value={i?.categoryMenuId}
										>
											{i?.categoryMenuName}
										</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item
								name="dishName"
								label={
									<span className="fs-17 fw-600 d-flex justify-content-start">
										Tên món ăn
									</span>
								}
								rules={[
									{
										required: true,
										message: "Vui lòng đặt tên món ăn!",
									},
								]}
							>
								<Input placeholder="Tên món ăn" />
							</Form.Item>

							<Form.Item
								name="price"
								label={
									<span className="fs-17 fw-600 d-flex justify-content-start">
										Giá tiền
									</span>
								}
								rules={[
									{
										required: true,
										message: "Vui lòng chọn giá tiền!",
									},
								]}
							>
								<InputNumber
									placeholder="Giá tiền"
									min={0}
									className="w-100"
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<div className="w-70 m-auto">
								<Image src={image} alt="image" />
								<Form.Item name="image" className="m-0 p-0">
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
							{image !== open?.image ? (
								<div className="d-flex justify-content-center mt-15">
									<Button
										onClick={() => setImage(open?.image)}
										className="fs-12 fw-500 white out-image"
										style={{
											backgroundColor: "gray",
											border: "none",
										}}
										shape="round"
									>
										Thoát
									</Button>
								</div>
							) : (
								<></>
							)}
						</Col>
						<Col span={24}>
							<Form.Item
								name="description"
								label={
									<span className="fs-17 fw-600 d-flex justify-content-start">
										Mô tả
									</span>
								}
							>
								<TextArea rows={4} placeholder="Mô tả món ăn" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>
		</CustomModal>
	);
};

export default ModalUpdateMenu;
