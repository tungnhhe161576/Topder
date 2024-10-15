import { BlogItemContainer } from "./styled";
import blogImage from "../../assets/images/8.3.jpg";
import dat from "../../assets/images/Dat.jpg";
import { Avatar, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const BlogItem = ({data}) => {
  const nav = useNavigate();

  return (
    <BlogItemContainer>
        <div className="blog-image">
            <div className="image-container" onClick={() => nav("/blog-detail")}>
                <img className="" src={blogImage} alt="blog-item" />
            </div>
        </div>
        <div className="blog-content">
            <div className="blog-category" onClick={() => nav("/blog-detail")}> {data?.bloggroupName} </div>
            <div className="blog-owner" onClick={() => nav("/blog-detail")}>
                <div className="blog-owner-avatar">
                    <Avatar size={56} src={<img src={dat} alt="avatar" />} />
                </div>
                <div className="blog-owner-detail">
                    <div className="name"> {data?.creatBy_Name} </div>
                    <div className="created-date"> {dayjs(data?.createDate)?.format('DD/MM/YYYY')} </div>
                </div>
            </div>
            <div className="blog-name" onClick={() => nav("/blog-detail")}>
                {data?.title}
            </div>
            <Divider className="bg-primary m-0" />
            <div className="blog-added" onClick={() => nav("/blog-detail")}>
                Xem Blog
            </div>
        </div>
    </BlogItemContainer>
  );
};

export default BlogItem;
