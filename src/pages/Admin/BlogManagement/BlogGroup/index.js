import { Button, Col, Form, Input, message, Modal, Row, Table } from "antd";
import { BlogContainer } from "../Blog/styled";
import { useEffect, useState } from "react";
import SpinCustom from "../../../../components/Common/SpinCustom";
import ModalDeleteCategory from "./Modal/ModalDelete";
import ModalCreateCategory from "./Modal/ModalCreate";
import ModalUpdateCategory from "./Modal/ModalUpdate";
import { BlogGroupContainer } from "./styled";

const BlogGroup = ({blogCategory, getAllBlogCategory, getAllBlog, loading, setDataCategorySearch}) => {
	const [openModalDeleteCategory, setOpenModalDeleteCategory] = useState(false)
	const [openModalCreateCategory, setOpenModalCreateCategory] = useState(false)
	const [openModalUpdateCategory, setOpenModalUpdateCategory] = useState(false)
	const [form] = Form.useForm();

	const handleSearch = async () => {
		try {
			const formValues = await form.validateFields();
			setDataCategorySearch(prev => ({
				...prev,
				blogGroupName: formValues.title,
			}));
		} catch (error) {
			console.log(error);
		}
	};
	

	const columns = [
		{
			title: "STT",
			dataIndex: "number",
			key: "number",
			render: (_, __, index) => (<div className="fs-16 fw-500">{index+1}</div>)
		},
		{
			title: "Tên",
			dataIndex: "bloggroupName",
			key: "bloggroupName",
		},
		{
			title: "Hành động",
			dataIndex: "",
			key: "action",
			render: (text, record) => (
				<div className="d-flex align-items-center">
					<Button
						shape="round"
						className="mr-10"
						type="primary"
						onClick={() => setOpenModalUpdateCategory(record)}
					>
						Chỉnh sửa
					</Button>
					<Button
						shape="round"
						type="primary"
						danger
						onClick={() => setOpenModalDeleteCategory(record)}
					>
						Xóa
					</Button>
				</div>
			),
		},
	];



	return (
		<BlogGroupContainer>
			<div>
				<div className="d-flex justify-content-space-between align-items-center">
					<div className="pl-20">
						<Button
							type="primary"
							style={{ height: 40 }}
							onClick={() => setOpenModalCreateCategory(true)}
						>
							Thêm loại bài viết
						</Button>
					</div>
					<div className="pr-20">
						<Form form={form} className="d-flex align-items-center">
							<Form.Item name='title' className="mr-10 search-text" style={{width: '400px'}}>
								<Input placeholder="Tìm theo tiêu đề" allowClear className="input-text w-100"/>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									className="btn menu_search"
									onClick={() => handleSearch()}
								>
									TÌm kiếm
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>

				<div className="mt-30">
					<SpinCustom spinning={loading}>
						<Table
							dataSource={blogCategory}
							columns={columns}
							rowKey="key"
							pagination={{ pageSize: 5 }}
						/>
					</SpinCustom>
				</div>
			</div>

			{!!openModalDeleteCategory && (
				<ModalDeleteCategory
					open={openModalDeleteCategory}
					onCancel={() => setOpenModalDeleteCategory(false)}
					onOk={getAllBlogCategory}
					getAllBlog={getAllBlog}
				/>
			)}
			{!!openModalCreateCategory && (
				<ModalCreateCategory
					open={openModalCreateCategory}
					onCancel={() => setOpenModalCreateCategory(false)}
					onOk={getAllBlogCategory}
				/>
			)}
			{!!openModalUpdateCategory && (
				<ModalUpdateCategory
					open={openModalUpdateCategory}
					onCancel={() => setOpenModalUpdateCategory(false)}
					onOk={getAllBlogCategory}
					getAllBlog={getAllBlog}
				/>
			)}

		</BlogGroupContainer>
	);
};
export default BlogGroup;
