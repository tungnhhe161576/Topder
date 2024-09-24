import React, { useState } from "react";
import CommonLayout from "../../../components/Layouts/CommonLayout";
import { Col, Row, Pagination, Select, Input, Button, Form } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { BlogContainer } from "./styled";
import BlogItem from "../../../components/BlogItem";

const { Option } = Select;

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
        <div className="menu_search_area">
          <Form className="menu_search_area">
            <Row gutter={16} justify="space-between" align="middle">
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item className="menu_search">
                  <Input placeholder="Tìm tên Blog" className="search-input" />
                </Form.Item>
              </Col>

              <Col xs={12} sm={8} md={8} lg={8}>
                <Form.Item className="menu_search">
                  <Select
                    defaultValue="default"
                    className="nice-select"
                    style={{ width: "100%" }}
                  >
                    <Option value="default">Loại Blog</Option>
                    <Option value="popularity">Sort by popularity</Option>
                    <Option value="rating">Sort by average rating</Option>
                    <Option value="latest">Sort by latest</Option>
                    <Option value="low-high">Sort by price: low to high</Option>
                    <Option value="high-low">Sort by price: high to low</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Search button */}
              <Col xs={12} sm={4} md={4} lg={4}>
                <Form.Item className="menu_search">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="search-button"
                  >
                    Search
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div>
          <Row gutter={[48, 32]} className="d-flex justify-content-center">
            {currentBlogs.map((blog) => (
              <Col key={blog.id} xs={12} sm={12} md={12} lg={6} xl={6}>
                <BlogItem content={blog.content} />
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
