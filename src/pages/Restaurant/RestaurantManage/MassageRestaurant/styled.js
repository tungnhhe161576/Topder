import styled from "styled-components";

export const MassageRestaurantContainer = styled.div`
	width: 100%;
	height: calc(100vh-200px);
	display: flex;
	background: #ebebeb;s

	.left {
		width: 30%;
		min-height: 80vh;
		max-height: 80vh;
		overflow-y: auto;
		background-color: #ebebeb;
		
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 15px;
			cursor: pointer;
			transition: background-color 0.3s;
		}

		.item:hover {
			background-color: rgba(255, 124, 8, 0.2);
		}

		.read {
			width: 12px;
			height: 12px;
			border-radius: 50%;
			background-color: #ff5722;
			margin-right: 15px;
		}
		.selected {
			background-color: rgba(255, 124, 8, 0.2);
		}
	}

	.right {
		position: relative;
		width: 70%;
		height: 80vh;
		display: flex;
		flex-direction: column;
		background-color: white;

		.header {
			padding: 15px;
			border-bottom: 1px solid #e0e0e0;
			flex-shrink: 0;
			position: sticky;
			top: 0;
			z-index: 1;
			background-color: white;
		}

		.list-message {
			min-height: 50vh;
			max-height: 50vh;
			overflow-y: auto;
			padding: 15px;
			display: flex;
			flex-direction: column;

			.mysefl {
				max-width: 70%;
				display: flex;
				align-items: center;
				align-self: flex-end;
				margin-bottom: 10px;
			}
			.yours {
				max-width: 70%;
				display: flex;
				align-items: flex-start;
				margin-bottom: 10px;
			}
		}

		.send-mess {
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			margin-bottom: 5px;

			.ant-input {
				max-width: 88%;
				border-radius: 20px;
				margin-right: 10px;
			}

			.ant-btn {
				background-color: #ff5722;
				color: #fff;
				border-radius: 20px;
				border: none;

				&:hover {
					background-color: #e64a19;
				}
			}
		}
	}

	.message-content {
		position: relative;
		display: flex;
		padding: 20px;
		font-size: large;

		.chat-message {
			background-color: #e0e0e0;
			text-align: start;
			color: #333;
			margin: 5px;
			padding: 10px 15px;
			border-radius: 10px;
			max-width: 100%;
			word-wrap: break-word;
			word-break: break-word;
			overflow-wrap: break-word;
			white-space: pre-wrap;
		}
		.chat-time {
			display: none;
			position: absolute;
			right: 20%;
			top: 0;
			background: #fff;
			color: black;
			font-size: 13px;
			padding: 2px 5px;
			border-radius: 4px;
			box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
			white-space: nowrap;
		}

		&:hover .chat-time {
			display: block;
		}
	}
`;
