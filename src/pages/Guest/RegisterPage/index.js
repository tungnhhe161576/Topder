import React, { useState } from "react";
import { Button, Col, DatePicker, Form, Input, Radio, Row } from "antd";
import LeftSide from "../../../components/LeftSideLogin";
import { LoginContainer } from "../LoginPage/styled";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { getRegexEmail, getRegexPassowrd, getRegexPhoneNumber } from "../../../lib/stringUtils";
import dayjs from "dayjs";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const nav = useNavigate();
    

    const handleRegister = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            const data = {
                ...values,
                date: dayjs(values?.date?.$d).format('DD-MM-YYYY') 
            }
            console.log("form: ", values);
            console.log("data: ", data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }
    return (
        <LoginContainer>
            <Row>
                <LeftSide />

                <Col span={12} className="right-side">
                    <div className="d-flex-end mt-60 mr-40">
                        <Button type="primary" shape="round" style={{ width: "120px", backgroundColor: "#ff7c08" }} onClick={() => {nav("/login")}}>
                            <span className="fs-18 fw-600">Đăng nhập</span>
                        </Button>

                        <Link to="/">
                            <div className="button-close">
                                <CloseOutlined />
                            </div>
                        </Link>
                    </div>

                    <div className="title">
                        <span className="side1">Đăng ký</span>
                        <span className="side2">Chào mừng bạn đã đến với TOPDER!</span>
                    </div>

                    <div className="form mt-40 flex-column">
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: "Hãy nhập họ và tên của bạn" },
                                ]}
                                label={<span className="fw-600 ml-10"> Họ và Tên </span>}
                            >
                                <Input placeholder="Nhập họ và tên" />
                            </Form.Item>
                            <Form.Item
                                name="phoneNumber"
                                rules={[
                                    { required: true, message: "Hãy nhập số điện thoại của bạn" },
                                    { pattern: getRegexPhoneNumber(), message: "Số điện thoại sai định dạng" },
                                ]}
                                label={<span className="fw-600 ml-10"> Số điện thoại </span>}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: "Hãy nhập email của bạn" },
                                    { pattern: getRegexEmail(), message: "Email sai định dạng" },
                                ]}
                                label={<span className="fw-600 ml-10"> Email </span>}
                            >
                                <Input placeholder="Nhập email" />
                            </Form.Item>
                            <Form.Item
                                name="date"
                                rules={[
                                    { required: true, message: "Hãy chọn ngày-tháng-năm sinh của bạn" },
                                ]}
                                label={<span className="fw-600 ml-10"> Ngày/Tháng/Năm sinh </span>}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                name="gender"
                                rules={[
                                    { required: true, message: "Hãy chọn giới tính" },
                                ]}
                                label={<span className="fw-600 ml-10"> Giới tính </span>}
                            >
                                <Radio.Group>
                                    <Radio value={1}>Nam</Radio>
                                    <Radio value={2}>Nữ</Radio>
                                    <Radio value={3}>Khác</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                name="username"
                                rules={[
                                    { required: true, message: "Hãy điền tên đăng nhập của bạn" },
                                ]}
                                label={<span className="fw-600 ml-10"> Tên đăng nhập </span>}
                            >
                                <Input placeholder="Nhập tên đăng nhập" />
                            </Form.Item>
                            <Form.Item
                                className="mb-0"
                                name="password"
                                rules={[
                                    { required: true, message: "Hãy điền mật khẩu" },
                                    { pattern: getRegexPassowrd(), message: "Mật khẩu sai định dạng" },
                                ]}
                                label={<span className="fw-600 ml-10"> Mật khẩu </span>}
                            >
                                <Input.Password placeholder="Nhập mật khẩu"/>
                            </Form.Item>
                            <div className="mb-10 ml-10 fs-16 fw-600"> Mật khẩu gồm 6 kí tự: bao gồm chữ thường, chữ in hoa và 1 số</div>
                            <Form.Item
                                name="confirmPassword"
                                rules={[
                                    { required: true, message: "Hãy điền tên đăng nhập của bạn" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu nhập lại chưa đúng!'));
                                        },
                                    }),
                                ]}
                                hasFeedback
                                dependencies={['password']}
                                label={<span className="fw-600 ml-10"> Nhập lại mật khẩu </span>}
                            >
                                <Input.Password placeholder="Nhập lại mật khẩu"/>
                            </Form.Item>
                        </Form>

                        <Button
                            onClick={handleRegister}
                            loading={loading}
                            type="primary"
                            className="submit-register"
                            shape="round"
                        >
                            Đăng ký
                        </Button>
                    </div>
                </Col>
            </Row>
        </LoginContainer>
    );
};

export default RegisterPage;
