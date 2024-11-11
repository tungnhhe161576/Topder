import { Button, Form, Input, message } from "antd"
import CustomModal from "../../../../../../components/Common/ModalCustom"
import AdminService from "../../../../../../services/AdminService"
import { useEffect, useState } from "react"

const ModalUpdateCategory = ({open, onCancel, onOk, getAllBlog}) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            ...open
        })
    }, [form, open])

    const handleUpdate = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            await AdminService.updateBlogCategory({
                bloggroupId: open?.bloggroupId,
                bloggroupName: values?.bloggroupName
            })
            message.open({
                content: 'Chỉnh sửa thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            getAllBlog()
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
                <Button className="mr-10 fw-600" type="primary" shape='round' onClick={() => handleUpdate()} loading={loading}>
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
                Cập nhật loại bài viết
            </div>
            <div className="mt-20 mb-30">
                <Form form={form}>
                    <Form.Item 
                        name='bloggroupName'
                        rules={[
                            { required: true, message: "Vui lòng chọn loại bài viết!" },
                        ]}
                    >
                       <Input placeholder="Loại bài viết"/>
                    </Form.Item>
                </Form>
            </div>
        </CustomModal>
    );
}
 
export default ModalUpdateCategory;