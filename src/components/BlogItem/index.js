import { BlogItemContainer } from "./styled";
import { Avatar, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const BlogItem = ({data}) => {
  const nav = useNavigate();

  return (
    <BlogItemContainer>
        <div className="blog-image">
            <div className="image-container" onClick={() => nav("/blog-detail/" + data?.blogId)}>
                <img className="" src={data?.image} alt="blog-item" />
            </div>
        </div>
        <div className="blog-content">
            <div className="blog-category" onClick={() => nav("/blog")}> {data?.bloggroupName} </div>
            <div className="blog-owner" onClick={() => nav("/")}>
                <div className="blog-owner-avatar">
                    <Avatar size={56} src={<img src={data?.creatBy_Image} alt="avatar" />} />
                </div>
                <div className="blog-owner-detail">
                    <div className="name"> {data?.creatBy_Name} </div>
                    <div className="created-date"> {dayjs(data?.createDate)?.format('DD/MM/YYYY')} </div>
                </div>
            </div>
            <div className="blog-name" onClick={() => nav("/blog-detail/" + data?.blogId)}>
                {data?.title}
            </div>
            <Divider className="bg-primary m-0" />
            <div className="blog-added" onClick={() => nav("/blog-detail/" + data?.blogId)}>
                Xem Blog
            </div>
        </div>
    </BlogItemContainer>
  );
};

export default BlogItem;
