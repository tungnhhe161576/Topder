import { Button, Form, Input, InputNumber, Radio } from "antd";
import vnpay from '../../../../../../assets/images/vnpay-logo.jpg'
import vietqr from '../../../../../../assets/images/icon-payos.png'
import { useState } from "react";
import UserService from "../../../../../../services/UserService";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { ModalWithdrawContainer } from "./styled";
import { getRegexNumber } from "../../../../../../lib/stringUtils";

const ModalDeposit = ({open, onCancel, customerId, walletId, verifiedOTP, setVerifiedOTP, wallet}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const handleDeposit = async () => {
        try {
            setLoading(true)
            const formValue = await form.validateFields()
            const res = await UserService.deposit({
                uid: customerId,
                walletId: walletId,
                transactionAmount: formValue?.number,
                paymentGateway: formValue?.option
            });
            window.location.href = res?.linkPayment;
            setVerifiedOTP(false)
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
                    onClick={() => handleDeposit()}
                >
                    Nạp tiền
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
                            {!verifiedOTP && (
                                <div className="d-flex justify-content-center">
                                    <Form.Item 
                                        name="otp"
                                        rules={[
                                            { required: true, message: "Hãy nhập mã OTP!" },
                                            { pattern: getRegexNumber(), message: "Mã OTP phải là số!" },
                                        ]}
                                        label={<span className="fw-600 ml-40"> Nhập mã OTP </span>}
                                    >
                                        <Input.OTP
                                            type="password" 
                                            onChange={(e) => {
                                                if (e === wallet?.otpCode) {
                                                    setVerifiedOTP(true)
                                                }
                                            }}
                                            className="ml-40" 
                                            length={4} 
                                        />
                                    </Form.Item>
                                </div>
                            )}
                            {verifiedOTP && (
                                <>
                                    <Form.Item 
                                        name="number" 
                                        label={<span className="ml-10 fw-500">Nhập số tiền bạn cần nạp</span>}
                                        rules={[
                                            { required: true, message: "Hãy nhập số tiền bạn cần nạp (Từ 10.000đ trở lên)!" },
                                            { pattern: getRegexNumber(), message: "Ký tự không hợp lệ!" },
                                            { 
                                                validator: (_, value) => 
                                                    value && value < 10000
                                                        ? Promise.reject("Hãy nhập số tiền từ 10.000đ trở lên!")
                                                        : Promise.resolve(),
                                            }
                                        ]}
                                    >
                                        <InputNumber formatter={(value) => formatNumber(value.toString())} parser={(value) => value.replace(/\./g, '')} className="w-100" defaultValue={10000} min={10000} placeholder="Nhập số tiền"/>
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
                                </>
                            )}
                        </Form>
                    </div>
                </ModalWithdrawContainer>
            </SpinCustom>
        </CustomModal>
    );
}
 
export default ModalDeposit;