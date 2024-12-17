import { message, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import UserService from "../../../../../services/UserService";
import { useState, useEffect } from "react";
import { RestaurantItemContainer } from "../../../../../components/RestaurantItem/styled";
import { RelatedRestaurantContainer } from "./styled";
import { HeartOutlined, WechatOutlined } from "@ant-design/icons";
import ModalRequestLogin from "../../../../../components/Modal/RequestLogin";
import { formatNumberToK } from "../../../../../lib/stringUtils";
import { FaHeart } from "react-icons/fa";

const RelatedRestaurant = ({ data, user, isWishlist, onRemove }) => {
	const nav = useNavigate();
	const [openRequestLogin, setOpenRequestLogin] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [text, setText] = useState("");
	const [loading, setLoading] = useState(false);

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
			setText("Bạn cần đăng nhập để nhắn tin với cửa hàng này");
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
		<RelatedRestaurantContainer>
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
						{/* {formatNumberToK(data?.price)} */}
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
					<div
						className="booking"
						onClick={() => nav("/restaurant-detail/" + data?.uid)}
					>
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
			{!!openRequestLogin && (
				<ModalRequestLogin
					open={openRequestLogin}
					onCancel={() => setOpenRequestLogin(false)}
					text={text}
				/>
			)}
		</RelatedRestaurantContainer>
	);
};

export default RelatedRestaurant;
