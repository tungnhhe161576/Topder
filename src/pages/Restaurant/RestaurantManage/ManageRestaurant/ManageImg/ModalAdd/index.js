import React, { useState } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddImageModal = ({ visible, onCancel, onAdd }) => {
	const [newImage, setNewImage] = useState([]);
	const [fileList, setFileList] = useState([]);

	const handleImageUpload = ({ file, fileList }) => {
		setFileList(fileList); // Quản lý danh sách file đã upload

		// Khi file hoàn tất tải lên
		if (file.status === "done" || file.originFileObj) {
			const newImageUrl = URL.createObjectURL(file.originFileObj);
			setNewImage(newImageUrl); // Lưu URL của file đã tải lên
			console.log("img", newImageUrl);
		}
	};

	const handleOk = () => {
		// Kiểm tra nếu có ảnh mới được tải lên
		if (newImage) {
			onAdd(newImage);
			setNewImage(null); // Reset ảnh sau khi upload thành công
			setFileList([]); // Reset danh sách file sau khi upload
			message.success("Đã thêm hình ảnh thành công!");
		} else {
			message.error("Vui lòng tải lên hình ảnh!");
		}
	};

	return (
		<Modal
			title="Thêm Hình Ảnh"
			visible={visible}
			onOk={handleOk}
			onCancel={onCancel}
			okText="Thêm"
			cancelText="Hủy"
			destroyOnClose
			width={700}
		>
			<Upload
				listType="picture-card"
				fileList={fileList}
				onChange={handleImageUpload}
			>
				{fileList.length === 0 && (
					<div>
						<PlusOutlined />
						<div style={{ marginTop: 8 }}>Upload</div>
					</div>
				)}
			</Upload>
		</Modal>
	);
};

export default AddImageModal;
