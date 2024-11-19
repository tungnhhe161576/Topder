import styled from "styled-components";

export const ModalDiscountContainer = styled.div`
	/* Điều chỉnh layout container */
	margin: 0;
	padding: 0;
	box-sizing: border-box;

	body {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		margin: 0;
		padding: 0;
		padding: 15px;
		background: #fff;
		font-family: "Montserrat", sans-serif;
		font-size: 14px;
		font-weight: 500;
		color: #000;
	}

	.swiper {
		width: 100%;
	}

	.swiper-slide {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mySwiperNested {
		.swiper-slide {
			width: 100%;
			padding: 15px 0;
			@media (max-width: 991px) {
				width: 250px;
			}
		}
		.coupon__wrap {
			display: flex;
			width: 100%;
			border-radius: 10px;
			border: 1px solid #1e70ff;
			background-color: rgba(30, 112, 255, 0.1);
			color: #1e70ff;
			.coupon__title {
				position: relative;
				display: flex;
				flex-flow: column;
				align-items: center;
				justify-content: center;
				flex: 0 0 auto;
				width: 35%;
				padding: 10px;
				font-weight: bold;
				@media (max-width: 991px) {
					width: 30%;
				}
				&:before {
					content: "";
					position: absolute;
					top: -10px;
					right: -10px;
					width: 15px;
					height: 15px;
					background-color: #fff;
					border-radius: 100%;
				}
				&:after {
					content: "";
					position: absolute;
					top: -11px;
					right: -10px;
					width: 20px;
					height: 10px;
					background-color: #ffffff;
				}
				.couple__category {
					margin-bottom: 5px;
					font-size: 12px;
					font-weight: 700;
				}
				.coupon__max {
					font-size: 11px;
				}
			}
			.coupon__detail {
				position: relative;
				display: flex;
				flex-flow: column;
				align-items: flex-start;
				flex: 0 0 auto;
				width: 65%;
				padding: 10px 10px 10px 15px;
				@media (max-width: 991px) {
					width: 70%;
				}
				&:before {
					content: "";
					position: absolute;
					bottom: -10px;
					left: -10px;
					width: 15px;
					height: 15px;
					background-color: #fff;
					border-radius: 100%;
				}
				&:after {
					content: "";
					position: absolute;
					bottom: -11px;
					left: -10px;
					width: 20px;
					height: 10px;
					background-color: #ffffff;
				}
				.coupon__price {
					margin-bottom: 5px;
					font-size: 16px;
					font-weight: bold;
					letter-spacing: 0.5px;
					@media (max-width: 991px) {
						font-size: 14px;
					}
				}
				.coupon__info {
					display: flex;
					flex-flow: column;
					align-items: flex-start;
					span {
						margin-bottom: 5px;
						font-size: 11px;
						text-align: left;
					}
				}
				.coupon__border {
					position: absolute;
					top: 50%;
					left: 0;
					width: 2px;
					height: calc(100% - 30px);
					transform: translateY(-50%);
				}
			}
		}
	}

	.swiperHomeElectric {
		.coupon__wrap {
			border: 1px solid #1e70ff;
			background-color: rgba(30, 112, 25, 0.1);
			.coupon__title,
			.coupon__detail {
				&:before {
					border: 1px solid #1e70ff;
				}
			}
			.coupon__max,
			.couple__category {
				color: #1e70ff;
			}
			.coupon__price {
				color: #1e70ff;
			}
			.coupon__info span {
				color: #1e70ff;
			}
			.coupon__condition a {
				color: #1e70ff;
				background-color: rgba(30, 112, 255, 0.15);
			}
			.coupon__btn a {
				background-color: #1e70ff;
			}
			.coupon__border {
				border-left: 1px dashed #1e70ff;
			}
		}
	}
`;
