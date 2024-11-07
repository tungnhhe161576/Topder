import React, { useState } from "react";
import { Button, Form, message, Upload } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import ImageService from "../../../../../../services/ImageService";
import { ModalUploadImageContainer } from "./styled";

const AddImageModal = ({ open, onCancel, onOk, userId }) => {
	const [loading, setLoading] = useState(false)
	const [fileList, setFileList] = useState([])
	const [form] = Form.useForm()


	const handleBeforeUpload = (file) => {
		const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
		const isAllowedType = allowedImageTypes.includes(file.type);
		if (!isAllowedType) {
			message.error('Vui lòng chọn file hình ảnh đúng định dạng (JPG, PNG, GIF).');
		}
		return isAllowedType || Upload.LIST_IGNORE;
	};

	const handleChange = (info) => {
		setFileList(info.fileList.map(file => {
			if (file.response) {
				file.url = file.response.url;
			}
			return file;
		}));
	};


    const handleCreateImages = async () => {
        try {
            setLoading(true)
			const formData = new FormData();
			fileList.forEach(file => {
				formData.append('files', file.originFileObj);
			});
			console.log("formData", formData);
			
			await ImageService.createImages(userId, formData);
            onCancel()
            onOk()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

	

    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600 bg-gray" type="primary" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type="primary" shape='round' loading={loading} onClick={() => handleCreateImages()}>
                    Đồng ý
                </Button>
            </div>
        )
    }

	return (
		<CustomModal
			open={!!open}
			onCancel={onCancel}
			footer={footer}
			width={800}
			style={{marginTop: '150px'}}
		>
			<ModalUploadImageContainer>
				<div className="title-type-1">Tạo ảnh cho nhà hàng</div>
				<div>
					<Form form={form}>
						<Form.Item
							name="image"
							className="m-0 p-0"
						>
							<Upload.Dragger
								className="dragger"
								beforeUpload={handleBeforeUpload}
								onChange={handleChange}
								fileList={fileList}
								style={{ width: '100%', border: 'none', backgroundColor: 'white', margin: 'auto' }}
								accept="image/*"
								multiple={true}
								listType="picture"
							>
								<Button shape="round" type="primary">
									Chọn ảnh
								</Button>
							</Upload.Dragger>
						</Form.Item>
					</Form>
				</div>
			</ModalUploadImageContainer>

	    </CustomModal>
	);
};

export default AddImageModal;
