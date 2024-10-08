import React, { useState } from "react";
import { RestaurantItemContainer } from "./styled";
import { useNavigate } from "react-router-dom";
import { Rate } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const RestaurantItem = ({
	setOpenRequestLogin,
	setOpenModalBooking,
	setText,
	isWishlist,
}) => {
	const nav = useNavigate();
	const flag = true;

	const handleOptionOpen = () => {
		if (!isWishlist) {
			if (!flag) {
				setOpenModalBooking(true);
				setText("Booking");
			} else {
				setOpenRequestLogin(true);
				setText("Bạn cần đăng nhập trước khi đặt bàn");
			}
		} else {
			nav("/restaurant-detail");
		}
	};

	return (
		<RestaurantItemContainer>
			<div
				className="brand-image"
				onClick={() => nav("/restaurant-detail")}
			>
				<img
					className="image-detail"
					src="https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Cup-Of-Creamy-Coffee.png"
					alt="Brand-image"
				/>
			</div>

			<div className="brand-detail">
				<div
					className="brand-category"
					onClick={() => {
						nav("/");
					}}
				>
					<span className="pl-15 pr-15"> Quán cà phê | Trà sữa </span>
				</div>
				<div
					className="brand-name"
					onClick={() => nav("/restaurant-detail")}
				>
					{" "}
					Mer.Coffee & Tea{" "}
				</div>
				<div className="rate">
					<Rate style={{ color: "#ff7c08" }} value={5} disabled /> -
					(5 đánh giá)
				</div>
				<div className="hard"></div>
				<div className="option">
					<div className="booking" onClick={() => handleOptionOpen()}>
						{!isWishlist ? (
							<span>Đặt bàn ngay</span>
						) : (
							<span>Xem chi tiết</span>
						)}
					</div>
					{!isWishlist ? (
						<div
							className="drop-heart"
							onClick={() => {
								setOpenRequestLogin(true);
								setText(
									"Bạn cần đăng nhập trước khi thích nhà hàng này"
								);
							}}
						>
							<HeartOutlined style={{ color: "#ff7c08" }} />
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</RestaurantItemContainer>
	);
};

export default RestaurantItem;
