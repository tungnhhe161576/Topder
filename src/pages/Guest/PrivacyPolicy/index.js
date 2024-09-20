import React from "react";
import CommonLayout from "../../../components/Layouts/CommonLayout";
import { PrivacyPolicyContainer } from "./styled";
import { FaCheckCircle } from "react-icons/fa";
import { MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
const PrivacyPolicy = () => {
  const nav = useNavigate();
  return (
    <CommonLayout>
      <PrivacyPolicyContainer>
        <div className="container">
          <h1 className="title">Giới Thiệu</h1>
          <p>
            Topder cam kết bảo vệ quyền riêng tư của người dùng khi sử dụng dịch
            vụ của Topder. Chính sách bảo mật này giải thích cách website thu
            nhập, sử dụng và bảo vệ thông tin cá nhân của người dùng. Khi sử
            dụng dịch vụ của Topder, người dùng đồng ý với các điều khoản trong
            Chính sách bảo mật này.
          </p>

          <section>
            <h2>1. Thông Tin Chúng Tôi Thu Thập</h2>

            <p>
              Chúng tôi thu nhập thông tin cá nhân mà bạn cung cấp trực tiếp khi
              đăng ký tài khoản, đặt bàn, hoặc liên hệ với websie. Thông tin này
              bao gồm nhưng không giới hạn ở:
            </p>

            <ul>
              <li>
                <FaCheckCircle className="icon" /> Họ và tên
              </li>
              <li>
                <FaCheckCircle className="icon" /> Địa chỉ email
              </li>
              <li>
                <FaCheckCircle className="icon" /> Số điện thoại
              </li>
              <li>
                <FaCheckCircle className="icon" /> Sinh nhật
              </li>
            </ul>
          </section>

          <section>
            <h2>2. Cách Chúng Tôi Sử Dụng Thông Tin</h2>
            <p>
              Cung cấp và cải thiện dịch vụ: Website sử dụng thông tin cá nhân
              của người dùng để cung cấp dịch vụ người dùng, gửi thông báo xác
              nhận và cải hiện trải nghiệm người dùng.
            </p>
            <p>
              Gửi thông báo và khuyến mãi: Với sự đồng ý của người dùng, website
              sẽ gửi email và tin nhắn về các ưu đãi, khuyến mãi đặc biệt và các
              thông tin cập nhật từ Topder.
            </p>
            <p>
              Phân tích và nghiên cứu: Website sử dụng thông tin để phân tích
              hành vi người dùng nhằm cải thiện dịch vụ và phát triển các tính
              năng mới.
            </p>
          </section>

          <section>
            <h2>3. Chia Sẻ Thông Tin Của Bạn</h2>
            <p>
              Đối tác nhà hàng: Website cần chia sẻ thông tin cần thiết với các
              đối tác nhà hàng để xác nhận và hoàn thành việc đặt dịch vụ của
              người dùng.
            </p>
            <p>
              Tuân thủ pháp luật: Website có thể tiết lộ thông tin của người
              dùng khi cần thiết để tuân thủ các quy định của pháp luật hoặc yêu
              cầu từ cơ quan chính phủ.
            </p>
          </section>

          <section>
            <h2>4. Bảo Mật Thông Tin</h2>
            <p>
              Website áp dụng các biện pháp kỹ thuật và tổ chức để bảo vệ thông
              tin cá nhân của người dùng khỏi mất mát, truy cập trái phép, sử
              dụng sai mục đích hoặc tiết lộ.
            </p>
          </section>

          <section>
            <h2>5. Quyền Của Bạn</h2>
            <p>
              Truy cập và chỉnh sửa thông tin: Người dùng có quyền truy cập và
              yêu cầu chỉnh sửa thông tin cá nhân của mình bất cứ lúc nào bằng
              cách đăng nhập vào tài khoản người dùng hoặc liên hệ với websie.
            </p>
            <p>
              Xóa thông tin: Người dùng có thể yêu cầu websie xóa thông tin cá
              nhân của người dùng, trừ khi websie có nghĩa vụ pháp lý phải giữ
              lại thông tin đó.
            </p>
          </section>

          <section>
            <h2>6. Liên Hệ Chúng Tôi</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào hoặc yêu cầu nào liên quan đến Chính
              sách bảo mật này, vui lòng liên hệ với chung tôi qua:
            </p>
            <p>
              <MailOutlined className="icon" /> Email: support@topder.vn
            </p>
            <p>
              <EnvironmentOutlined className="icon" /> Địa chỉ: Khu Công Nghiệp
              Cao Hòa Lạc, Km29, Đại Lộ Thăng Long, Hà Nội
            </p>
            <p>
              Chính sách Bảo mật này có thể được cập nhật thường xuyên để phản
              ánh các thay đổi trong hoạt động của chúng tôi hoặc các yêu cầu
              pháp lý. Mọi thay đổi sẽ được thông báo trên trang websie của
              chúng tôi và có hiệu lực ngay khi được đăng tải.
            </p>
          </section>
          <Button onClick={() => nav("/")} className="common_btn" shape="round">
            Trang Chủ
          </Button>
        </div>
      </PrivacyPolicyContainer>
    </CommonLayout>
  );
};
export default PrivacyPolicy;
