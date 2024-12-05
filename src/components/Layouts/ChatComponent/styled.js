import styled from "styled-components";

export const ChatComponentContainer = styled.div`
	width: 100%;
	z-index: 100;

	.ant-drawer-body {
		padding: 0 !important;
	}
	:where(.css-dev-only-do-not-override-14qglws).ant-drawer .ant-drawer-body {
		padding: 0;
	}
`;

export const BodyChat = styled.div`
	width: 100%;
	display: flex;
	background: #ebebeb;
	height: 80vh;

	.left {
		width: 30%;
		height: 100%;
		overflow-y: auto;
		background-color: #ffffff;

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
		width: 70%;
		display: flex;
		flex-direction: column;
		background-color: white;

		.header {
			padding: 15px;
			border-bottom: 1px solid #e0e0e0;
			flex-shrink: 0;
		}

		.list-message {
			overflow: auto;
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
			padding: 10px 15px;
			background: #ffffff;
			border-top: 1px solid #e0e0e0;
			.ant-input {
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
			top: 100%;
			background: #fff;
			color: black;
			font-size: 15px;
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
