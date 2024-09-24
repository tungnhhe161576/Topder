import React from "react";
import CommonLayout from "../../../../components/Layouts/CommonLayout";
import { Row, Col } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { BlogDetailContainer } from "./styled";
import images from "../../../../assets/images/8.3.jpg";
import { Button } from "antd/es/radio";

const BlogDetail = () => {
  return (
    <CommonLayout>
      <BlogDetailContainer>
        <div className="blog-page-container">
          <Row gutter={[48, 32]}>
            <Col xs={24} sm={24} md={16} lg={16} className="blog-content">
              <div className="blog-header">
                <div className="image-wrapper">
                  <img
                    className="blog-image"
                    src={images}
                    alt="8/3 Women's Day"
                  />
                </div>
                <div className="blog-author">
                  <div className="author-name">
                    <UserOutlined
                      style={{ marginRight: "8px", color: "#ff7f00" }}
                    />
                    Đỗ Văn Đạt
                  </div>
                  <div className="blog-date">
                    <CalendarOutlined
                      style={{ marginRight: "8px", color: "#ff7f00" }}
                    />
                    13/06/2024
                  </div>
                </div>
              </div>

              <h1 className="blog-title">
                Mùng 8 tháng 3 chúng ta nên đi ăn đâu?
              </h1>
              <p className="blog-description">
                Mùng 8 tháng 3, ngày quốc tế phụ nữ, là dịp để chúng ta tôn vinh
                và gửi lời chúc tới những người phụ nữ quan trọng trong cuộc
                đời. Và để tạo ra một bữa ăn đặc biệt và ý nghĩa, việc lựa chọn
                địa điểm ăn uống phù hợp là điều quan trọng. Dưới đây là một số
                gợi ý cho những ai đang phân vân không biết nên đi ăn đâu vào
                ngày này.
              </p>

              <h3>1. Nhà hàng Phụ Nữ Quốc Tế:</h3>
              <p>
                Những nhà hàng mang tên "Phụ Nữ Quốc Tế" thường là điều chỉ
                tưởng vào ngày này. Không chỉ là nơi thưởng thức các món ăn
                ngon, mà còn là không gian để tôn vinh vai trò và ý nghĩa của
                người phụ nữ trong xã hội.
              </p>

              <h3>2. Quán Cà Phê Sân Vườn:</h3>
              <p>
                Nếu bạn muốn tạo ra một không gian thư giãn và lãng mạn, quán cà
                phê sân vườn là sự lựa chọn hoàn hảo. Không gian xanh mát, với
                các loại thức uống ngon và nhẹ nhàng, sẽ là địa điểm lý tưởng để
                trò chuyện và tận hưởng không khí yên bình.
              </p>

              <h3>3. Nhà hàng Buffet:</h3>
              <p>
                Nhà hàng buffet là sự lựa chọn phù hợp cho những nhóm bạn thích
                thưởng thức nhiều loại món ăn khác nhau. Từ món ăn Á đến Âu, từ
                hải sản đến các món chay, bạn sẽ có thể tận hưởng một bữa tiệc
                thịnh soạn cùng bè bạn và gia đình.
              </p>

              <h3>4. Quán Ăn Nhanh Ăn Chay:</h3>
              <p>
                Nếu bạn có xu hướng ăn chay, thì các nhà hàng và tiệm ăn nhanh
                Ăn Chay là một lựa chọn tốt. Với thực đơn chay phong phú, giá cả
                phải chăng, bạn có thể tận hưởng một bữa trưa hay bữa tối bổ
                dưỡng và không kém phần ngon miệng.
              </p>

              <div className="blog-footer d-flex flex-wrap justify-content-between align-items-center">
                <span>tags:</span>
                <div className="mr-30">
                  <a href="/">Sự Kiện</a>
                </div>
              </div>
            </Col>

            <Col xs={24} sm={24} md={8} lg={8} className="blog-sidebar ">
              <div
                className="sidebar-section primary"
                style={{ backgroundColor: "#f3f7fb" }}
              >
                <h2>- Blog Mới Nhất</h2>
                <p>Chưa có blogs nào mới</p>
              </div>

              <div
                className="sidebar-section primary"
                style={{ backgroundColor: "#f3f7fb" }}
              >
                <h2>- Hashtag:</h2>
                <Button
                  type="primary"
                  className="submit"
                  shape="round"
                  style={{ borderRadius: 30 }}
                >
                  Sự kiện
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </BlogDetailContainer>
    </CommonLayout>
  );
};

export default BlogDetail;
