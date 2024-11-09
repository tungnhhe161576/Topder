import styled from "styled-components";

export const ManagementDiscountContainer = styled.div`
	width: 100%;

	.delete-button {
		background-color: #ff5722 !important;
		border: none;
		color: white;
	}
	.delete-button:hover {
		background-color: #fb7b53 !important;
		border: none;
		color: white !important;
	}
	
	.update-button {
		background-color: #4caf50 !important;
		border: none;
		color: white;
	}
	.update-button:hover {
		background-color: #74d700 !important;
		border: none;
		color: white !important;
	}

	.button-active {
		background-color: #dbd8d8 !important;
		border: none;
		/* color: white; */
	}
	.button-active:hover {
		background-color: #bfbaba !important;
		border: none;
		color: black !important ;
	}

	.button-detail {
		border: none;
		background-color: #fb7b53;
		color: white;
	}
	.button-detail:hover {
		background-color: #fb7b53 !important;
		color: white !important;
	}

	.select {
		width: 200px;

		:where(.css-dev-only-do-not-override-14qglws).ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
			border: 1px solid #ff7c08;
		}
		.ant-select:not(.ant-select-customize-input) .ant-select-selector {
			border-radius: 25px !important;

		}
		.ant-select-focused:where(.css-dev-only-do-not-override-14qglws).ant-select-outlined:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) .ant-select-selector {
			border-color: #ff7c08 !important;
		}
		:where(.css-dev-only-do-not-override-14qglws).ant-select-outlined:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer):hover .ant-select-selector {
			border-color: #ff7c08 !important;
		}
	}
	
`;

