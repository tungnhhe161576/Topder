import { Button, Col, DatePicker, Form, Input, InputNumber, message, Radio, Row, Select } from "antd"
import CustomModal from "../../../../../../components/Common/ModalCustom"
import UserService from "../../../../../../services/UserService"
import { useEffect, useState } from "react"
import dayjs from "dayjs";
import ModalChooseMenus from "../ModalChooseMenus";
const { Option } = Select;

const ModalUpdateDiscount = ({open, onCancel, onOk, userId}) => {
    const [loading, setLoading] = useState(false)
    const [openChooseMenus, setOpenChooseMenus] = useState(false)
    const [menus, setMenus] = useState(open?.discountMenuDtos)
    const [form] = Form.useForm()

    const handleUpdateDiscount = async () => {
        try {
            setLoading(false)
            const values = await form.validateFields()
            const menu = menus.map(({ menuId, discountMenuPercentage }) => ({ menuId, discountMenuPercentage }));
            await UserService.updateDiscount({
                ...values,
                discountId: open?.discountId,
                restaurantId: userId,
                discountMenuDtos: menu,
                startDate: values?.startDate?.$d,
                endDate: values?.endDate?.$d,
                isActive: open?.isActive
            })
            message.open({
                content: 'Chỉnh sửa thành công',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onCancel()
            onOk()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(true)
        }
    }

    useEffect(() => {
        if (open) {
            form.setFieldsValue({
                ...open,
                // applicableTo: open.applicableTo ? dayjs(open.startDate, "DD-MM-YYYY") : null,
                startDate: open.startDate ? dayjs(open.startDate, "YYYY-MM-DD HH:mm") : null,
                endDate: open.endDate ? dayjs(open.endDate, "YYYY-MM-DD HH:mm") : null,
            });
        }
    }, [open, form]);

    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type='primary' 
                    onClick={() => handleUpdateDiscount()}
                    loading={loading}
                >
                    Đồng ý
                </Button>
            </div>
        )
    }
    
    return (  
        <div>
            <CustomModal
                open={!!open}
                onCancel={onCancel}
                width={800}
                footer={footer}
                style={{marginTop: '-80px'}}
            >
                <div>
                    <Form form={form} layout="vertical">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="Tên mã giảm giá"
                                    name="discountName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Nhập tên mã giảm giá!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Mã giảm giá"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Số lượng"
                                    name="quantity"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập số lượng!",
                                        },
                                    ]}
                                >
                                    <InputNumber min={0} style={{ width: "100%" }} placeholder="Nhập số lượng"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="Ngày bắt đầu"
                                    name="startDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Chọn ngày bắt đầu",
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        format="YYYY-MM-DD HH:mm"
                                        showTime={{
                                            defaultValue: dayjs('00:00:00', 'HH:mm'),
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Ngày kết thúc"
                                    name="endDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Chọn ngày kết thúc!",
                                        },
                                        // ({ getFieldValue }) => ({
                                        // 	validator(_, value) {
                                        // 		const startDate =
                                        // 			getFieldValue("startDate");
                                        // 		if (
                                        // 			!value ||
                                        // 			!startDate ||
                                        // 			value.isAfter(startDate)
                                        // 		) {
                                        // 			return Promise.resolve();
                                        // 		}
                                        // 		return Promise.reject(
                                        // 			new Error(
                                        // 				"End date must be after start date!"
                                        // 			)
                                        // 		);
                                        // 	},
                                        // }),
                                    ]}
                                >
                                    <DatePicker
                                        format="YYYY-MM-DD HH:mm"
                                        showTime={{
                                            defaultValue: dayjs('00:00:00', 'HH:mm'),
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Đối tượng áp dụng"
                            name="applicableTo"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please select who this discount applies to!",
                                },
                            ]}
                        >
                            <Select placeholder="Chọn khách hàng áp dụng">
                                <Option value="New Customer">Khách hàng mới</Option>
                                <Option value="All Customers">Tất cả khách hàng</Option>
                                <Option value="Loyal Customer"> Khách hàng thân thiết </Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Loại áp dụng"
                            name="applyType"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn loại áp dụng!",
                                },
                            ]}
                        >
                            <Select placeholder="Chọn loại áp dụng" allowClear >
                                <Option value="All Orders">Tất cả đơn hàng</Option>
                                <Option value="Order Value Range"> Khoảng giá áp dụng </Option>
                            </Select>
                        </Form.Item>

                        {/* Conditional Min and Max Order Values */}
                        <Form.Item
                            noStyle
                            shouldUpdate
                        >
                            {({ getFieldValue }) => {
                                const selectedDate = getFieldValue('applyType');
                                return selectedDate === 'Order Value Range' ? (
                                    <div className="d-flex w-90 m-auto justify-content-center">
                                        <Form.Item
                                            style={{flex: '1', marginRight: '10px'}}
                                            name="minOrderValue"
                                            label= "Khoảng giá tối thiểu"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Hãy chọn khoảng giá tối thiếu!",
                                                },
                                            ]}
                                        >
                                            <InputNumber min={0} style={{ width: "100%" }} />
                                        </Form.Item>
                                        <Form.Item
                                            style={{flex: '1'}}
                                            label="Khoảng giá tối đa"
                                            name="maxOrderValue"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Hãy nhập khoảng giá tối đa!",
                                                },
                                            ]}
                                        >
                                            <InputNumber min={0} style={{ width: "100%" }} />
                                        </Form.Item>
                                    </div>
                                ) : null
                            }}
                        </Form.Item>

                        <Form.Item
                            label="Phạm vi"
                            name="scope"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn phạm vi!",
                                },
                            ]}
                        >
                            <Select placeholder="Phạm vi" allowClear >
                                <Option value="Entire Order">Cho toàn bộ đơn hàng</Option>
                                <Option value="Per Service">Cho từng món ăn</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate
                        >
                            {({ getFieldValue }) => {
                                const selectedDate = getFieldValue('scope');
                                return selectedDate === 'Entire Order' ? (
                                    <div className="w-50 pl-40">
                                        <Form.Item
                                            label="Chiết khấu"
                                            name="discountPercentage"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Hãy điền chiết khấu!",
                                                },
                                            ]}
                                        >
                                            <InputNumber min={0} max={100} style={{ width: "100%" }} />
                                        </Form.Item>
                                    </div>
                                ) : selectedDate === 'Per Service' ? (
                                    <Button
                                        className="ml-40 bg-primary"
                                        shape="round"
                                        type="primary"
                                        onClick={() => setOpenChooseMenus(menus)}
                                        style={{ marginBottom: "16px" }}
                                    >
                                        Chọn món ăn
                                    </Button>
                                ) : null
                            }}
                        </Form.Item>

                        <Form.Item label="Mô tả" name="description">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Form>


                    {!!openChooseMenus && (
                        <ModalChooseMenus
                            open={openChooseMenus}
                            onCancel={() => setOpenChooseMenus(false)}
                            // onOk={getDiscounts}
                            userId={userId}
                            setMenus={setMenus}
					        menus={menus}
                        />
                    )}
                </div>
            </CustomModal>
        </div>
    );
}
 
export default ModalUpdateDiscount;