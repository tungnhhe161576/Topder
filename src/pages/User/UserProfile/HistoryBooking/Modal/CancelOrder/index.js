import { Button, Form, Input, message } from "antd"
import CustomModal from "../../../../../../components/Common/ModalCustom"
import { useEffect, useState } from "react"
import UserService from "../../../../../../services/UserService"
import { useDispatch, useSelector } from "react-redux"
import { updateUserInformation, userInfor } from "../../../../../../redux/Slice/userSlice"
import GuestService from "../../../../../../services/GuestService"

const ModalCancelOrder = ({open, onCancel, onOk}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    // const [restaurantFee, setRestaurantFee] = useState()
    const user = useSelector(userInfor)
    const dispatch = useDispatch()
    const [data, setData] = useState()

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
    useEffect(() => {
        getDataPolicy()
    }, [])

    // const getRestaurantFee = async () => {
    //     try {
    //         const res = await GuestService.getRestaurantFee(open?.restaurantId)
    //         setRestaurantFee(res)
    //         return restaurantFee
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // useEffect(() => {
    //     getRestaurantFee()
    // }, [])

    
    const handleCancelOrder = async () => {
        try {
            setLoading(true)
            const value = await form.validateFields()
            await UserService.cancelOrder({
                orderId: open?.orderId,
                userId: user?.uid,
                cancelReason: value?.reason,
            })
            const wallet = await UserService.getWalletInfo(user?.uid)
            message.open({
                content: 'Hủy bàn thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            dispatch(updateUserInformation({ walletBalance: wallet?.walletBalance }))
            onCancel()
        } catch (error) {
            message.open({
                content: 'Hủy bàn thất bại!',
                type: 'error',
                style: {
                    marginTop: '10vh',
                },
            })
        } finally {
            onOk()
            setLoading(false)
        }
    }
    
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button 
                    className="mr-10 fw-600" type='primary' 
                    onClick={() => handleCancelOrder()}
                    loading={loading}
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
            <div>
                {
                    open?.statusOrder === "Paid" 
                    ? <div className="mb-20 fs-18 mt-20 pl-30">
                            Theo chính sách của nhà hàng, bạn sẽ được hoàn lại <span className="fw-500">{`${!!data?.cancellationFeePercent ? 100 - data?.cancellationFeePercent : 100}`}%</span> dựa theo hình thức thanh toán về ví của bạn. Bạn có chắc là muốn hủy đơn hàng này không?
                        </div>
                    : <div className="fs-18 fw-500 mb-20 mt-20 pl-30"> Bạn có chắc sẽ hủy đơn đặt bàn này không? </div>
                }
                <div> 
                    <div className="fw-15 fw-500 mb-8 pl-10">Lý do</div>
                    <div>
                        <Form form={form}>
                            <Form.Item name='reason'>
                                <Input.TextArea rows={4} placeholder='Nhập lý do hủy đơn'/>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </CustomModal>
    );
}
 
export default ModalCancelOrder;