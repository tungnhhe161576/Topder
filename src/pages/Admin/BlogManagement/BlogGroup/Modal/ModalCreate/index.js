import { Button, Form, Input, message } from "antd"
import { useState } from "react"
import AdminService from "../../../../../../services/AdminService"
import CustomModal from "../../../../../../components/Common/ModalCustom"

const ModalCreateCategory = ({open, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const handleCreate = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            await AdminService.createBlogCategory({
                bloggroupId: 0,
                bloggroupName: values?.category_name
            })
            message.open({
                content: 'Tạo thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            onCancel()
        } catch (error) {
            console.log(error);
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
                <Button className="mr-10 fw-600" type="primary" shape='round' onClick={() => handleCreate()} loading={loading}>
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
            style={{marginTop: '200px'}}
        >
            <div className="title-type-1">
                Tạo loại bài viết
            </div>
            <div className="mt-20 mb-30">
                <Form form={form}>
                    <Form.Item 
                        name='category_name'
                        rules={[
                            { required: true, message: "Vui lòng chọn loại bài viết!" },
                        ]}
                    >
                        <Input placeholder="Tên loại bài viết"/>
                    </Form.Item>
                </Form>
            </div>
        </CustomModal>
    );
}
 
export default ModalCreateCategory;