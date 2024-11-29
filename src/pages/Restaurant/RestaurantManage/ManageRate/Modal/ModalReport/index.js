import { Button, Form, message } from "antd"
import TextArea from "antd/es/input/TextArea"
import CustomModal from "../../../../../../components/Common/ModalCustom"
import UserService from "../../../../../../services/UserService"
import { useState } from "react"

const ModalReport = ({open, onCancel, onOk, userId}) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    
    const handleReport = async () => {
        try {
            setLoading(true)
            const formValue = await form.validateFields()
            
            await UserService.report({
                reportedBy: userId,
                reportedOn: open?.customerId,
                reportType: 'Feedback',
                description: formValue?.content,
                orderId: null,
                feedbackId: open?.feedbackId
            })
            
            message.open({
                content: 'Tạo báo cáo thành công!',
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
                    onClick={() => handleReport()}
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
            style={{marginTop: '100px'}}
        >
            <div className="title-type-1 mb-20">Báo cáo về đơn hàng</div>
            <div className="mb-30">
                <Form form={form} className="p-20" layout="vertical">
                    <Form.Item 
                        name='content'
                        label= 'Lý do'
                        rules={[
                            { required: true, message: "Hãy viết lý do!" },
                        ]}
                    >
                        <TextArea rows={4} placeholder="Nhập lý do" />
                    </Form.Item>
                </Form>
            </div>
        </CustomModal>
    );
}

 
export default ModalReport;