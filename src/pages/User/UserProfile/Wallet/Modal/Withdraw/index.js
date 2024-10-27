import { Button, Form, InputNumber, Radio } from "antd";
import vnpay from '../../../../../../assets/images/vnpay-logo.jpg'
import vietqr from '../../../../../../assets/images/icon-payos.png'
import { useState } from "react";
import UserService from "../../../../../../services/UserService";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { ModalWithdrawContainer } from "./styled";
import { getRegexNumber } from "../../../../../../lib/stringUtils";

const ModalWithDraw = ({open, onCancel, customerId}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const handleWithdraw = async () => {
        try {
            setLoading(true)
            const formValue = await form.validateFields()
            console.log(formValue);
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    } 

    const formatNumber = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type='primary' 
                    onClick={() => handleWithdraw()}
                >
                    Rút tiền
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
                <ModalWithdrawContainer>
                    <div className="mb-30">
                        <Form form={form} layout="vertical">
                            <Form.Item 
                                name="number" 
                                label={<span className="ml-10 fw-500">Nhập số tiền bạn cần rút</span>}
                                rules={[
                                    { required: true, message: "Hãy nhập số tiền bạn cần rút (Lớn hơn 5.000đ)!" },
                                    { pattern: getRegexNumber(), message: "Ký tự không hợp lệ!" },
                                ]}
                            >
                                <InputNumber formatter={(value) => formatNumber(value.toString())} parser={(value) => value.replace(/\./g, '')} className="w-100" defaultValue={5000} min={5000} placeholder="Nhập số tiền"/>
                            </Form.Item>
                            <Form.Item 
                                name="option" 
                                label={<span className="ml-10 fw-500">Chọn phương thức thanh toán</span>}
                                rules={[
                                    { required: true, message: "Hãy chọn phương thức thanh toán" },
                                ]}
                            >
                                <Radio.Group
                                    block 
                                    optionType="button" 
                                    className="d-flex flex-column"
                                >
                                    <Radio value="VNPAY" className="mb-10">
                                        <div className="d-flex align-items-center">
                                            <div className="img">
                                                <img src={vnpay} alt="vnpay"/>
                                            </div>
                                            <div className="ml-50 fs-20 fw-500"> VNPAY </div>
                                        </div>
                                    </Radio>
                                    <Radio value="VIETQR" className="mb-10">
                                        <div className="d-flex align-items-center">
                                            <div className="img">
                                                <img src={vietqr} alt="vnpay"/>
                                            </div>
                                            <div className="ml-50 fs-20 fw-500">PayOS by VietQR</div>
                                        </div>
                                    </Radio>
                                </Radio.Group>

                            </Form.Item>
                        </Form>
                    </div>
                </ModalWithdrawContainer>
            </SpinCustom>
        </CustomModal>
    );
}
 
export default ModalWithDraw;