import { Button, Form, message, Radio } from "antd"
import { ModalCreatePolicyContainer } from "../ModalCreatePolicy/styled"
import CustomModal from "../../../../../../../components/Common/ModalCustom"
import { useEffect, useState } from "react"
import UserService from "../../../../../../../services/UserService"
import dayjs from "dayjs"

const ModalChoosePolicy = ({open, onCancel, onOk, userId}) => {
    const [form] = Form.useForm()
    const [inActicePolicy, setInactivePolicy] = useState([])
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        try {
            setLoading(true)
            const res = await UserService.getInActivePolicy(userId)
            setInactivePolicy(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const handleChoosePolicy = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            await UserService.choosePolicy(values?.id)
            message.open({
				content: 'Chọn chính sách thành công.',
				type: 'success',
				style: {
					marginTop: '10vh',
				},
			})
            onCancel()
            onOk()
        } catch (error) {
            message.open({
				content: 'Chọn chính sách thất bại!',
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
                <Button className="mr-10 fw-600" type="primary" shape='round' loading={loading} onClick={() => handleChoosePolicy()}>
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
                <div className="title-type-1">Chọn chính sách</div>
                <div className="form">
                    <Form
                        layout="vertical"
                        form={form}
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        className="p-40"
                    >
                        <Form.Item name="id"
                            // label='Chính sách nhà hàng'
                            rules={[
                                {
                                    required: true,
                                    message: "Hãy chọn sách nhà hàng!",
                                },
                            ]}
                            className="w-100"
                        >
                        {
                            inActicePolicy.length <= 0 
                                ? <div className="d-flex align-items-center justify-content-center red fw-500 fs-18"> Nhà hàng chưa tạo điều khoản nào </div>
                                : <Radio.Group
                                    block 
                                    optionType="button" 
                                    className="d-flex flex-column w-100"
                                >
                                    {
                                        inActicePolicy?.map(i => (
                                            <Radio className="mb-10 w-100" key={i?.policyId} value={i?.policyId}>
                                                <div className="d-flex align-items-center">
                                                    <div className="fw-500"> 
                                                        Triết khấu lần đầu đặt bàn: {i?.firstFeePercent ? i?.firstFeePercent : 0}%
                                                    </div>
                                                    <div className="fw-500"> 
                                                        Triết khấu từ lần đặt bàn thứ 2: {i?.returningFeePercent ? i?.returningFeePercent : 0}%
                                                    </div>
                                                    <div className="fw-500"> 
                                                        Triết khấu khi hủy đơn: {i?.cancellationFeePercent ? i?.cancellationFeePercent : 0}%
                                                    </div>
                                                </div>
                                                <div className="fw-12 gray">
                                                    Ngày tạo: {dayjs(i?.createDate).format('DD-MM-YYYY')}
                                                </div>
                                            </Radio>
                                        ))
                                    }
                                </Radio.Group>
                        }
                        </Form.Item>
                    </Form>
                </div>
            </ModalCreatePolicyContainer>
        </CustomModal>
    );
}
 
export default ModalChoosePolicy;