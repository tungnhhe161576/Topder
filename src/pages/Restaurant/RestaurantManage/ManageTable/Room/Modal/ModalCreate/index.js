import { Button, Form, Input, message, InputNumber } from "antd";
import CustomModal from "../../../../../../../components/Common/ModalCustom";
import { useState } from "react";
import UserService from "../../../../../../../services/UserService";
import TextArea from "antd/es/input/TextArea";


const ModalCreateRoom = ({open, onCancel, onOk, userId}) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm() 

    const handleCreateRoom = async () => {
        try {
            setLoading(true)
            const formValues = await form.validateFields()
            await UserService.createRoom({
                restaurantId: userId,
                categoryRoomId: null,
                ...formValues
            })
            message.open({
                content: 'Tạo phòng thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            onCancel()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type="primary" shape='round' onClick={() => handleCreateRoom()} loading={loading}>
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
            width={900}
            style={{marginTop: '200px'}}
        >
            <div className="title-type-1">
                Cập nhật phòng
            </div>
            <div className="mt-20">
                <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                    <Form.Item
                        name="roomName"
                        label={
                            <span className="fs-17 fw-600 d-flex justify-content-start">
                                Tên phòng
                            </span>
                        }
                        rules={[
                            { required: true, message: "Vui lòng đặt tên phòng!" },
                        ]}
                    >
                        <Input placeholder="Tên phòng"/>
                    </Form.Item>

                    <Form.Item
                        name="maxCapacity"
                        label={
                            <span className="fs-17 fw-600 d-flex justify-content-start">
                                Sức chứa
                            </span>
                        }
                        rules={[
                            { required: true, message: "Vui lòng chọn sức chứa!" },
                        ]}
                    >
                        <InputNumber placeholder="Sức chứa" min={1} className='w-100'/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label={
                            <span className="fs-17 fw-600 d-flex justify-content-start">
                                Mô tả phòng
                            </span>
                        }
                    >
                        <TextArea rows={4} placeholder="Đánh giá của bạn" />
                    </Form.Item>
                </Form>
            </div>
        </CustomModal>
    );
}
 
export default ModalCreateRoom;