import React, { useState } from "react";
import { LoginContainer } from "../../Guest/LoginPage/styled";
import LeftSide from "../../../components/LeftSideLogin";
import { Button, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { getRegexEmail } from "../../../lib/stringUtils";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleForgotPassByForm = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log(values);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Row>
        <LeftSide />

        <Col span={12} className="right-side">
          <div className="d-flex-end mt-60 mr-40">
            <Button
              type="primary"
              shape="round"
              style={{ width: "120px", backgroundColor: "#ff7c08" }}
              onClick={() => {
                nav("/login");
              }}
            >
              <span className="fs-18 fw-600">Đăng Nhập</span>
            </Button>
            <Link to="/">
              <div className="button-close">
                <CloseOutlined />
              </div>
            </Link>
          </div>

          <div className="title">
            <span className="side1">Quên Mật Khẩu</span>
            <span className="side2">Chào mừng bạn đã đến với TOPDER!</span>
          </div>

          <div className="form mt-40 flex-column">
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Hãy nhập email của bạn" },
                  { pattern: getRegexEmail(), message: "Email sai định dạng" },
                ]}
                label={<span className="fw-600"> Email </span>}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Form>

            {/* <div className="forgot-password fs-16 fw-600 primary-color">
                        * Quên mật khẩu
                    </div> */}

            <Button
              onClick={handleForgotPassByForm}
              htmlType="submit"
              loading={loading}
              type="primary"
              className="submit"
              shape="round"
            >
              Tiếp tục
            </Button>
          </div>
        </Col>
      </Row>
    </LoginContainer>
  );
};

export default ForgotPassword;
