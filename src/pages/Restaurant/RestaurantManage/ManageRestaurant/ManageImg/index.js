import { useEffect, useState } from "react";
import { ManageImgContainer } from "./styled";
import { Button, Table, message } from "antd";
import AddImageModal from "./ModalAdd";
import EditImageModal from "./ModalEdit";
import UserService from "../../../../../services/UserService";
import SpinCustom from "../../../../../components/Common/SpinCustom";
import ModalDeleteImage from "./ModalDeleteImage";

const ManageImages = ({user}) => {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false)
	const [modalCreateImage, setModalCreateImage] = useState(false)
	const [modalDeleteImage, setModalDeleteImage] = useState(false)
	const [modalUpdateImage, setModalUpdateImage] = useState(false)

	const getImages = async () => {
		try {
			setLoading(true)
			const response = await UserService.getAllImageRestaurant(user?.uid)
			setImages(response);
		} catch (error) {
			message.error("Failed to load images from the server.");
		} finally {
			setLoading(false)
		}
	};

	// Fetch images on component mount
	useEffect(() => {
		if(!!user?.uid){
			getImages();
		}
	}, []);

	const columns = [
		{
			title: "STT",
			dataIndex: "number",
			key: "number",
			render: (_, __, index) => (
				<span className="fs-16 fw-500"> {index+1} </span>
			),
		},
		{
			title: "Ảnh",
			dataIndex: "imageUrl",
			key: "imageUrl",
			width: 300,
			render: (value) => (
				<div className="image-container">
					<img src={value} alt="Ảnh Nhà Hàng"/>
				</div>
			),
		},
		{
			title: "Chỉnh Sửa",
			key: "edit",
			render: (text, record) => (
				<Button
					style={{ height: 40 }}
					type="primary"
					onClick={() => setModalUpdateImage(record)}
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
					onClick={() => setModalDeleteImage(record)}
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
					onClick={() => setModalCreateImage(true)}
				>
					Thêm Hình Ảnh
				</Button>
			</div>

			<div className="w-90 m-auto">
				<SpinCustom spinning={loading}>
					<Table 
						dataSource={images} 
						columns={columns} 
						pagination={{
							pageSize: 5,
							position: ["bottomCenter"],
						}}
					/>
				</SpinCustom>
			</div>

			{
				!!modalUpdateImage && (
					<EditImageModal
						open={modalUpdateImage}
						onCancel={() => setModalUpdateImage(false)}
						onOk={getImages}
						userId={user?.uid}
					/>
				)
			}
			{
				!!modalDeleteImage && (
					<ModalDeleteImage
						open={modalDeleteImage}
						onCancel={() => setModalDeleteImage(false)}
						onOk={getImages}
						userId={user?.uid}
					/>
				)
			}
			{
				!!modalCreateImage && (
					<AddImageModal
						open={modalCreateImage}
						onCancel={() => setModalCreateImage(false)}
						onOk={getImages}
						userId={user?.uid}
					/>
				)
			}
		</ManageImgContainer>
	);
};

export default ManageImages;
