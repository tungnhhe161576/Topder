import styled from "styled-components";

export const ModalChooseMenuContainer = styled.div`
	width: 100%;
	.item-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: center;
	}

	.item {
		flex: 0 1 calc(50% - 20px);
		max-width: 100%;
		box-sizing: border-box;
	}

	@media (max-width: 768px) {
		.item {
			flex: 0 1 100%;
			max-width: 100%;
		}
	}
	.menu {
		.food-detail {
			display: flex;

			.food-img {
				padding-top: 5px;
			}
			.food-name {
				font-size: 16px;
				font-weight: 500;
				padding-left: 10px;
				justify-items: start;
			}
			.food-price {
				color: red;
				font-size: 16px;
				font-weight: 500;
			}
			.food-des {
				padding-left: 10px;
				text-align: left;
				line-height: 16px;
			}
		}
		.selected {
			background-color: #f09853;
			border-radius: 30px;
		}
	}

	.ant-radio-button-wrapper {
		border: none;
		color: black !important;
	}
	.ant-radio-button-wrapper:hover {
		color: #747474 !important;
	}
	.ant-radio-button-wrapper-checked {
		border-radius: 30px;
	}
	:where(.css-dev-only-do-not-override-14qglws).ant-radio-button-wrapper:not(
			:first-child
		)::before {
		background-color: #fff;
	}
	:where(.css-dev-only-do-not-override-14qglws).ant-input-number-outlined {
		border-color: #f09853;
		height: 30px;
	}
`;
