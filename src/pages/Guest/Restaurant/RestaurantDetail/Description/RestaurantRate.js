import { Avatar, Button, Col, Form, Pagination, Rate, Row } from "antd";
import dat from '../../../../../assets/images/Dat.jpg'
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantRate = ( {rateCount} ) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const nav = useNavigate()

    const handleSubmitFormDating = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            console.log("values", values);
        } catch (error) {
            
        } finally {
            setLoading(true)
        }
    }

    return (  
        <Row gutter={[40, 0]} className="mt-20">
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <div className="fs-22 fw-600 mt-10 mb-15"> {rateCount} Đánh giá </div>
                {Array(3).fill().map((_, index) => (
                    <div className="rating-container mb-20">
                        <div className="pl-20" style={{cursor: 'pointer'}} onClick={() => nav('/')}>
                            <Avatar size={68} src={<img src={dat} alt="avatar" />} />
                        </div>
                        <div className="ml-20 w-100">
                            <div className="fs-18 fw-600 mb-5" style={{cursor: 'pointer'}} onClick={() => nav('/')}>Đỗ Văn Đạt</div>
                            <div className="primary fs-13 mb-10">12/06/2024</div>
                            <div className="mb-15"><Rate className='primary fs-14' value={5} disabled/></div>
                            <div className="w-70">Đồ uống ngon</div>
                        </div>
                    </div>
                ))}

                <div className="pagination">
                    <Pagination className="custom-pagination" defaultCurrent={1} total={50} />
                </div>
            </Col>


            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div className="fs-22 fw-600 mt-10 mb-15"> Đánh giá </div>

                <div className="rating-form">
                    <Form form={form} className="p-20">
                        <Form.Item 
                            name='rate'
                            rules={[
                                { required: true, message: "Hãy chọn số sao!"},
                            ]}
                        >
                            <span className="fs-18">Xếp hạng:</span> <Rate allowHalf className='primary' onChange={(value) => form.setFieldsValue({ rate: value })}/>
                        </Form.Item> 
                        <Form.Item 
                            name='content'
                            rules={[
                                { required: true, message: "Hãy viết đánh giá!" },
                            ]}
                        >
                            <TextArea rows={4} placeholder="Đánh giá của bạn" />
                        </Form.Item> 
                        <Form.Item>
                            <Button 
                                className="white bg-primary fw-600 fs-16 rating-button w-30"
                                htmlType="submit"
                                shape="round"
                                onClick={handleSubmitFormDating}
                            >
                                Đánh giá
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}
 
export default RestaurantRate;