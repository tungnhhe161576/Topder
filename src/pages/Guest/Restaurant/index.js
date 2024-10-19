import React, { useEffect, useState } from "react";
import CommonLayout from "../../../components/Layouts/CommonLayout";
import { Col, Row, Pagination, Select, Input, Button, Form } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { RestaurantContainer } from "./styled";
import RestaurantItem from "../../../components/RestaurantItem";
import ModalRequestLogin from "../../../components/Modal/RequestLogin";
import ModalBookingTable from "../../../components/Modal/Booking";
import GuestService from "../../../services/GuestService";
import SpinCustom from "../../../components/Common/SpinCustom";
const { Option } = Select;

const Restaurant = () => {
	const [form] = Form.useForm();
	const [openRequestLogin, setOpenRequestLogin] = useState(false);
	const [openModalBooking, setOpenModalBooking] = useState(false);
	const [loading, setLoading] = useState(false);
	const [text, setText] = useState("");
	const [data, setData] = useState([])
	const [category, setCategory] = useState([])
	const [dataSearch, setDataSearch] = useState({
		name: '',
		address: '',
		provinceCity: undefined,
		district: undefined,
		commune: undefined,
		restaurantCategory: undefined,
		minPrice: undefined,
		maxPrice: undefined,
		maxCapacity: undefined,
		pageNumber: 1,
		pageSize: 8,
	}) 
	
	const getAllRestaurantCategory = async () => {
		try {
            const res = await GuestService.getAllRestaurantCategory()
			setCategory(res)
        } catch (error) {
            console.log(error)
        }
	}

	const getAllRestaurants = async () => {
		try {
			const formValues = await form.validateFields();
			setDataSearch(prev => ({
				...prev,
				restaurantCategory: formValues.category,
				name: formValues.name
			}));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await GuestService.getAllRestaurants(dataSearch);
				setData(res?.items);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
	
		fetchData();
	}, [dataSearch]);
	

	useEffect(() => {
		getAllRestaurantCategory()
	}, [dataSearch])
	
	return (
		<CommonLayout>
			<RestaurantContainer>
				<Form form={form} className="menu_search_area">
					<Row gutter={16} justify="center" align="middle">
						<Col span={8}>
							<Form.Item name="name" className="menu_search">
								<Input placeholder="Nhập tên nhà hàng " className="search-input" />
							</Form.Item>
						</Col>

						<Col span={5}>
							<Form.Item name="category" className="menu_search">
								<Select className="nice-select w-100" allowClear  placeholder="Select a person">
									{
										category?.map(c => (
											<Option key={c?.categoryRestaurantId} value={c?.categoryRestaurantId}>
                                                {c?.categoryRestaurantName}
                                            </Option>
										))
									}
								</Select>
							</Form.Item>
						</Col>
						<Col span={5}>
							<Form.Item className="menu_search">
								<Select
									allowClear
									defaultValue="default"
									className="nice-select"
									style={{ width: "100%" }}
								>
									<Option value="default">Địa chị</Option>
									<Option value="popularity">Hà Hội</Option>
									<Option value="rating">Hải phòng</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={2}>
							<Form.Item className="menu_search">
								<Button
									type="primary"
									htmlType="submit"
									className="search-button"
									onClick={() => getAllRestaurants()}
								>
									Search
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
				<div className="list">
					<SpinCustom spinning={loading}>
						{
						data?.length === 0
							? <div className="fs-18 fw-500 d-flex justify-content-center w-100 red mt-30">Không có dữ liệu</div>
							: <Row
								gutter={[30, 32]}
								className="d-flex justify-content-center"
							>
								{
									data?.map((r) => (
										<Col key={r?.uid} xs={12} sm={12} md={12} lg={6} xl={6}>
											<RestaurantItem
												setOpenRequestLogin={setOpenRequestLogin}
												setOpenModalBooking={setOpenModalBooking}
												data={r}
												setText={setText}
												isWishlist={false}
											/>
										</Col>
									))
								}
							</Row>
						}
					</SpinCustom>
				</div>
			</RestaurantContainer>
			{!!openRequestLogin && (
				<ModalRequestLogin
					open={openRequestLogin}
					onCancel={() => setOpenRequestLogin(false)}
					text={text}
				/>
			)}

			{!!openModalBooking && (
				<ModalBookingTable
					open={openModalBooking}
					onCancel={() => setOpenModalBooking(false)}
					text={text}
				/>
			)}
		</CommonLayout>
	);
};

export default Restaurant;
