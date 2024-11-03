import { Tabs } from "antd";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import { BlogManagementContainer } from "./styled";
import Blog from "../BlogManagement/Blog";
import BlogGroup from "../BlogManagement/BlogGroup";

const BlogManagement = () => {
	return (
		<AdminLayout>
			<BlogManagementContainer>
				<div className="body">
					<div className="title">
						{/* <h3 className="card-title card-title-dash">
							Quản lý nhà hàng
						</h3> */}
					</div>
					<Tabs
						type="card"
						items={[
							{
								label: "Blog",
								key: "1",
								children: <Blog />,
							},
							{
								label: "Loại Blog",
								key: "2",
								children: <BlogGroup />,
							},
						]}
					/>
				</div>
			</BlogManagementContainer>
		</AdminLayout>
	);
};

export default BlogManagement;
