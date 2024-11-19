import { Button, Col, Dropdown, Radio, Row, Tabs } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import dayjs from "dayjs";
import { ModalDiscountContainer } from "./styled";

const ModalDiscount = ({
	open,
	onCancel,
	setSelectedVoucher,
	selectedVoucher,
}) => {
	const itemsDropdown = (discount) => {
		return discount?.discountMenuDtos?.slice(0, 3).map((d) => {
			return {
				key: d?.discountMenuId,
				label: (
					<div className="d-flex align-items-center">
						<div className="image mr-10">
							<img
								src={d?.image}
								alt="menu"
								style={{ width: "30px", height: "30px" }}
							/>
						</div>
						<div>
							{d?.dishName} - {d?.discountMenuPercentage}%
						</div>
					</div>
				),
			};
		});
	};
	console.log("check", open);

	const items = [
		{
			key: "1",
			label: "Voucher",
			children: (
				<ModalDiscountContainer>
					<div className="body">
						<div class="swiper-wrapper">
							<div class="swiper-slide">
								<div class="swiper mySwiperNested swiperHomeElectric">
									<div className="swiper-wrapper">
										<div className="swiper-slide">
											<Radio.Group
												block
												buttonStyle="solid"
												value={selectedVoucher}
												onChange={(e) =>
													setSelectedVoucher(
														e.target.value
													)
												}
											>
												<Row gutter={[32, 32]}>
													{open?.map((d) => (
														<Col
															key={d?.discountId}
															span={12}
														>
															<Radio
																value={d}
																style={{
																	width: "100%",
																}}
															>
																<div className="coupon__wrap">
																	<div className="coupon__title">
																		<div>
																			{
																				d?.discountName
																			}
																		</div>
																		{/* <div className="discount-description">
																			{
																				d?.description
																			}
																		</div> */}
																		{d?.scope ===
																			"Per Service" && (
																			<div className="dropdown">
																				<Dropdown
																					menu={{
																						items: itemsDropdown(
																							d
																						),
																					}}
																				>
																					<span>
																						...
																					</span>
																				</Dropdown>
																			</div>
																		)}
																	</div>
																	<div className="coupon__detail">
																		<div className="coupon__price">
																			{d?.scope ===
																			"Per Service"
																				? "Giảm giá từng món ăn"
																				: `Giảm ${d?.discountPercentage}%`}
																		</div>

																		<div className="coupon__info">
																			<span>
																				Ngày
																				bắt
																				đầu:
																			</span>{" "}
																			{dayjs(
																				d?.startDate
																			).format(
																				"DD-MM-YYYY HH:mm"
																			)}
																			<br />
																			<span>
																				Ngày
																				kết
																				thúc:
																			</span>{" "}
																			{dayjs(
																				d?.endDate
																			).format(
																				"DD-MM-YYYY HH:mm"
																			)}
																		</div>
																		<div className="coupon__border"></div>
																	</div>
																</div>
															</Radio>
														</Col>
													))}
												</Row>
											</Radio.Group>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ModalDiscountContainer>
			),
		},
	];

	const footer = () => {
		return (
			<div className="d-flex justify-content-center">
				<Button className="mr-10 fw-600" onClick={() => onCancel()}>
					Đóng
				</Button>
				<Button
					className="mr-10 fw-600"
					type="primary"
					onClick={() => {
						onCancel();
					}}
				>
					Đồng ý
				</Button>
			</div>
		);
	};

	return (
		<ModalDiscountContainer>
			<CustomModal
				open={!!open}
				onCancel={onCancel}
				width={850}
				footer={footer}
			>
				<div className="discount">
					<Tabs items={items} />
				</div>
			</CustomModal>
		</ModalDiscountContainer>
	);
};

export default ModalDiscount;
