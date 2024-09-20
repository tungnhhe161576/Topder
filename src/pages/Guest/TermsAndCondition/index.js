import React from "react";
import CommonLayout from "../../../components/Layouts/CommonLayout";
import { PrivacyPolicyContainer } from "../PrivacyPolicy/styled";
import { FaCheckCircle } from "react-icons/fa";
import { MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
const TermAndConditon = () => {
  const nav = useNavigate();
  return (
    <CommonLayout>
      <PrivacyPolicyContainer>
        <div className="container">
          <h1 className="title">Điều Khoản Và Điều Kiện</h1>
          <p>
            Chào mừng người dùng đến với trang web của Topder. Trước khi sử dụng
            dịch vụ của Topder, vui lòng đọc kỹ các điều khoản và điều kiện sau
            đây. Người dùng cách sử dụng trang web của Topder, người dùng đồng ý
            tuân thủ và hoàn toàn chấp nhận các điều khoản và điều kiện này. Nếu
            người dùng không đồng ý với bất kỳ điều khoản nào dưới đây, vui lòng
            không tiếp tục sử dụng trang web của Topder.
          </p>

          <section>
            <h2>1. Sử Dụng Trang Web</h2>

            <ul className="container-icon">
              <li>
                <FaCheckCircle className="icon" /> Người dùng cách sử dụng trang
                web của Topder, người dùng đồng ý sử dụng nó chỉ cho các mục
                đích hợp pháp và tuân thủ tất cả các luật pháp hiện hành
              </li>
              <li>
                <FaCheckCircle className="icon" /> Người dùng không được phép sử
                dụng trang web của Topder để phạm pháp hoặc vi phạm bất kỳ quy
                định nào
              </li>
              <li>
                <FaCheckCircle className="icon" /> Topder có quyền tạm ngưng
                hoặc chấm dứt việc truy cập của người dùng vào trang web mà
                không cần thông báo trước nếu Topder nghi ngờ rằng người dùng vi
                phạm các điều khoản và điều kiện của Topder.
              </li>
            </ul>
          </section>

          <section>
            <h2>2. Bảo Vệ Thông Tin Cá Nhân</h2>
            <ul className="container-icon">
              <li>
                <FaCheckCircle className="icon" /> Topder cam kết bảo vệ thông
                tin cá nhân của người dùng và tuân thủ tất cả các quy định về
                bảo vệ dữ liệu cá nhân.
              </li>
              <li>
                <FaCheckCircle className="icon" /> Thông tin cá nhân của người
                dùng sẽ được sử dụng chỉ cho mục đích cung cấp dịch vụ và sẽ
                không được chia sẻ với bất kỳ bên thứ ba nào mà không có sự đồng
                ý của người dùng.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Thay Đổi Và Cập Nhật</h2>
            <ul className="container-icon">
              <li>
                <FaCheckCircle className="icon" />
                Topder có quyền điều chỉnh hoặc cập nhật các điều khoản và điều
                kiện này bất cứ lúc nào mà không cần thông báo trước. Việc sử
                dụng tiếp tục của người dùng sau khi các thay đổi này được đăng
                tải sẽ đồng nghĩa với việc người dùng chấp nhận các điều khoản
                và điều kiện mới.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Liên Hệ</h2>
            <ul className="container-icon">
              <li>
                <FaCheckCircle className="icon" /> Nếu người dùng có bất kỳ câu
                hỏi hoặc yêu cầu về các điều khoản và điều kiện này, vui lòng
                liên hệ với Toper qua email hoặc số điện thoại được cung cấp
                trên trang web.
              </li>
            </ul>
          </section>
          <Button onClick={() => nav("/")} className="common_btn" shape="round">
            Trang Chủ
          </Button>
        </div>
      </PrivacyPolicyContainer>
    </CommonLayout>
  );
};
export default TermAndConditon;
