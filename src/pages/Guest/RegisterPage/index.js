import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import LeftSide from "../../../components/LeftSideLogin";
import { LoginContainer } from "../LoginPage/styled";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined, GoogleOutlined } from "@ant-design/icons";
const RegisterPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

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
              <span className="fs-18 fw-600">Đăng nhập</span>
            </Button>

            <Link to="/">
              <div className="button-close">
                <CloseOutlined />
              </div>
            </Link>
          </div>

          <div className="title">
            <span className="side1">Đăng nhập</span>
            <span className="side2">Chào mừng bạn đã đến với TOPDER!</span>
          </div>
          <div className="form mt-40 flex-column">
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Hãy nhập họ và tên của bạn" },
                ]}
                label={<span className="fw-600"> Họ và Tên </span>}
              >
                <Input placeholder="Họ và Tên" />
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </LoginContainer>
  );
};

export default RegisterPage;
