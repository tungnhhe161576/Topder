import { Tabs } from "antd";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import { BlogManagementContainer } from "./styled";
import BlogGroup from "../BlogManagement/BlogGroup";
import AllBlogs from "./Blog";
import { useEffect, useState } from "react";
import AdminService from "../../../services/AdminService";

const BlogManagement = () => {
	const [loading, setLoading] = useState(false)
	const [dataSearch, setDataSearch] = useState({
		pageNumber: 1,
		pageSize: 10000,
		blogGroupId: undefined,
		title: ''
	})
	const [dataCategorySearch, setDataCategorySearch] = useState({
		pageNumber: 1,
		pageSize: 10000,
		blogGroupName: ''
	})
	const [blogs, setBlogs] = useState([])
	const [blogCategory, setBlogCategory] = useState([])

	const getAllBlog = async () => {
		try {
			setLoading(true)
			const res = await AdminService.getAllBlog(dataSearch)
			setBlogs(res.items)
		} catch (error) {	
			console.log(error);
		} finally {
			setLoading(false)
		}
	}
	
	const getAllBlogCategory = async () => {
		try {
			setLoading(true)
			const res = await AdminService.getCategoryBLog(dataCategorySearch)
			setBlogCategory(res.items)
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getAllBlog()
	}, [dataSearch])
	
	useEffect(() => {
		getAllBlogCategory()
	}, [dataCategorySearch])
	
	return (
		<AdminLayout>
			<BlogManagementContainer>
				<div className="body">
					<Tabs
						type="card"
						items={[
							{
								label: "Blog",
								key: "1",
								children: <AllBlogs blogs={blogs} loading={loading} setDataSearch={setDataSearch} getAllBlog={getAllBlog} blogCategory={blogCategory}/>,
							},
							{
								label: "Loại Blog",
								key: "2",
								children: <BlogGroup blogCategory={blogCategory} getAllBlogCategory={getAllBlogCategory} getAllBlog={getAllBlog} loading={loading} setDataCategorySearch={setDataCategorySearch}/>,
							},
						]}
					/>
				</div>
			</BlogManagementContainer>
		</AdminLayout>
	);
};

export default BlogManagement;
