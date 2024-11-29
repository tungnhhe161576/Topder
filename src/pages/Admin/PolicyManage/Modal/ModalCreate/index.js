import { Button, Form, InputNumber, message } from "antd"
import CustomModal from "../../../../../components/Common/ModalCustom"
import AdminService from "../../../../../services/AdminService"
import { useEffect, useState } from "react"
import { getRegexNumber } from "../../../../../lib/stringUtils"

const ModalCreateOrUpdate = ({open, onCancel, onOk, isEdit, userId}) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            ...open
        })
    }, [form, open])

    const handleCreateOrUpdate = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            isEdit 
                ? await AdminService.updatePolicy({
                    policyId: open?.policyId,
                    status: open?.status,
                    ...values
                })
                : await AdminService.createPolicy({
                    adminId: userId,
                    ...values
                })
            message.open({
                content: isEdit ? 'Chỉnh sửa thành công!' : 'Tạo thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            onCancel()
        } catch (error) {
            message.open({
                content: isEdit ? 'Chỉnh sửa thất bại!' : 'Tạo thất bại!',
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
                <Button className="mr-10 fw-600" type="primary" shape='round' onClick={() => handleCreateOrUpdate()} loading={loading}>
                    Đồng ý
                </Button>
            </div>
        )
    }
    
    const formatNumber = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    
    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            footer={footer}
            width={800}
            style={{marginTop: '100px'}}
        >
            <div className="title-type-1 mb-10">
                {isEdit ? 'Cập nhật chính sách' : 'Tạo chính sách'}
            </div>
            <div className="mb-30">
                <Form form={form} layout="vertical">
                    <Form.Item 
                        name="minOrderValue" 
                        label={<span className="ml-10 fw-500">Số tiền đơn hàng từ</span>}
                        rules={[
                            { pattern: getRegexNumber(), message: "Ký tự không hợp lệ!" },
                        ]}
                    >
                        <InputNumber formatter={(value) => formatNumber(value.toString())} min={0} parser={(value) => value.replace(/\./g, '')} className="w-100" placeholder="Nhập số tiền"/>
                    </Form.Item>
                    <Form.Item 
                        name="maxOrderValue" 
                        label={<span className="ml-10 fw-500">Số tiền đơn hàng đến</span>}
                        rules={[
                            { pattern: getRegexNumber(), message: "Ký tự không hợp lệ!" },
                            // { 
                            //     validator: (_, value) => 
                            //         value && value < 10000
                            //             ? Promise.reject("Hãy nhập số tiền từ 10.000đ trở lên!")
                            //             : Promise.resolve(),
                            // }
                        ]}
                    >
                        <InputNumber formatter={(value) => formatNumber(value.toString())} min={0} parser={(value) => value.replace(/\./g, '')} className="w-100" placeholder="Nhập số tiền"/>
                    </Form.Item>
                    <Form.Item 
                        name="feeAmount" 
                        label={<span className="ml-10 fw-500">Phí</span>}
                        rules={[
                            { pattern: getRegexNumber(), message: "Ký tự không hợp lệ!" },
                        ]}
                    >
                        <InputNumber formatter={(value) => formatNumber(value.toString())} min={0} parser={(value) => value.replace(/\./g, '')} className="w-100" placeholder="Nhập số tiền"/>
                    </Form.Item>
                </Form>
            </div>
        </CustomModal>
    );
}
 
export default ModalCreateOrUpdate;