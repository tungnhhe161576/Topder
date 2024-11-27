import { Button, Form, message } from "antd"
import TextArea from "antd/es/input/TextArea"
import CustomModal from "../../../../../../components/Common/ModalCustom"
import UserService from "../../../../../../services/UserService"
import { useState } from "react"

const ModalReport = ({open, onCancel, user, setOpenRequestLogin, setText}) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    
    const handleReport = async () => {
        if (!user) {
            onCancel()
			setOpenRequestLogin(true);
			setText("Bạn cần đăng nhập để thực hiện tác vụ này");
			return;
		}
        try {
            setLoading(true)
            const formValue = await form.validateFields()
            
            await UserService.report({
                reportedBy: user?.uid,
                reportedOn: open?.uid,
                reportType: 'Restaurant',
                description: formValue?.content,
            })
            
            message.open({
                content: 'Tạo báo cáo thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onCancel()
            // onOk()
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
            <div>
                <Form form={form} className="p-20">
                    <Form.Item 
                        name='content'
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