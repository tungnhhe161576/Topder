import React, { useState, useEffect } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const EditImageModal = ({ visible, onCancel, onEdit, currentImage }) => {
	const [image, setImage] = useState(currentImage);
	const [fileList, setFileList] = useState([]);

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

	const handleOk = () => {
		if (image) {
			onEdit(image); // Cập nhật ảnh sau khi chỉnh sửa
			setFileList([]); // Reset file list sau khi chỉnh sửa
			message.success("Đã cập nhật hình ảnh!");
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
			width={700}
			okText="Chỉnh sửa"
			cancelText="Hủy"
		>
			<Upload
				listType="picture-card"
				fileList={fileList}
				onChange={handleImageUpload}
				beforeUpload={() => false} // Ngăn việc upload ngay lập tức
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
