import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import image from "../../../../assets/images/footer.png";
import logo from "../../../../assets/images/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
const Footer = () => {
  return (
    <>
      <footer style={{ backgroundImage: `url(${image})` }}>
        <div class="footer_overlay pt_100 xs_pt_70 pb_100 xs_pb_20">
          <div class="container wow fadeInUp" data-wow-duration="1s">
            <div class="row justify-content-between">
              <div class="col-xxl-4 col-lg-4 col-sm-9 col-md-7">
                <div class="footer_content">
                  <a class="footer_logo" href="/">
                    <img src={logo} alt="Topder" class="img-fluid w-100" />
                  </a>
                  <span>
                    Topder là lựa chọn hàng đầu cho những ai muốn có một trải
                    nghiệm đặt bàn ăn uống thuận tiện, hiểu quả và đáng nhớ.
                  </span>
                  <ul class="social_link d-flex flex-wrap">
                    <li>
                      <a href="https://www.facebook.com/TopderVietnam">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fab fa-tiktok"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fab fa-google-plus-g"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xxl-2 col-lg-2 col-sm-5 col-md-5">
                <div class="footer_content">
                  <h3>Toper</h3>
                  <ul>
                    <li>
                      <a href="#">Trang Chủ</a>
                    </li>
                    <li>
                      <a href="#">Về Chúng Tôi</a>
                    </li>
                    <li>
                      <a href="#">Dịch vụ</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xxl-2 col-lg-2 col-sm-6 col-md-5 order-md-4">
                <div class="footer_content">
                  <h3>Hỗ trợ</h3>
                  <ul>
                    <li>
                      <a href="#">Liên Hệ</a>
                    </li>
                    <li>
                      <a href="#">Chính Sách & Bảo Mật</a>
                    </li>
                    <li>
                      <a href="#">Điều Khoản Và Điều Kiện</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xxl-3 col-lg-4 col-sm-9 col-md-7 order-lg-4">
                <div class="footer_content">
                  <h3>Liên Hệ</h3>
                  <p class="info">
                    <i class="fas fa-phone-alt"></i> 0399329525
                  </p>
                  <p class="info">
                    <i class="fas fa-phone-alt"></i> 0828290092
                  </p>
                  <p class="info">
                    <i class="fas fa-envelope"></i> topder.vn@gmail.com
                  </p>
                  <p class="info">
                    <i class="far fa-map-marker-alt"></i> Khu Giáo dục và Đào
                    tạo – Khu Công nghệ cao Hòa Lạc – Km29 Đại lộ Thăng Long,
                    Thạch Thất, TP. HN
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer_bottom d-flex flex-wrap">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="footer_bottom_text">
                  <p>
                    Copyright ©<b> Topder 2024</b> 2023. All Rights Reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
