import React, { useState } from "react";
import { Upload, message, Button, Form } from "antd";
import ImageService from "../../../../../../services/ImageService";
import CustomModal from "../../../../../../components/Common/ModalCustom";

const EditImageModal = ({ open, onCancel, onOk, userId }) => {
	const [image, setImage] = useState(open?.imageUrl);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();


	const handleBeforeUpload = (file) => {
        const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"]
        const isAllowedType = allowedImageTypes.includes(file.type)
        if (!isAllowedType) {
			message.open({
				content: 'Vui lòng chọn file hình ảnh đúng định dạng (JPG, PNG, GIF).',
				type: 'error',
				style: {
					marginTop: '20vh',
				},
			})
        } else {
			setImage(URL.createObjectURL(file))
        }
        return isAllowedType ? false : Upload.LIST_IGNORE
    }

	const handleUpdateImage = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            const fileValue = values.image.file;
            const file = new FormData();
            file.append("file", fileValue);

            await ImageService.updatedImageRes(open?.imageId, userId, file)
            message.open({
                content: "Cập nhật ảnh thành công!",
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
			onCancel()
            onOk()
        } catch (error) {
            console.error("Error updating avatar:", error)
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
                <Button className="mr-10 fw-600" type="primary" shape='round' loading={loading} onClick={() => handleUpdateImage()}>
                    Đồng ý
                </Button>
            </div>
        )
    }

	console.log(image);
	

	return (
		<CustomModal
			open={!!open}
			onCancel={onCancel}
			footer={footer}
			width={600}
			style={{marginTop: '-60px'}}
		>
			<div className="d-flex align-items-center">
				<div className="image-container w-70">
					<img
						src={image}
						alt="Hình ảnh hiện tại"
						style={{ backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', minHeight: '400px'}}
					/>
				</div>
				<div className="ml-10 w-30">
					<Form form={form}>
						<Form.Item
							name="image"
							className="m-0 p-0"
						>
							<Upload.Dragger
								className="dragger"
								beforeUpload={file => handleBeforeUpload(file)}
								style={{ width: '100%', border: 'none', backgroundColor: 'white', margin: 'auto' }}
								accept="image/*"
								multiple={false}
								maxCount={1}
								fileList={[]}
							>
								<Button 
									className=""
									shape="round"
									type="primary"
								>
									Chọn ảnh thay thế
								</Button>
							</Upload.Dragger>
						</Form.Item>
					</Form>
				</div>
			</div>
		</CustomModal>
	);
};

export default EditImageModal;
