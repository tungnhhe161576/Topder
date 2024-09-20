import React from "react";
import image from "../../../../assets/images/footer.png";
import { FooterContainer } from "./styled";
import {
  GooglePlusOutlined,
  TikTokOutlined,
  FacebookOutlined,
  EnvironmentFilled,
  PhoneFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "antd";

const Footer = () => {
  const nav = useNavigate();

  return (
    <FooterContainer>
      <div className="footer">
        <div className="image-container">
          <img src={image} alt="footer-image" />
        </div>
        <div className="overlay"></div>
        <div className="content">
          <div className="side1">
            <div
              className="mb-15 fs-24 fw-700"
              style={{
                color: "#f57d21",
                fontStyle: "italic",
                fontFamily: "Nerko One",
              }}
            >
              Topder
            </div>
            <div>
              Topder là lựa chọn hàng đầu cho những ai muốn có một trải nghiệm
              đặt bàn ăn uống thuận tiện, hiệu quả và đáng nhớ
            </div>
            <div className="d-flex mt-35">
              <div className="icon" onClick={() => nav("/")}>
                <FacebookOutlined />
              </div>
              <div className="icon" onClick={() => nav("/")}>
                <TikTokOutlined />
              </div>
              <div className="icon" onClick={() => nav("/")}>
                <GooglePlusOutlined />
              </div>
            </div>
          </div>
          <div className="side2 ml-25">
            <div className="title">Topder</div>
            <div className="list">
              <div className="d-flex mb-20" onClick={() => nav("/")}>
                <div className="item"></div>
                <div>Trang chủ</div>
              </div>
              <div className="d-flex mb-20" onClick={() => nav("/about-us")}>
                <div className="item"></div>
                <div>Về chúng tôi</div>
              </div>
              <div className="d-flex mb-20" onClick={() => nav("/restaurant")}>
                <div className="item"></div>
                <div>Dịch vụ</div>
              </div>
            </div>
          </div>
          <div className="side3 ">
            <div className="title">Hỗ trợ</div>
            <div className="list">
              <div className="d-flex mb-20" onClick={() => nav("/contact")}>
                <div className="item"></div>
                <div>Liên hệ</div>
              </div>
              <div
                className="d-flex mb-20"
                onClick={() => nav("/privacy-policy")}
              >
                <div className="item"></div>
                <div>Chính sách bảo mật</div>
              </div>
              <div
                className="d-flex mb-20"
                onClick={() => nav("/terms-condition")}
              >
                <div className="item"></div>
                <div>Điều khoản và điều kiện</div>
              </div>
            </div>
          </div>
          <div className="side4 ml-40">
            <div className="title">Liên hệ</div>
            <div className="list">
              <div className="d-flex">
                <div>
                  <PhoneFilled className="icon" />
                </div>
                <div>0828 290 092</div>
              </div>
              <Divider style={{ background: "#f57d21" }} />
              <div className="d-flex">
                <div>
                  <PhoneFilled className="icon" />
                </div>
                <div>0931 589 123</div>
              </div>
              <Divider style={{ background: "#f57d21" }} />
              <div className="d-flex">
                <div>
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                </div>
                <div>topder.vn@gmail.com</div>
              </div>
              <Divider style={{ background: "#f57d21" }} />
              <div className="d-flex">
                <div>
                  <EnvironmentFilled className="icon" />
                </div>
                <div>
                  Khu GD&ĐT, khu CNC Hòa Lạc, KM29, Đại lộ Thăng Long, huyện
                  Thạch Thất, TP Hà Nội, Việt Nam
                </div>
              </div>
              <Divider style={{ background: "#f57d21" }} />
            </div>
          </div>
          <div className="bottom-footer">
            <div className="text">
              Copyright Topder 2024. All Rights Reserved{" "}
            </div>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;
