import { Button, Form, Input, message } from "antd";
import CustomModal from "../../../../../../../components/Common/ModalCustom";
import UserService from "../../../../../../../services/UserService";
import { useEffect, useState } from "react";

const ModalUpdate = ({open, onCancel, onOk, getMenus, userId}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        form.setFieldsValue({
            ...open
        })
    }, [open, form])

    const handleUpdate = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            await UserService.updateCategoryMenu({
                ...values,
                categoryMenuId: open?.categoryMenuId
            })
            message.open({
                content: 'Cập nhật loại món ăn thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            getMenus()
            onCancel()
        } catch (error) {
            message.open({
                content: 'Cập nhật loại món ăn thất bại!',
                type: 'error',
                style: {
                    marginTop: '10vh',
                },
            })
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
            style={{marginTop: '150px'}}
        >
            <div className="title-type-1">
                Cập nhật loại món ăn
            </div>
            <div className="mt-20">
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="categoryMenuName"
                        label={
                            <span className="fs-17 fw-600 d-flex justify-content-start">
                                Loại món ăn
                            </span>
                        }
                    >
                        <Input placeholder="Loại món ăn" />
                    </Form.Item>
                </Form>
            </div>
        </CustomModal>
    );
}
 
export default ModalUpdate;