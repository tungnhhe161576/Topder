import React, { useEffect, useState } from "react";
import { RestaurantItemContainer } from "./styled";
import { useNavigate } from "react-router-dom";
import { message, Rate } from "antd";
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
	onRemove,
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
			setText("Bạn cần đăng nhập để thêm cửa hàng này vào mục yêu thích");
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
				message.success("Đã thêm vào yêu thích", 2);
			}
		} catch (error) {
			console.log(error);
			message.error("Có lỗi xảy ra, vui lòng thử lại", 2);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateChatBox = async () => {
		try {
			const res = await UserService.checkExistChatBox(user?.uid, data?.uid)
			if (res) {
				message.success('Cuộc hội thoại đã được tạo');
			} else {
				await UserService.createChatBox({
					chatBoxId: 0,
					customerId: user?.uid,
					restaurantId: data?.uid
				})
				message.success('Tạo cuộc hội thoại thành công');
			}
		} catch (error) {
			console.log(error);
		} finally {}
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
						{formatNumberToK(data?.price)}
					</div>
					<div>
						{data?.discount > 0 ? (
							<>
								<span style={{ color: "black" }}>
									{" "}
									Giảm giá:{" "}
								</span>{" "}
								<span>{data?.discount} %</span>
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
					{/* {!isWishlist ? ( */}
					<div
						className={`drop-heart ${
							isLiked ? "liked" : "default"
						}`}
						onClick={() => handleCreateChatBox()}
						style={{
							backgroundColor: isLiked ? "#f55b22" : "",
						}}
					>
						{/* <HeartOutlined
							style={{
								color: "#fa875c",
								cursor: "pointer",
							}}
						/> */}
						Chat
					</div>
					{/* ) : (
						<></>
					)} */}
				</div>
			</div>
		</RestaurantItemContainer>
	);
};

export default RestaurantItem;
