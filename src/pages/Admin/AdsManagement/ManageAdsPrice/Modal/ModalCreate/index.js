import { Button, Form, Input, InputNumber, message } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import AdminService from "../../../../../../services/AdminService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../../../redux/Slice/userSlice";

const ModalCreate = ({open, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const user = useSelector(userInfor)
    
    const handleCreate = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            await AdminService.cretaeAdvertisementPrice({
                pricingId: 0,
                adminId: user?.uid,
                ...values,
            })
            
            message.open({
                content: 'Tạo thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            onCancel()
        } catch (error) {
            console.log(error);
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
                <Button className="mr-10 fw-600" type="primary" shape='round' loading={loading} onClick={() => handleCreate()}>
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
            width={600}
            // style={{marginTop: '100px'}}
        >
            <div className="title-type-1">
                Tạo giá quảng cáo
            </div>
            <div className="mt-20 mb-30">
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="pricingName"
                        label='Tên giá'
                        rules={[
                            { required: true, message: "Vui lòng đặt tên tên!" },
                        ]}
                    >
                        <Input placeholder="Tên giá"/>
                    </Form.Item>

                    <Form.Item
                        name="durationHours"
                        label='Khoảng thời gian'
                        rules={[
                            { required: true, message: "Vui lòng chọn khoảng thời gian!" },
                        ]}
                    >
                        <InputNumber className="w-100" min={1} placeholder="Nhập số giờ"/>
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label='Giá'
                        rules={[
                            { required: true, message: "Vui lòng nhập giá!" },
                        ]}
                    >
                        <InputNumber className="w-100" formatter={(value) => formatNumber(value.toString())} parser={(value) => value.replace(/\./g, '')} min={0} placeholder="Nhập số tiền"/>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label='Mô tả'
                        rules={[
                            { required: true, message: "Vui lòng đặt tên tên!" },
                        ]}
                    >
                        <TextArea rows={6} placeholder="Mô tả" />
                    </Form.Item>
                </Form>
            </div>
        </CustomModal>
    );
}
 
export default ModalCreate;