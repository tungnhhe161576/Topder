import { Col, Pagination, Row } from "antd";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import { WhishlistContainer } from "./styled";
import RestaurantItem from "../../../../components/RestaurantItem";
import { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import UserService from "../../../../services/UserService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import SpinCustom from "../../../../components/Common/SpinCustom";

const Whishlist = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const user = useSelector(userInfor);

	const getData = async () => {
		try {
			setLoading(true);
			const res = await UserService.getWishLish(user?.uid);
			setData(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user?.uid) {
			getData();
		}
	}, [user]);

	const itemPerPage = 2;
	const onPageChange = (page) => {
		setCurrentPage(page);
	};
	const startIndex = (currentPage - 1) * itemPerPage;
	console.log("data", data);

	const handleRemoveItem = (restaurantId) => {
		setData((prevData) =>
			prevData.filter((item) => item.uid !== restaurantId)
		);
	};

	return (
		<ProfileUserLayout>
			<WhishlistContainer>
				<div className="title fs-22 fw-600 mb-30">Yêu thích</div>
				<div className="list-wishlist">
					<SpinCustom spinning={loading}>
						{data?.length === 0 ? (
							<span
								className="fw-500 fs-20 m-auto w-90"
								style={{ color: "red" }}
							>
								Không có dữ liệu
							</span>
						) : (
							<>
								<Row
									gutter={[30, 20]}
									className="d-flex justify-content-start"
								>
									{data
										?.slice(
											startIndex,
											startIndex + itemPerPage
										)
										?.map((r, index) => (
											<Col
												key={index}
												xs={12}
												sm={12}
												md={10}
												lg={9}
												xl={9}
											>
												<RestaurantItem
													data={r}
													setText={""}
													isWishlist={true}
													onRemove={handleRemoveItem}
												/>
											</Col>
										))}
								</Row>
								<div className="pagination">
									<Pagination
										className="custom-pagination pb-20"
										itemRender={(
											page,
											type,
											originalElement
										) => {
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
										pageSize={itemPerPage}
										total={data?.length}
										onChange={onPageChange}
									/>
								</div>
							</>
						)}
					</SpinCustom>
				</div>
			</WhishlistContainer>
		</ProfileUserLayout>
	);
};

export default Whishlist;
