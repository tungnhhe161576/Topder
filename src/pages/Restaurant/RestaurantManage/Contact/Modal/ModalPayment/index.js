import { Button, message, Radio } from "antd";
import vnpay from '../../../../../../assets/images/vnpay-logo.jpg'
import vietqr from '../../../../../../assets/images/icon-payos.png'
import balance from '../../../../../../assets/images/430509.png'
import CustomModal from "../../../../../../components/Common/ModalCustom";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import { ModalChooseOptionPaymentContainer } from "../../../../../User/UserProfile/HistoryBooking/Modal/OptionPayment/styled";
import { Form } from "antd";
import { updateUserInformation } from "../../../../../../redux/Slice/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import UserService from "../../../../../../services/UserService";


const ModalPayment = ({open, onCancel, onOk, user}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    

    const handlePaidPayment = async () => {
        try {
            setLoading(true)
            const formValue = await form.validateFields()
            const res = await UserService.paymentBooking(open?.bookingId, formValue?.option)
            const wallet = await UserService.getWalletInfo(user?.uid)
            message.open({
                content: "Thanh toán thành công!",
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })

            if (formValue?.option === "VNPAY" || formValue?.option === "VIETQR") {
                window.location.href = res;
            }
            dispatch(updateUserInformation({ walletBalance: wallet?.walletBalance }))
            onOk()
            onCancel()
        } catch (error) {
            message.open({
                content: "Thanh toán thất bại!",
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
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type='primary' 
                    onClick={() => handlePaidPayment()}
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
        >
            <SpinCustom spinning={loading}>
                <ModalChooseOptionPaymentContainer>
                    <div className='fs-22 fw-600 d-flex justify-content-center mb-30'>
                        Chọn phương thức thanh toán
                    </div>
                    <div className="mb-20">
                        <Form form={form}>
                            <Form.Item name="option"
                                rules={[
									{
										required: true,
										message: "Hãy chọn phương thức thanh toán!",
									},
                                    { 
                                        validator: (_, value) => 
                                            value === 'ISBALANCE' && open?.totalAmount > user?.walletBalance
                                                ? Promise.reject("Số dư trong ví không đủ để thanh toán!")
                                                : Promise.resolve(),
                                    }
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
                                    <Radio value="ISBALANCE" className="mb-10">
                                        <div className="d-flex align-items-center">
                                            <div className="img">
                                                <img src={balance} alt="vnpay"/>
                                            </div>
                                            <div className="ml-50 fs-20 fw-500">Ví của bạn</div>
                                        </div>
                                    </Radio>
                                </Radio.Group>

                            </Form.Item>
                        </Form>
                    </div>
                </ModalChooseOptionPaymentContainer>
            </SpinCustom>
        </CustomModal>
    );
}
 
export default ModalPayment;