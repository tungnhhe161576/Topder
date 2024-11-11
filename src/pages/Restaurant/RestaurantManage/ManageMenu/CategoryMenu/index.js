import { Button, Table } from "antd";
import SpinCustom from "../../../../../components/Common/SpinCustom";
import { useEffect, useState } from "react";
import UserService from "../../../../../services/UserService";
import ModalDeleteCategoryMenu from "./Modal/ModalDelete";
import ModalCreate from "./Modal/ModalCreate";
import ModalUpdate from "./Modal/ModalUpdate";

const CategoryMenu = ({user, getMenus}) => {
	const [loading, setLoading] = useState(false)
	const [openModalCreateCategory, setOpenModalCreateCategory] = useState(false)
	const [openModalUpdateCategory, setOpenModalUpdateCategory] = useState(false)
	const [openModalDeleteCategory, setOpenModalDeleteCategory] = useState(false)
	const [categories, setCategories] = useState([])

	const getAllCategories = async () => {
        try {
			setLoading(true)
            const res = await UserService.getAllCategoryMenu(user?.uid)
            setCategories(res)
        } catch (error) {
			console.log(error);
        } finally {
			setLoading(false)
		}
    }
    useEffect(() => {
		if (!!user) {
			getAllCategories()
		}
    }, [user])
	
	const columns = [
		{
			title: "STT",
			dataIndex: "number",
			key: "number",
			render: (_, __, index) => <span className="fs-15"> {index+1} </span>,
		},
		{
			title: "Loại món ăn",
			dataIndex: "categoryMenuName",
			key: "categoryMenuName",
			align: 'center',
			render: (value) => <span className="fs-14"> {value} </span>,
		},
		{
			title: "",
			key: "note",
			align: 'center',
			render: (_, record) => (
				<div className="d-flex justify-content-center">
					<Button
						className="mr-10"
						type="primary"
						shape="round"
						onClick={() => setOpenModalUpdateCategory(record)}
					>
						Chỉnh sửa
					</Button>
					<Button
						type="primary"
						danger
						shape="round"
						onClick={() => setOpenModalDeleteCategory(record)}
					>
						Xóa
					</Button>
				</div>
			),
		},
	];
	
	return (
		<SpinCustom spinning={loading}>
			<div>
				<div className="d-flex justify-content-space-between mt-20 mb-30">
					<div className="d-flex">
						<Button className="mr-10" type="primary" onClick={() => setOpenModalCreateCategory(true)}>
							Tạo loại món mới
						</Button>
					</div>
				</div>
				<div className="table">
					<Table
						columns={columns}
						dataSource={categories}
						bordered={false}
						pagination={{ pageSize: 5 }}
					/>
				</div>
			</div>

			{!!openModalDeleteCategory && (
				<ModalDeleteCategoryMenu
					open={openModalDeleteCategory}
					onCancel={() => setOpenModalDeleteCategory(false)}
					onOk={getAllCategories}
					getMenus={getMenus}
				/>
			)}
			{!!openModalUpdateCategory && (
				<ModalUpdate
					open={openModalUpdateCategory}
					onCancel={() => setOpenModalUpdateCategory(false)}
					onOk={getAllCategories}
					getMenus={getMenus}
					userId={user?.uid}
				/>
			)}
			{!!openModalCreateCategory && (
				<ModalCreate
					open={openModalCreateCategory}
					onCancel={() => setOpenModalCreateCategory(false)}
					onOk={getAllCategories}
					userId={user?.uid}
				/>
			)}
		</SpinCustom>
	)
};
export default CategoryMenu;
