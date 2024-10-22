import React, { useState, useEffect } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImageService from "../../../../../../services/ImageService";

const EditImageModal = ({ visible, onCancel, onEdit, currentImage }) => {
	const [image, setImage] = useState(currentImage);
	const [fileList, setFileList] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setImage(currentImage);
		setFileList([]);
	}, [currentImage]);

	const handleImageUpload = ({ file, fileList }) => {
		setFileList(fileList);

		if (file.status === "done") {
			const newImageUrl = URL.createObjectURL(file.originFileObj);
			setImage(newImageUrl);
		}

		if (file.status === "removed") {
			if (fileList.length === 0) {
				setImage(currentImage);
			}
		}
	};
	console.log("currentImage:", currentImage);
	const handleOk = async () => {
		if (image) {
			try {
				setLoading(true);
				const body = {
					imageId: currentImage.imageId,
					restaurantId: currentImage.restaurantId,
					imageUrl: image,
				};
				await ImageService.updatedImageRes(body);
				onEdit(image);
				setFileList([]);
				message.success("Đã cập nhật hình ảnh thành công!");
			} catch (error) {
				message.error("Có lỗi xảy ra khi cập nhật hình ảnh!");
			} finally {
				setLoading(false);
			}
		} else {
			message.error("Vui lòng tải lên hình ảnh!");
		}
	};

	return (
		<Modal
			title="Chỉnh Sửa Hình Ảnh"
			visible={visible}
			onOk={handleOk}
			onCancel={onCancel}
			width={500}
			okText="Chỉnh sửa"
			cancelText="Hủy"
			loading={loading}
		>
			<Upload
				listType="picture-card"
				fileList={fileList}
				onChange={handleImageUpload}
				beforeUpload={() => false}
			>
				{fileList.length === 0 && (
					<div>
						<PlusOutlined />
						<div style={{ marginTop: 8 }}>Upload</div>
					</div>
				)}
			</Upload>

			{/* Hiển thị ảnh hiện tại nếu có */}
			{image && (
				<img
					src={image}
					alt="Hình ảnh hiện tại"
					style={{ width: "70%", marginTop: 16 }}
				/>
			)}
		</Modal>
	);
};

export default EditImageModal;
