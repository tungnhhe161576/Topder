import { Button, Table, Form } from "antd";
import { useState } from "react";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { ManagementDiscountContainer } from "./styled";
import CreateDiscountModal from "./ModalCreateDiscount";

const ManagementDiscount = () => {
	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
	const [selectedMenuItems, setSelectedMenuItems] = useState([]);
	const [applyType, setApplyType] = useState("");
	const [scope, setScope] = useState("");

	const columns = [
		{
			title: "Discount Name",
			dataIndex: "discountName",
			key: "discountName",
		},
		{ title: "Quantity", dataIndex: "quantity", key: "quantity" },
		{ title: "Start Date", dataIndex: "startDate", key: "startDate" },
		{ title: "End Date", dataIndex: "endDate", key: "endDate" },
		{
			title: "Is Active",
			dataIndex: "isActive",
			key: "isActive",
			render: (isActive) => (isActive ? "Yes" : "No"),
		},
	];

	const handleCreateDiscount = (values) => {
		const newDiscount = {
			...values,
			startDate: values.startDate.format("DD-MM-YYYY"),
			endDate: values.endDate.format("DD-MM-YYYY"),
			menuItems: selectedMenuItems,
		};
		console.log(newDiscount);
		form.resetFields();
		setIsModalOpen(false);
	};

	const handleMenuSelect = (checkedValues) => {
		setSelectedMenuItems(checkedValues);
	};

	return (
		<RestaurantLayout>
			<ManagementDiscountContainer>
				<Button
					type="primary"
					onClick={() => setIsModalOpen(true)}
					style={{ marginBottom: 16 }}
				>
					Create Discount
				</Button>

				<Table columns={columns} dataSource={[]} />

				<CreateDiscountModal
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					selectedMenuItems={selectedMenuItems}
					setSelectedMenuItems={setSelectedMenuItems}
					isMenuModalOpen={isMenuModalOpen}
					setIsMenuModalOpen={setIsMenuModalOpen}
					handleCreateDiscount={handleCreateDiscount}
					handleMenuSelect={handleMenuSelect}
					form={form}
					applyType={applyType}
					setApplyType={setApplyType}
					scope={scope}
					setScope={setScope}
				/>
			</ManagementDiscountContainer>
		</RestaurantLayout>
	);
};

export default ManagementDiscount;
