import styled from "styled-components";

export const OrderManagementContainer = styled.div`
	width: 100%;
	min-height: 100vh;

	.input-search {
		.ant-input-affix-wrapper {
			border-radius: 25px;
		}
		:where(.css-dev-only-do-not-override-14qglws).ant-input-outlined:hover {
			border-color: #ff7c08;
		}
		:where(.css-dev-only-do-not-override-14qglws).ant-input-outlined:focus-within {
			border-color: #ff7c08;
		}
	}
	
	.picker {
		.ant-picker {
			width: 100% !important;
			border-radius: 25px;
		}
		:where(.css-dev-only-do-not-override-14qglws).ant-picker-outlined:hover {
			border-color: #ff7c08;
		}
		:where(.css-dev-only-do-not-override-14qglws).ant-picker-outlined:focus-within {
			border-color: #ff7c08;
		}
	}

	.select {
		width: 300px;

		/* :where(.css-dev-only-do-not-override-14qglws).ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
			border: 1px solid #ff7c08;
		} */
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
	
	.tag-waiting {
		color: #1e283d;
		border: 1px solid #1e283d;
	}

	.tag-accepted {
		color: #ffaf00;
		border: 1px solid #ffaf00;
	}

	.tag-success {
		color: #34b1aa;
		border: 1px solid #34b1aa;
	}

	.tag-cancelled {
		color: #f95f53;
		border: 1px solid #f95f53;
	}
	.tag-received {
		color: #1f3bb3;
		border: 1px solid #1f3bb3;
	}
	.btn-detail {
		background-color: #f0f0f0;
		border-color: #1e283d;
		color: #1e283d;
		font-weight: bold;
		padding: 10px 20px;
		border-radius: 20px;
		transition: background-color 0.3s ease;
	}

	.ant-tag {
		padding: 5px 12px;
		border-radius: 20px;
		font-weight: 500;
		font-size: 14px;
		cursor: pointer;
	}

	
	.btn {
		background-color: #20c997;
		color: white;
		font-weight: bold;
		border-radius: 20px;
		padding: 5px 20px;
	}
	.btn:hover {
		background-color: #46c29d !important ;
	}
	.search-container {
		margin-bottom: 20px;
		padding-bottom: 60px;
	}

	.search-container label {
		font-weight: bold;
		margin-right: 10px;
	}

	.search-container .ant-picker {
		width: 200px;
	}

	.search-container .ant-btn {
		background-color: #20c997;
		color: white;
		font-weight: bold;
		border-radius: 20px;
		padding: 5px 20px;
	}

	.search-container .ant-btn:hover {
		background-color: #17a589;
		color: white;
	}
`;
