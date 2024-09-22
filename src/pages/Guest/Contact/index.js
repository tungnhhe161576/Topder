import React, { useState } from "react";
import CommonLayout from "../../../components/Layouts/CommonLayout";
import { ContactContainer } from "./styled";
import { Form, Input, Button, Row, Col } from "antd";
import { getRegexEmail, getRegexPhoneNumber } from "../../../lib/stringUtils";
import {
  PhoneOutlined,
  MailOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLoginByForm = async () => {
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
    <CommonLayout>
      <ContactContainer>
        <div className="contact-page">
          <Row gutter={[32, 16]}>
            <Col xs={24} md={10}>
              <div className="contact-info">
                <div className="contact-info-item">
                  <h2>Số Điện Thoại</h2>
                  <p>+082-829-0092</p>
                  <p>+093-158-9123</p>
                </div>
                <div className="contact-info-item">
                  <h2>Email</h2>
                  <p>topder.vn@gmail.com</p>
                </div>

                <div className="contact-info-item border-0 p-0 m-0">
                  <h2>Địa Chỉ</h2>
                  <p>
                    Khu GDĐT, khu CNC Hoà Lạc, KM29, Đại lộ Thăng Long, huyện
                    Thạch Thất, TP Hà Nội, Vietnam
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={24} md={14}>
              <div className="contact-form">
                <h2>Liên Hệ</h2>
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{ remember: true }}
                >
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ và tên!" },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined style={{ color: "#ff7c08" }} />}
                      placeholder="Họ và tên"
                    />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập email!",
                          },
                          {
                            pattern: getRegexEmail(),
                            message: "Email sai định dạng",
                          },
                        ]}
                      >
                        <Input
                          prefix={<MailOutlined style={{ color: "#ff7c08" }} />}
                          placeholder="Email"
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại!",
                          },
                          {
                            pattern: getRegexPhoneNumber(),
                            message: "Số điện thoại sai định dạng",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <PhoneOutlined style={{ color: "#ff7c08" }} />
                          }
                          placeholder="Số điện thoại"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="subject"
                    rules={[
                      { required: true, message: "Vui lòng nhập chủ đề!" },
                    ]}
                  >
                    <Input
                      prefix={<EditOutlined style={{ color: "#ff7c08" }} />}
                      placeholder="Chủ đề (Ví dụ: Mở cửa hàng, feedback về Topder, khác...)"
                    />
                  </Form.Item>

                  <Form.Item
                    name="content"
                    rules={[
                      { required: true, message: "Vui lòng nhập nội dung!" },
                    ]}
                  >
                    <div style={{ position: "relative" }}>
                      <EditOutlined
                        style={{
                          position: "absolute",
                          left: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#ff7c08",
                          fontSize: "20px",
                        }}
                      />
                      <TextArea
                        placeholder="Nội dung"
                        rows={4}
                        style={{ paddingLeft: "30px" }}
                      />
                    </div>
                  </Form.Item>
                </Form>
                <div className="contact-submit">
                  <Button
                    onClick={handleLoginByForm}
                    htmlType="submit"
                    loading={loading}
                    type="primary"
                    className="submit"
                    shape="round"
                  >
                    Gửi
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="contact-map">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.724423916977!2d105.5031283151469!3d21.00732648601015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab367c96a883%3A0x47860e1b37f6a591!2sFPT%20University!5e0!3m2!1sen!2s!4v1666804601241!5m2!1sen!2s"
            width="100%"
            height="500"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </ContactContainer>
    </CommonLayout>
  );
};

export default Contact;
