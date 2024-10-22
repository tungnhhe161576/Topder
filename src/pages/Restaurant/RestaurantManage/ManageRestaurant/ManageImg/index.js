import { useEffect, useState } from "react";
import { ManageImgContainer } from "./styled";
import { Button, Table, Modal, message } from "antd";
import AddImageModal from "./ModalAdd";
import EditImageModal from "./ModalEdit";
import ImageService from "../../../../../services/ImageService";
import { userInfor } from "../../../../../redux/Slice/userSlice";
import { useSelector } from "react-redux";

const ManageImages = () => {
	const [dataSource, setDataSource] = useState([]);
	const user = useSelector(userInfor);
	const [isAddModalVisible, setIsAddModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [currentImage, setCurrentImage] = useState(null);
	const [deleteKey, setDeleteKey] = useState(null);

	// Fetch images from API
	const getImages = async () => {
		try {
			const response = await ImageService.getImgRestaurant(user?.uid);
			const images = response?.map((item) => ({
				key: item.imageId,
				imageUrl: item.imageUrl,
				restaurantId: item.restaurantId,
			}));
			setDataSource(images);
		} catch (error) {
			message.error("Failed to load images from the server.");
		}
	};

	// Fetch images on component mount
	useEffect(() => {
		getImages();
	}, []);

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
			imageUrl: newImage,
		};
		setDataSource([...dataSource, newData]);
		setIsAddModalVisible(false);
	};

	const handleEditImage = (updatedImage) => {
		setDataSource(
			dataSource.map((item) =>
				item.key === currentImage.key
					? { ...item, imageUrl: updatedImage }
					: item
			)
		);
		setIsEditModalVisible(false);
	};

	const handleDeleteImage = () => {
		setDataSource(dataSource.filter((item) => item.key !== deleteKey));
		setIsDeleteModalVisible(false);
		message.success("Xóa hình ảnh thành công.");
	};

	const handleCancelDelete = () => {
		setIsDeleteModalVisible(false);
	};

	const columns = [
		{
			title: "Ảnh",
			dataIndex: "imageUrl",
			key: "imageUrl",
			render: (imageUrl) => (
				<img src={imageUrl} alt="Ảnh Nhà Hàng" width={80} />
			),
		},
		{
			title: "Chỉnh Sửa",
			key: "edit",
			render: (text, record) => (
				<Button
					style={{ height: 40 }}
					type="primary"
					onClick={() => showEditModal(record)}
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
				currentImage={currentImage?.imageUrl} // Truyền URL của ảnh hiện tại
			/>
		</ManageImgContainer>
	);
};

export default ManageImages;
