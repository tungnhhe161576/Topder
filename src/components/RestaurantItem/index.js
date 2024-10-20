import React, { useState } from "react";
import { RestaurantItemContainer } from "./styled";
import { useNavigate } from "react-router-dom";
import { Rate } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { formatNumberToK } from "../../lib/stringUtils";
import { useSelector } from "react-redux";
import { userInfor } from "../../redux/Slice/userSlice";
import UserService from "../../services/UserService";

const RestaurantItem = ({
	data,
	setOpenRequestLogin,
	setOpenModalBooking,
	setText,
	isWishlist,
}) => {
	const nav = useNavigate();
	const user = useSelector(userInfor)

	const handleOptionOpen = () => {
		if (isWishlist) {
			nav("/restaurant-detail/" + data?.restaurantId);
		} else {
			if (!!user) {
				setOpenModalBooking(true);
				setText("Booking");
			} else {
				setOpenRequestLogin(true);
				setText("Bạn cần đăng nhập trước khi đặt bàn");
			}
		}
	};

	const handleLikeRestaurant = async () => {
		try {
			const res = await UserService.createWishList({customerId: user?.uid, uid: data?.uid})
			console.log("res", res);
			
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<RestaurantItemContainer>
			<div
				className="brand-image"
				onClick={() => nav("/restaurant-detail/" + data?.uid)}
			>
				<img
					className="image-detail"
					src={data?.logo}
					alt="Brand-image"
				/>
			</div>

			<div className="brand-detail">
				<div
					className="brand-category"
					onClick={() => {
						nav("/restaurant-view");
					}}
				>
					<span className="pl-15 pr-15"> {data?.categoryName} </span>
				</div>
				<div
					className="brand-name"
					onClick={() => nav("/restaurant-detail/" + data?.uid)}
				>
					{data?.nameRes}
				</div>
				<div className="rate">
					<Rate style={{ color: "#ff7c08" }} value={data?.star} disabled /> -
					({data?.totalFeedbacks} đánh giá)
				</div>
				<div className="price fs-18 fw-600 primary">
					<div>
						<span style={{color: 'black'}}>Giá bàn: </span> {formatNumberToK(data?.price)}
					</div>
					<div>
					 	{data?.discount > 0 ? (<><span style={{color: 'black'}}> Giảm giá: </span> <span>{data?.discount} %</span></>)  : ''}
					</div>
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
							onClick={() => handleLikeRestaurant()}
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
