import { Button, Form, Radio, Select } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { ModalChooseOptionPaymentContainer } from "./styled";
import vnpay from '../../../../../../assets/images/vnpay-logo.jpg'
import vietqr from '../../../../../../assets/images/icon-payos.png'
import balance from '../../../../../../assets/images/430509.png'
import { useState } from "react";
import UserService from "../../../../../../services/UserService";
import SpinCustom from "../../../../../../components/Common/SpinCustom";

const ModalChooseOptionPayment = ({open, onCancel, customerId}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    console.log("open", open);

    const handlePaidPayment = async () => {
        try {
            setLoading(true)
            const formValue = await form.validateFields()
            const res = await UserService.paidOrder({
                orderId: open?.orderId,
                userId: customerId,
                paymentGateway: formValue?.option
            })
            // onCancel()
        } catch (error) {
            console.log(error);
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
                            <Form.Item name="option">
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
 
export default ModalChooseOptionPayment;