import React, { useEffect, useState } from "react";
import CommonLayout from "../../../../components/Layouts/CommonLayout";
import { Row, Col, Avatar } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { BlogDetailContainer } from "./styled";
import { Button } from "antd/es/radio";
import { useNavigate, useParams } from "react-router-dom";
import GuestService from "../../../../services/GuestService";
import SpinCustom from "../../../../components/Common/SpinCustom";
import dayjs from "dayjs";

const BlogDetail = () => {
  const  {blogId} = useParams()
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const [blogDetail, setBlogDetail] = useState()

  const getBlogDetail = async () => {
    try {
      setLoading(true)
      const res = await GuestService.getBlogDetail(blogId)
      setBlogDetail(res)
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBlogDetail()
  }, [blogId])

  console.log("blogDetail", blogDetail);
  
  return (
    <CommonLayout>
      <BlogDetailContainer>
        <SpinCustom spinning={loading}>
          <div className="blog-page-container">
            <Row gutter={[48, 32]}>
              <Col xs={24} sm={24} md={16} lg={16} className="blog-content">
                <div className="blog-header">
                  <div className="image-wrapper">
                    <img
                      className="blog-image"
                      src={blogDetail?.blogListCustomer?.image}
                      alt="img"
                    />
                  </div>
                  <div className="blog-author">
                    <div className="author-name">
                      <UserOutlined
                        style={{ marginRight: "8px", color: "#ff7f00" }}
                      />
                      {blogDetail?.blogListCustomer?.creatBy_Name}
                    </div>
                    <div className="blog-date">
                      <CalendarOutlined
                        style={{ marginRight: "8px", color: "#ff7f00" }}
                      />
                      {dayjs(blogDetail?.blogListCustomer?.createDate).format('DD-MM-YYYY')}
                    </div>
                  </div>
                </div>

                <h1 className="blog-title">
                  {blogDetail?.blogListCustomer?.title}
                </h1>
                <p className="blog-description">
                  {blogDetail?.blogListCustomer?.content ? (
                      <div dangerouslySetInnerHTML={{ __html: blogDetail?.blogListCustomer?.content }} />
                  ) : (
                      'Không có nội dung'
                  )}
                  {/* {blogDetail?.blogListCustomer?.content} */}
                </p>

                <div className="blog-footer d-flex flex-wrap justify-content-between align-items-center">
                  <span>tags:</span>
                  <div className="mr-30" style={{cursor: 'pointer'}}>
                    <p onClick={() => nav('/blog')}>{blogDetail?.blogListCustomer?.bloggroupName}</p>
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={24} md={8} lg={8} className="blog-sidebar ">
                <div
                  className="sidebar-section primary"
                  style={{ backgroundColor: "#f3f7fb" }}
                >
                  <h2>- Blog Mới Nhất</h2>
                  <div>
                    {
                      blogDetail?.newBlogCustomers.map(nb => (
                        <div className="d-flex align-items-center mb-15" style={{cursor: 'pointer'}} onClick={() => nav('/blog-detail/' + nb?.blogId)}>
                          <div className="mr-20">
                            <Avatar size={56} src={<img src={nb?.image} alt="newblog" />} />
                          </div>
                          <div>
                            <div className="fw-500 fs-15 mb-5" style={{color: 'black'}}>{nb?.title}</div>
                            <div className="fs-13" style={{color: '#7a7b7c'}}>{dayjs(nb?.createDate).format('DD-MM-YYYY')}</div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div
                  className="sidebar-section primary"
                  style={{ backgroundColor: "#f3f7fb" }}
                >
                  <h2>- Hashtag:</h2>
                  {
                    blogDetail?.blogGroups?.map(bg => (
                      <Button
                        key={bg?.bloggroupId}
                        type="primary"
                        className="submit"
                        shape="round"
                        style={{ borderRadius: 30 }}
                        onClick={() => nav('/blog')}
                      >
                        {bg?.bloggroupName}
                      </Button>
                    ))
                  }
                </div>
              </Col>
            </Row>
          </div>
        </SpinCustom>
      </BlogDetailContainer>
    </CommonLayout>
  );
};

export default BlogDetail;
