import { BlogItemContainer } from "./styled";
import blogImage from "../../assets/images/8.3.jpg";
import dat from "../../assets/images/Dat.jpg";
import { Avatar, Divider } from "antd";
import { useNavigate } from "react-router-dom";

const BlogItem = () => {
  const nav = useNavigate();

  return (
    <BlogItemContainer>
      <div className="blog-image">
        <div className="image-container" onClick={() => nav("/blog-detail")}>
          <img className="" src={blogImage} alt="blog-item" />
        </div>
      </div>
      <div className="blog-content">
        <div className="blog-category" onClick={() => nav("/blog-detail")}>
          Sự kiện
        </div>
        <div className="blog-owner" onClick={() => nav("/blog-detail")}>
          <div className="blog-owner-avatar">
            <Avatar size={56} src={<img src={dat} alt="avatar" />} />
          </div>
          <div className="blog-owner-detail">
            <div className="name"> Đỗ Văn Đạt </div>
            <div className="created-date"> 13/06/2024 </div>
          </div>
        </div>
        <div className="blog-name" onClick={() => nav("/blog-detail")}>
          Mùng 8 Tháng 3 Chúng Ta Nên Đi Ăn Ở Đâu ?
        </div>
        <Divider className="bg-primary m-0" />
        <div className="blog-added" onClick={() => nav("/blog-detail")}>
          {" "}
          Xem Blog{" "}
        </div>
      </div>
    </BlogItemContainer>
  );
};

export default BlogItem;
