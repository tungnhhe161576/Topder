import React, { useState } from "react";
import CommonLayout from "../../../components/Layouts/CommonLayout";
import { Col, Row, Pagination } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { BlogContainer } from "./styled";
import BlogItem from "../../../components/BlogItem";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalBlogs = 19;
  const blogsPerPage = 8;

  const blogItems = new Array(totalBlogs).fill(null).map((_, index) => ({
    id: index + 1,
    content: `Blog Content ${index + 1}`,
  }));

  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = blogItems.slice(startIndex, startIndex + blogsPerPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <CommonLayout>
      <BlogContainer>
        <div>
          <Row gutter={[24, 24]} className="d-flex justify-content-center">
            {currentBlogs.map((blog, index) => (
              <Col key={blog.id} xs={12} sm={12} md={12} lg={6} xl={6}>
                <BlogItem content={blog.content} />{" "}
              </Col>
            ))}
          </Row>
          <Row
            justify="center"
            align="middle"
            style={{ marginTop: 50 }}
            className="pagination"
          >
            <Col span={12}>
              <Pagination
                className="custom-pagination"
                itemRender={(page, type, originalElement) => {
                  if (type === "prev") {
                    return <LeftOutlined />;
                  }
                  if (type === "next") {
                    return <RightOutlined />;
                  }
                  return originalElement;
                }}
                defaultCurrent={1}
                current={currentPage}
                pageSize={blogsPerPage}
                total={totalBlogs}
                onChange={onPageChange}
              />
            </Col>
          </Row>
        </div>
      </BlogContainer>
    </CommonLayout>
  );
};

export default Blog;
