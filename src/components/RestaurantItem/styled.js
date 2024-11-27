import styled from "styled-components";

export const RestaurantItemContainer = styled.div`
	width: 100%;
	height: 440px;
	background: #fff;
	position: relative;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	border-radius: 5px;

	.brand-image {
		border-radius: 10px;
		overflow: hidden;

		.image-detail {
			background-size: cover;
			background-position: center;
			width: 100%;
			cursor: pointer;
			transition: transform 0.3s;
			border-bottom: 1px solid black;
			height: 200px;
		}

		.image-detail:hover {
			transform: scale(1.09);
		}
	}

	.brand-detail {
		display: flex;
		flex-direction: column;

		.brand-category {
			background: #ff7c08;
			color: white;
			height: 10%;
			position: absolute;
			font-size: 16px;
			font-weight: bold;
			font-style: italic;
			top: 39%;
			right: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			cursor: pointer;
		}

		.brand-category:hover {
			background: #ed821e;
		}

		.brand-name {
			color: #231f40;
			font-size: 20px;
			font-weight: bold;
			width: 100%;
			text-align: center;
			position: absolute;
			top: 50%;
			cursor: pointer;
			transition: transform 0.1s ease;
		}

		.brand-name:hover {
			color: #ff7c08;
			transform: scale(1.05);
		}

		.rate {
			position: absolute;
			top: 60%;
			left: 22%;
		}

		.price {
			position: absolute;
			top: 68%;
			padding-left: 40px;
			width: 100%;
		}

		.hard {
			width: 0;
			height: 0;
			border-left: 18px solid transparent;
			border-bottom: 32px solid #d36606;
			position: absolute;
			top: 77%;
			margin-left: -18px;
		}

		.option {
			position: absolute;
			width: 100%;
			top: 84%;
			display: flex;
			justify-content: space-between;

			.booking {
				position: absolute;
				right: 5%;
				width: 70%;
				left: 0%;
				background: #ff7c08;
				color: white;
				font-size: 18px;
				font-weight: bold;
				height: 40px;
				margin-left: -18px;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom-left-radius: 5px;
				border-top-right-radius: 5px;
				border-bottom-right-radius: 5px;
			}

			.booking:hover {
				background: #ed821e;
			}

			.drop-heart {
				position: absolute;
				right: 2%;
				/* margin-left: 80px; */
				height: 40px;
				width: 40px;
				border-radius: 5px;
				border: 1px solid #ff7c08;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				transition: background-color 0.3s ease;
			}
			.drop-heart:hover {
				background-color: #f55b22;
			}
			.drop-heart:active {
				background-color: #fa875c;
			}


			.chat-option {
				position: absolute;
				right: 15%;
				/* margin-left: 80px; */
				height: 40px;
				width: 40px;
				border-radius: 5px;
				border: 1px solid #ff7c08;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				transition: background-color 0.3s ease;
			}
			.chat-option:hover {
				background-color: #ddd;
			}
		}
	}
`;
