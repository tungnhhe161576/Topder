import { Button, Form, message, Rate } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import UserService from "../../../../../../services/UserService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../../../redux/Slice/userSlice";

const ModalFeedback = ({open, onCancel, onOk}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const user = useSelector(userInfor)
    
    const handleSendFeedback = async () => {
        try {
            setLoading(true)
            const formValue = await form.validateFields()
            
            await UserService.createFeedback({
                customerId: user?.uid,
                orderId: open?.orderId,
                restaurantId: open?.restaurantId,
                star: formValue?.rate,
                content: formValue?.content
            })
            
            message.open({
                content: 'Tạo đánh giá thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
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
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button 
                    className="mr-10 fw-600" type='primary' 
                    onClick={() => handleSendFeedback()}
                    loading={loading}
                >
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
            width={600}
        >
            <SpinCustom spinning={loading}>
                <Form form={form} className="p-20">
                    <Form.Item 
                        name='rate'
                        rules={[
                            { required: true, message: "Hãy chọn số sao!"},
                        ]}
                    >
                        <span className="fs-18">Xếp hạng:</span> <Rate className='primary' onChange={(value) => form.setFieldsValue({ rate: value })}/>
                    </Form.Item> 
                    <Form.Item 
                        name='content'
                        rules={[
                            { required: true, message: "Hãy viết đánh giá!" },
                        ]}
                    >
                        <TextArea rows={4} placeholder="Đánh giá của bạn" />
                    </Form.Item>
                </Form>
            </SpinCustom>
        </CustomModal>
    );
}
 
export default ModalFeedback;