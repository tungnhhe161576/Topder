import { useState } from "react";
import { ManageImgContainer } from "./styled";
import { Button, Table, Modal, message } from "antd";
import AddImageModal from "./ModalAdd";
import EditImageModal from "./ModalEdit";

const ManageImages = () => {
	const [dataSource, setDataSource] = useState([
		{
			key: "1",
			image: "https://example.com/image1.jpg",
		},
		{
			key: "2",
			image: "https://example.com/image2.jpg",
		},
	]);

	const [isAddModalVisible, setIsAddModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [currentImage, setCurrentImage] = useState(null);
	const [deleteKey, setDeleteKey] = useState(null); // Key của ảnh cần xóa

	const showAddModal = () => {
		setIsAddModalVisible(true);
	};

	const showEditModal = (image) => {
		setCurrentImage(image);
		setIsEditModalVisible(true);
	};

	const showDeleteModal = (key) => {
		setDeleteKey(key);
		setIsDeleteModalVisible(true);
	};

	const handleAddImage = (newImage) => {
		const newData = {
			key: (dataSource.length + 1).toString(),
			image: newImage,
		};
		setDataSource([...dataSource, newData]);
		setIsAddModalVisible(false);
	};

	const handleEditImage = (updatedImage) => {
		setDataSource(
			dataSource.map((item) =>
				item.image === currentImage
					? { ...item, image: updatedImage }
					: item
			)
		);
		setIsEditModalVisible(false);
	};

	const handleDeleteImage = () => {
		setDataSource(dataSource.filter((item) => item.key !== deleteKey));
		setIsDeleteModalVisible(false); // Đóng modal sau khi xóa
		message.success("Đã xóa hình ảnh thành công!");
	};

	const handleCancelDelete = () => {
		setIsDeleteModalVisible(false); // Đóng modal khi nhấn "Hủy"
	};

	const columns = [
		{
			title: "Ảnh",
			dataIndex: "image",
			key: "image",
			render: (text) => <img src={text} alt="Ảnh Nhà Hàng" width={80} />,
		},
		{
			title: "Chỉnh Sửa",
			key: "edit",
			render: (text, record) => (
				<Button
					style={{ height: 40 }}
					type="primary"
					onClick={() => showEditModal(record.image)}
				>
					Chỉnh Sửa
				</Button>
			),
		},
		{
			title: "Xóa",
			key: "delete",
			render: (text, record) => (
				<Button
					style={{ height: 40 }}
					type="primary"
					danger
					onClick={() => showDeleteModal(record.key)}
				>
					Xóa
				</Button>
			),
		},
	];

	return (
		<ManageImgContainer>
			<div style={{ marginBottom: "20px", textAlign: "right" }}>
				<Button
					type="primary"
					style={{ height: 40 }}
					onClick={showAddModal}
				>
					Thêm Hình Ảnh
				</Button>
			</div>

			<Table dataSource={dataSource} columns={columns} />

			{/* Modal xác nhận xóa */}
			<Modal
				title="Xác nhận xóa"
				visible={isDeleteModalVisible}
				onOk={handleDeleteImage}
				onCancel={handleCancelDelete}
				okText="Xóa"
				cancelText="Hủy"
			>
				<p>Bạn có chắc chắn muốn xóa hình ảnh này không?</p>
			</Modal>

			<AddImageModal
				visible={isAddModalVisible}
				onCancel={() => setIsAddModalVisible(false)}
				onAdd={handleAddImage}
			/>

			<EditImageModal
				visible={isEditModalVisible}
				onCancel={() => setIsEditModalVisible(false)}
				onEdit={handleEditImage}
				currentImage={currentImage}
			/>
		</ManageImgContainer>
	);
};

export default ManageImages;
