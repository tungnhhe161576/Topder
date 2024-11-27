import { Button, Form, InputNumber, message } from "antd"
import CustomModal from "../../../../../../components/Common/ModalCustom"
import { ModalCreatePolicyContainer } from "./styled"
import { useEffect, useState } from "react"
import UserService from '../../../../../../services/UserService'

const ModalUpdatePolicy = ({open, onCancel, onOk, userId}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        form.setFieldsValue({
            ...open[0]
        })
    }, [form, open])

    const handleUpdatePolicy = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields( )
            await UserService.updatePolicy(userId, values?.discountRestaurant, values?.firstFeePercent, values?.returningFeePercent, values?.cancellationFeePercent)
            message.open({
				content: 'Cập nhật thành công.',
				type: 'success',
				style: {
					marginTop: '10vh',
				},
			})
            onCancel()
            onOk()
        } catch (error) {
            message.open({
				content: 'Cập nhật thất bại!',
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
                <Button className="mr-10 fw-600 bg-gray" type="primary" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type="primary" shape='round' loading={loading} onClick={() => handleUpdatePolicy()}>
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
            style={{marginTop: '80px'}}
        >
            <ModalCreatePolicyContainer>
                <div className="title-type-1">Chỉnh sửa chính sách</div>
                <div className="form">
                    <Form
                        form={form}
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        className="p-40"
                    >
                        <Form.Item
                            name="discountRestaurant"
                            label={
                                <span className="fs-17 fw-600 d-flex justify-content-start">
                                    Chiết khấu của nhà hàng
                                </span>
                            }
                            rules={[
                                { required: true, message: "Hãy nhập chiết khấu nhà hàng" },
                            ]}
                            className="form-item"
                        >
                            <InputNumber className="input fs-16 w-100" min={0} max={100} placeholder="Chiết khấu" />
                        </Form.Item>
                        <Form.Item
                            name="firstFeePercent"
                            label={
                                <span className="fs-17 fw-600 d-flex justify-content-start">
                                    Chiết khấu cho lần đặt đầu tiên
                                </span>
                            }
                            rules={[
                                { required: true, message: "Hãy nhập chiết khấu!" },
                            ]}
                            className="form-item"
                        >
                            <InputNumber className="input w-100 fs-16" min={0} max={100} placeholder="Chiết khấu" />
                        </Form.Item>
                        <Form.Item
                            name="cancellationFeePercent"
                            label={
                                <span className="fs-17 fw-600 d-flex justify-content-start">
                                    Chiết khấu của hủy bàn
                                </span>
                            }
                            rules={[
                                { required: true, message: "Hãy nhập chiết khấu!" },
                            ]}
                            className="form-item"
                        >
                            <InputNumber className="input w-100 fs-16" min={0} max={100} placeholder="Chiết khấu" />
                        </Form.Item>
                        <Form.Item
                            name="returningFeePercent"
                            label={
                                <span className="fs-17 fw-600 d-flex justify-content-start">
                                    Chiết khấu từ lần đặt thứ 2
                                </span>
                            }
                            rules={[
                                { required: true, message: "Hãy nhập chiết khấu!" },
                            ]}
                            className="form-item"
                        >
                            <InputNumber className="input w-100 fs-16" min={0} max={100} placeholder="Chiết khấu" />
                        </Form.Item>
                    </Form>
                </div>
            </ModalCreatePolicyContainer>
        </CustomModal>
    );
}
 
export default ModalUpdatePolicy;