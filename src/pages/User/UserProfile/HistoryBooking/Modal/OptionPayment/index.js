import { Button, Form, message, Radio } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { ModalChooseOptionPaymentContainer } from "./styled";
import vnpay from '../../../../../../assets/images/vnpay-logo.jpg'
import vietqr from '../../../../../../assets/images/icon-payos.png'
import balance from '../../../../../../assets/images/430509.png'
import { useEffect, useState } from "react";
import UserService from "../../../../../../services/UserService";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import { useDispatch } from "react-redux";
import { updateUserInformation } from "../../../../../../redux/Slice/userSlice";
import GuestService from "../../../../../../services/GuestService";

const ModalChooseOptionPayment = ({open, onCancel, user, orderHistory}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [data, setData] = useState()
    const [returnFee, setReturnFee] = useState()

    const getDataPolicy = async () => {
        try {
            setLoading(true)
            const res = await GuestService.getActivePolicy(open?.restaurantId)
            setData(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    const getReturnFee = async () => {
        try {
            setLoading(true)
            const res = await UserService.returnFee(user?.uid, open?.restaurantId)
            setReturnFee(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getDataPolicy()
        getReturnFee()
    }, [])

    
    

    const handlePaidPayment = async () => {
        try {
            setLoading(true)
            const formValue = await form.validateFields()
            const res = await UserService.paidOrder(open?.orderId, user?.uid, formValue?.option, formValue?.type)
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
            orderHistory()
            dispatch(updateUserInformation({ walletBalance: wallet?.walletBalance }))
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
                <div>
                    <div className='mb-20 fs-20 fw-500'>
                        Thanh toán
                    </div>
                    <div className="">
                        <Form form={form} layout='vertical'>
                            <Form.Item name="type"
                                label='Hình thức thanh toán'
                                rules={[
									{
										required: true,
										message: "Hãy chọn hình thức thanh toán!",
									},
								]}
                            >
                                <Radio.Group
                                    block 
                                    optionType="button" 
                                    className="d-flex flex-column"
                                >
                                    <Radio value="Entire Order" className="mb-10">
                                        <div className="d-flex align-items-center">
                                            <div className="total">
                                                
                                            </div>
                                            <div className="fs-16 fw-500">Thanh toán toàn bộ đơn hàng</div>
                                        </div>
                                    </Radio>
                                    <Radio value="Deposit" className="mb-10">
                                        <div className="d-flex align-items-center">
                                            <div className="total">
                                                
                                            </div>
                                            <div className="fs-16 fw-500">Thanh toán tiền đặt cọc</div>
                                        </div>
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="option"
                                label='Phương thức thanh toán'
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
                </div>
                {
                    !!data && <div className="mt-10 mb-30 fs-12" style={{fontStyle: 'italic'}}>
                        Lưu ý: Theo chính sách của nhà hàng, đơn hàng của bạn sẽ được chiết khấu {returnFee}% giá trị
                    </div>
                }
                
                </ModalChooseOptionPaymentContainer>
            </SpinCustom>
        </CustomModal>
    );
}
 
export default ModalChooseOptionPayment;