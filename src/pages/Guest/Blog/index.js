import React, { useEffect, useState } from "react";
import CommonLayout from "../../../components/Layouts/CommonLayout";
import { Col, Row, Pagination, Select, Input, Button, Form } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { BlogContainer } from "./styled";
import BlogItem from "../../../components/BlogItem";
import GuestService from "../../../services/GuestService";
import SpinCustom from "../../../components/Common/SpinCustom";

const { Option } = Select;

const Blog = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [blogs, setBlogs] = useState([]);
	const [dataSearch, setDataSearch] = useState({
		blogGroupId: undefined,
		title: "",
		pageNumber: 1,
		pageSize: 8,
	});
	const [blogCategory, setBlogCategory] = useState([]);

	const handleSearch = async () => {
		try {
			setLoading(true);
			const formValues = await form.validateFields();
			setDataSearch((prev) => ({
				...prev,
				blogGroupId: formValues?.category,
				title: formValues?.title,
			}));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await GuestService.getAllBlog(dataSearch);
				setBlogs(res?.items);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [dataSearch]);

	const getBlogCategory = async () => {
		try {
			const res = await GuestService.getBlogCategory();
			setBlogCategory(res);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getBlogCategory();
	}, []);

	return (
		<CommonLayout>
			<BlogContainer>
				<Form form={form} className="menu_search_area">
					<Row gutter={16} justify="center" align="middle">
						<Col span={13}>
							<Form.Item name="title" className="menu_search">
								<Input
									placeholder="Tìm tên Blog"
									className="search-input"
								/>
							</Form.Item>
						</Col>

						<Col span={5}>
							<Form.Item name="category" className="menu_search">
								<Select
									className="nice-select"
									allowClear
									placeholder="Chọn thể loại bài viết"
								>
									{blogCategory?.map((bc) => (
										<Option
											key={bc?.bloggroupId}
											value={bc?.bloggroupId}
										>
											{bc?.bloggroupName}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>

						<Col span={2}>
							<Form.Item className="menu_search">
								<Button
									type="primary"
									htmlType="submit"
									className="search-button"
									onClick={() => handleSearch()}
								>
									Tìm kiếm
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
				<div className="mt-30">
					<SpinCustom spinning={loading}>
						{blogs?.length === 0 ? (
							<div className="d-flex justify-content-center fs-18 red fw-500">
								{" "}
								Không có dữ liệu{" "}
							</div>
						) : (
							<Row
								gutter={[24, 32]}
								className="d-flex justify-content-center"
							>
								{blogs?.map((blog) => (
									<Col
										key={blog.blogId}
										xs={12}
										sm={12}
										md={12}
										lg={6}
										xl={6}
									>
										<BlogItem data={blog} />
									</Col>
								))}
							</Row>
						)}
					</SpinCustom>
				</div>
			</BlogContainer>
		</CommonLayout>
	);
};

export default Blog;
