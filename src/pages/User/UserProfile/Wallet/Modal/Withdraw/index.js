import { Button, Form, Input, InputNumber, message } from "antd";
import { useState } from "react";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { ModalWithDrawContainer } from "./styled";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import { getRegexNumber } from "../../../../../../lib/stringUtils";
import ModalSuccess from "../../../../../../components/Modal/ModalSuccess";
import UserService from "../../../../../../services/UserService";
import { useDispatch } from "react-redux";
import { updateUserInformation } from "../../../../../../redux/Slice/userSlice";

const ModalWithDraw = ({open, onCancel, customerId, verifiedOTP, setVerifiedOTP, wallet, getWalletInfo}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)
    const dispatch = useDispatch()    
    
    const handleWithdraw = async () => {
        try {
            setLoading(true)
            const formValue = await form.validateFields()
            await UserService.withdraw({
                uid: customerId,
                walletId: wallet?.walletId,
                transactionAmount: formValue?.number,
            })
            // setModalSuccess(true)
            getWalletInfo()
            dispatch(updateUserInformation({ walletBalance: wallet?.walletBalance }))
            onCancel()
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
            <ModalWithDrawContainer>
                <SpinCustom spinning={loading}>
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
                                        label={<span className="ml-10 fw-500">Nhập số tiền bạn cần rút</span>}
                                        rules={[
                                            { required: true, message: "Hãy nhập số tiền bạn cần rút (Từ 10.000đ trở lên)!" },
                                            { pattern: getRegexNumber(), message: "Ký tự không hợp lệ!" },
                                            { 
                                                validator: (_, value) => 
                                                    value && value > wallet?.walletBalance 
                                                        ? Promise.reject("Số tiền bạn muốn rút lớn hơn số tiền trong ví. Vui lòng nhập lại!")
                                                        : Promise.resolve(),
                                            },
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
                                </>
                            )}
                        </Form>
                    </div>
                </SpinCustom>
            </ModalWithDrawContainer>

            {!!modalSuccess && (
                <ModalSuccess
                    open={modalSuccess}
                    onCancel={() => setModalSuccess(false)}
                    text="Yêu cầu rút tiền thành công. Yêu cầu của bạn đã được gửi đi và xem xét. Bạn sẽ được xử lý yêu cầu trong vòng vài phút."
                />
            )}
        </CustomModal>
    );
}
 
export default ModalWithDraw;