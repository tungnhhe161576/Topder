import {
	Button,
	Input,
	Table,
	Switch,
	Select,
	Form,
	message,
} from "antd";
import { useState } from "react";
import SpinCustom from '../../../../components/Common/SpinCustom'
import "react-quill/dist/quill.snow.css";
import { BlogContainer } from "./styled";
import dayjs from "dayjs";
import ModalDeleteBlog from "./Modal/ModalDeleteBlog";
import ModalUpdateBlog from "./Modal/ModalUpdateBlog";
import ModalCreateBlog from "./Modal/ModalCreateBlog";
import ModalViewDetail from "./Modal/ModalViewDetail";
import AdminService from "../../../../services/AdminService";

const { Option } = Select;

const AllBlogs = ({blogs, loading, setDataSearch, getAllBlog, blogCategory}) => {
	const [openModalDeleteBlog, setOpenModalDeleteBlog] = useState(false)
	const [openModalUpdateBlog, setOpenModalUpdateBlog] = useState(false)
	const [openModalCreateBlog, setOpenModalCreateBlog] = useState(false)
	const [openModalViewDetail, setOpenModalViewDetail] = useState(false)
	const [form] = Form.useForm()


	const handleSearch = async () => {
		try {
			const formValues = await form.validateFields();
			setDataSearch(prev => ({
				...prev,
				title: formValues.title,
				blogGroupId: formValues.category,
			}));
		} catch (error) {
			console.log(error);
		}
	};

	const handleActive = async (record) => {
		try {
			await AdminService.activeBlog(record?.blogId, record?.status === 'Active' ? 'In-Active' : 'Active')
			message.open({
                content: 'Cập nhật trạng thái thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
			getAllBlog()
		} catch (error) {
			message.open({
                content: 'Cập nhật trạng thái thất bại!',
                type: 'error',
                style: {
                    marginTop: '10vh',
                },
            })
		}
	}

	const columns = [
		{
			title: 'STT',
			dataIndex: 'number',
			key: 'number',
			render: (_, __, index) => <span className="fs-15"> {index + 1} </span>,
		},
		{
			title: "Tên",
			dataIndex: "title",
			key: "title",
			width: 150,
		},
		{
			title: "Ảnh",
			dataIndex: "image",
			key: "image",
			render: (text) => (
				<img src={text} alt="Blog" width='100px'/>
			),
		},
		{
			title: "Ngày tạo",
			dataIndex: "createDate",
			key: "createDate",
			sorter: (a, b) => dayjs(a.createDate).unix() - dayjs(b.createDate).unix(),
			render: (value) => <span> {dayjs(value).format('DD-MM-YYYY')} </span>
		},
		{
			title: "Loại bài viết",
			dataIndex: "bloggroupName",
			key: "bloggroupName",
		},
		{
			title: "Nội dung",
			dataIndex: "content",
			key: "content",
			width: 500,
			render: (value) => (
				<div style={{maxHeight: '150px', overflowY: 'auto'}} dangerouslySetInnerHTML={{ __html: value }} />
			)
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			render: (value, record) => (
				<Switch
					checked={value === 'Active' ? true : false}
					onChange={() => {
						// setDataSource((prev) =>
						// 	prev.map((item) =>
						// 		item.key === record.key
						// 			? { ...item, status: checked }
						// 			: item
						// 	)
						// );
						handleActive(record)
					}}
				/>
			),
		},
		{
			title: "",
			dataIndex: "",
			key: "action",
			render: (text, record) => (
				<div className="d-flex">
					<Button
						type="primary"
						shape="round"
						className="mr-3"
						onClick={() => setOpenModalViewDetail(record)}
					>
						Chi tiết
					</Button>
					<Button
						className="mr-3"
						type="primary"
						shape="round"
						onClick={() => setOpenModalUpdateBlog(record)}
					>
						Chỉnh sửa
					</Button>
					<Button
						type="primary"
						shape="round"
						danger
						onClick={() => setOpenModalDeleteBlog(record)}
					>
						Xóa
					</Button>
				</div>
			),
		},
	];


	return (
		<BlogContainer>
			<div>
				<div className="d-flex align-items-center justify-content-space-between">
					<div>
						<Button
							className="pl-20"
							type="primary"
							onClick={() => setOpenModalCreateBlog(true)}
						>
							Tạo bài viết
						</Button>
					</div>

					<div className="pr-20">
						<Form form={form} className="d-flex align-items-center">
							<Form.Item name='title' className="mr-10 search-text" style={{width: '500px'}}>
								<Input placeholder="Tên bài viết" allowClear className="input-text w-100"/>
							</Form.Item>
							<Form.Item name="category" className="mr-40 menu_search" style={{width: '250px'}}>
								<Select className="nice-select w-100" allowClear  placeholder="Chọn loại bài viết">
									{
										blogCategory?.map(i => (
											<Option key={i?.bloggroupId} value={i?.bloggroupId}>
												{i?.bloggroupName}
											</Option>
										))
									}
								</Select>
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

				<div className="mt-20">
					<SpinCustom spinning={loading}>
						<Table
							dataSource={blogs}
							columns={columns}
							rowKey="key"
							pagination={{ pageSize: 4 }}
						/>
					</SpinCustom>
				</div>
			</div>


			{!!openModalDeleteBlog && (
				<ModalDeleteBlog
					open={openModalDeleteBlog}
					onCancel={() => setOpenModalDeleteBlog(false)}
					onOk={getAllBlog}
				/>
			)}
			{!!openModalUpdateBlog && (
				<ModalUpdateBlog
					open={openModalUpdateBlog}
					onCancel={() => setOpenModalUpdateBlog(false)}
					onOk={getAllBlog}
					blogCategory={blogCategory}
				/>
			)}
			{!!openModalCreateBlog && (
				<ModalCreateBlog
					open={openModalCreateBlog}
					onCancel={() => setOpenModalCreateBlog(false)}
					onOk={getAllBlog}
					blogCategory={blogCategory}
				/>
			)}
			{!!openModalViewDetail && (
				<ModalViewDetail
					open={openModalViewDetail}
					onCancel={() => setOpenModalViewDetail(false)}
				/>
			)}
		</BlogContainer>
	);
};

export default AllBlogs;
