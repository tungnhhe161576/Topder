import styled from "styled-components";

export const ModalUpdateOrderContainer = styled.div`
	width: 100%;

	.table-item {
		display: flex;

		.table-image {
			flex: 1;
			img {
				background-size: cover;
				background-position: center;
				width: 100%;
				height: 190px;
				padding-top: 5px;
			}
		}
		.des {
			flex: 2;
			padding-top: 20px;
			padding-left: 20px;
			text-align: left;

			.name {
				font-size: 18px;
				font-weight: 500;
				margin-bottom: 20px;
			}
			.quantity {
			}
			.description {
			}
		}
	}

	.selected {
		color: #f09853 !important;
		border-color: #f09853 !important;
		border-width: 3px;
	}

	.ant-radio-button-wrapper {
		border-color: #e8e5e5;
		color: black;
	}
	.ant-radio-button-wrapper-disabled:hover {
		border: none !important;
		color: black !important;
	}
	.ant-radio-button-wrapper:hover {
		color: #efb88c !important;
		border-color: #efb88c !important;
		border-width: 2px;
	}
`;
