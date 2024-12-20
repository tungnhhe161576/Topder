import React, { useEffect, useState } from "react";
import { RestaurantItemContainer } from "./styled";
import { useNavigate } from "react-router-dom";
import { message, Rate } from "antd";
import { HeartOutlined, WechatOutlined } from "@ant-design/icons";
import { formatNumberToK } from "../../lib/stringUtils";
import { useSelector } from "react-redux";
import { userInfor } from "../../redux/Slice/userSlice";
import UserService from "../../services/UserService";
import { FaHeart } from "react-icons/fa";
const RestaurantItem = ({
	data,
	setOpenRequestLogin,
	setOpenModalBooking,
	setText,
	isWishlist,
	onRemove,
	wishlist,
	updateWishlist,
}) => {
	const nav = useNavigate();
	const user = useSelector(userInfor);
	const [isLiked, setIsLiked] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleOptionOpen = () => {
		if (isWishlist) {
			nav("/restaurant-detail/" + data?.uid);
		} else {
			if (!!user) {
				nav("/restaurant-detail/" + data?.uid);
			} else {
				setOpenRequestLogin(true);
				setText("Bạn cần đăng nhập trước khi đặt bàn");
			}
		}
	};

	// const handleLikeRestaurant = async () => {
	// 	try {
	// 		const res = await UserService.createWishList({
	// 			customerId: user?.uid,
	// 			uid: data?.uid,
	// 		});
	// 		console.log("res", res);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	const getWishlist = async () => {
		if (user) {
			try {
				const wishlist = await UserService.getWishLish(user?.uid);
				const likedRestaurant = wishlist.find(
					(item) => item.uid === data.uid
				);
				if (likedRestaurant) {
					setIsLiked(likedRestaurant);
				}
			} catch (error) {
				console.log("Lỗi khi lấy danh sách yêu thích:", error);
			}
		}
	};

	useEffect(() => {
		getWishlist();
	}, [user, data?.uid]);

	const handleLikeClick = async () => {
		if (!user) {
			setOpenRequestLogin(true);
			setText("Đăng nhập để thêm cửa hàng này vào mục yêu thích");
			return;
		}
		setLoading(true);

		try {
			if (isLiked) {
				await UserService.deleteWishlist(user?.uid, isLiked.wishlistId);
				setIsLiked(false);
				message.success("Xóa khỏi yêu thích thành công", 2);

				if (onRemove) onRemove(data?.uid);
			} else if (!isLiked) {
				const res = await UserService.createWishList({
					customerId: user?.uid,
					restaurantId: data?.uid,
				});

				setIsLiked(res);
				await getWishlist();
				message.open({
					content: "Đã thêm vào yêu thích!",
					type: "success",
					style: {
						marginTop: "10vh",
					},
				});
			}
		} catch (error) {
			console.log(error);
			message.error("Có lỗi xảy ra, vui lòng thử lại", 2);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateChatBox = async () => {
		if (!user) {
			setOpenRequestLogin(true);
			setText("Bạn cần đăng nhập để nhắn tin với cửa hàng này!");
			return;
		}
		try {
			const res = await UserService.checkExistChatBox(
				user?.uid,
				data?.uid
			);
			if (res) {
				message.open({
					content: "Cuộc hội thoại đã được tạo!",
					type: "success",
					style: {
						marginTop: "10vh",
					},
				});
			} else {
				await UserService.createChatBox({
					chatBoxId: 0,
					customerId: user?.uid,
					restaurantId: data?.uid,
				});
				message.open({
					content: "Tạo cuộc hội thoại thành công!",
					type: "success",
					style: {
						marginTop: "10vh",
					},
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

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
					<Rate
						style={{ color: "#ff7c08" }}
						value={data?.star}
						disabled
					/>{" "}
					- ({data?.totalFeedbacks} đánh giá)
				</div>
				<div className="price fs-18 fw-600 primary">
					<div>
						<span style={{ color: "black" }}>Giá bàn: </span>{" "}
						{data?.price === 0 ? <span>Miễn phí</span> : (data?.discount > 0 ? <span><s style={{color: 'gray'}}>{formatNumberToK(data?.price)}</s> <span className="ml-10">{formatNumberToK(data?.price * (1 - data?.discount/100))}</span> </span> : <span>{formatNumberToK(data?.price)}</span>) }
					</div>
					<div>
						{data?.discount > 0 ? (
							<>
								<span style={{ color: "black" }}>
									Giảm giá:
								</span>
								<span> {data?.discount} %</span>
							</>
						) : (
							""
						)}
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
					<div
						className={`drop-heart ${
							isLiked ? "liked" : "default"
						}`}
						onClick={() => handleLikeClick()}
					>
						{isLiked ? (
							<FaHeart
								style={{
									color: "#fa875c",
									cursor: "pointer",
								}}
							/>
						) : (
							<HeartOutlined
								style={{
									color: "#fa875c",
									cursor: "pointer",
								}}
							/>
						)}
					</div>
					<div
						className="chat-option"
						onClick={() => handleCreateChatBox()}
					>
						<WechatOutlined className="fs-20 primary" />
					</div>
				</div>
			</div>
		</RestaurantItemContainer>
	);
};

export default RestaurantItem;
