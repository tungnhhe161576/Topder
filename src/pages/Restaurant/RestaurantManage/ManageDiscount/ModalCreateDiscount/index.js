import {
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Modal,
	Row,
	Select,
	Checkbox,
} from "antd";
import { useState } from "react";
import moment from "moment";

const { Option } = Select;

const CreateDiscountModal = ({
	isModalOpen,
	setIsModalOpen,
	selectedMenuItems,
	setSelectedMenuItems,
	isMenuModalOpen,
	setIsMenuModalOpen,
	handleCreateDiscount,
	handleMenuSelect,
	form,
	applyType,
	setApplyType,
	scope,
	setScope,
}) => {
	const menuItems = [
		{ label: "Pizza Margherita", value: "Pizza Margherita" },
		{ label: "Spaghetti Carbonara", value: "Spaghetti Carbonara" },
		{ label: "Caesar Salad", value: "Caesar Salad" },
		{ label: "Grilled Chicken", value: "Grilled Chicken" },
	];
	const resetStates = () => {
		setSelectedMenuItems([]);
		setApplyType("");
		setScope("");
	};
	const handleCancel = () => {
		form.resetFields();
	};

	return (
		<>
			{/* Main Discount Modal */}
			<Modal
				title="Create Discount"
				open={isModalOpen}
				width={700}
				onCancel={() => {
					handleCancel();
					setIsModalOpen(false);
				}}
				footer={null}
			>
				<Form
					form={form}
					onFinish={(values) => {
						handleCreateDiscount(values);
						resetStates(); // Reset states after creating discount
					}}
					layout="vertical"
				>
					<Row gutter={24}>
						<Col span={12}>
							<Form.Item
								label="Discount Name"
								name="discountName"
								rules={[
									{
										required: true,
										message:
											"Please enter the discount name!",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Quantity"
								name="quantity"
								rules={[
									{
										required: true,
										message: "Please enter the quantity!",
									},
								]}
							>
								<InputNumber
									min={1}
									style={{ width: "100%" }}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={24}>
						<Col span={12}>
							<Form.Item
								label="Start Date"
								name="startDate"
								rules={[
									{
										required: true,
										message:
											"Please select the start date!",
									},
								]}
							>
								<DatePicker
									style={{ width: "100%" }}
									format={"DD/MM/YYYY"} // Format ngày
									onChange={(date) => {
										form.setFieldsValue({
											startDate: date,
										});
										// Force validation check for endDate when startDate changes
										form.validateFields(["endDate"]);
									}}
									max
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="End Date"
								name="endDate"
								rules={[
									{
										required: true,
										message: "Please select the end date!",
									},
									// ({ getFieldValue }) => ({
									// 	validator(_, value) {
									// 		const startDate =
									// 			getFieldValue("startDate");
									// 		if (
									// 			!value ||
									// 			!startDate ||
									// 			value.isAfter(startDate)
									// 		) {
									// 			return Promise.resolve();
									// 		}
									// 		return Promise.reject(
									// 			new Error(
									// 				"End date must be after start date!"
									// 			)
									// 		);
									// 	},
									// }),
								]}
							>
								<DatePicker
									style={{ width: "100%" }}
									format={"DD/MM/YYYY"} // Format ngày
									disabledDate={(current) => {
										// Disable dates before start date
										const startDate =
											form.getFieldValue("startDate");
										return startDate
											? current.isBefore(
													moment(
														startDate,
														"DD/MM/YYYY"
													)
											  )
											: false;
									}}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item
						label="Apply To"
						name="applyTo"
						rules={[
							{
								required: true,
								message:
									"Please select who this discount applies to!",
							},
						]}
					>
						<Select placeholder="Select Customer Type">
							<Option value="NEW_CUSTOMERS">New Customers</Option>
							<Option value="ALL_CUSTOMERS">All Customers</Option>
							<Option value="LOYAL_CUSTOMERS">
								Loyal Customers
							</Option>
						</Select>
					</Form.Item>

					<Form.Item
						label="Apply Type"
						name="applyType"
						rules={[
							{
								required: true,
								message: "Please select an apply type!",
							},
						]}
					>
						<Select
							placeholder="Select Apply Type"
							onChange={(value) => {
								setApplyType(value);
								if (value !== "ORDER_VALUE_RANGE") {
									// Reset min and max order values if apply type is not ORDER_VALUE_RANGE
									form.setFieldsValue({
										minOrderValue: undefined,
										maxOrderValue: undefined,
									});
								}
							}}
						>
							<Option value="ALL_ORDERS">All Orders</Option>
							<Option value="ORDER_VALUE_RANGE">
								Order Value Range
							</Option>
						</Select>
					</Form.Item>

					{/* Conditional Min and Max Order Values */}
					{applyType === "ORDER_VALUE_RANGE" && (
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									label="Min Order Value"
									name="minOrderValue"
									rules={[
										{
											required: true,
											message:
												"Please enter the minimum order value!",
										},
									]}
								>
									<InputNumber
										min={0}
										style={{ width: "100%" }}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Max Order Value"
									name="maxOrderValue"
									rules={[
										{
											required: true,
											message:
												"Please enter the maximum order value!",
										},
									]}
								>
									<InputNumber
										min={0}
										style={{ width: "100%" }}
									/>
								</Form.Item>
							</Col>
						</Row>
					)}

					<Form.Item
						label="Scope"
						name="scope"
						rules={[
							{
								required: true,
								message: "Please select the scope!",
							},
						]}
					>
						<Select
							placeholder="Select Scope"
							onChange={(value) => {
								setScope(value);
								// Reset discount percentage if scope is not ENTIRE_ORDER
								if (value !== "ENTIRE_ORDER") {
									form.setFieldsValue({
										discountPercentage: undefined,
									});
								}
							}}
						>
							<Option value="ENTIRE_ORDER">Entire Order</Option>
							<Option value="PER_SERVICE">Per Service</Option>
						</Select>
					</Form.Item>

					{/* Conditional Discount Percentage or Menu Item Selection */}
					{scope === "ENTIRE_ORDER" && (
						<Form.Item
							label="Discount Percentage"
							name="discountPercentage"
							rules={[
								{
									required: true,
									message:
										"Please enter the discount percentage!",
								},
							]}
						>
							<InputNumber
								min={0}
								max={100}
								style={{ width: "100%" }}
							/>
						</Form.Item>
					)}

					{scope === "PER_SERVICE" && (
						<>
							<Button
								type="primary"
								onClick={() => setIsMenuModalOpen(true)}
								style={{ marginBottom: "16px" }}
							>
								Select Menu Items
							</Button>
							<div>
								Selected Menu Items:{" "}
								{selectedMenuItems.length > 0
									? selectedMenuItems.join(", ")
									: "None"}
							</div>
						</>
					)}

					<Form.Item label="Description" name="description">
						<Input.TextArea rows={3} />
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							style={{ width: "100%" }}
						>
							Create Discount
						</Button>
					</Form.Item>
				</Form>
			</Modal>

			{/* Menu Selection Modal */}
			<Modal
				title="Select Menu Items"
				open={isMenuModalOpen}
				onCancel={() => setIsMenuModalOpen(false)}
				footer={[
					<Button
						key="confirm"
						type="primary"
						onClick={() => setIsMenuModalOpen(false)}
					>
						Confirm Selection
					</Button>,
				]}
			>
				<Checkbox.Group
					options={menuItems}
					value={selectedMenuItems}
					onChange={handleMenuSelect}
				/>
			</Modal>
		</>
	);
};

export default CreateDiscountModal;
