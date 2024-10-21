import styled from "styled-components";

export const RestaurantContainer = styled.div`
	width: 90%;
	margin: auto;
	margin-top: 60px;

	.dropdown {
		height: 38px;
		width: 100%;
		border: 1px solid #ddd;
		border-radius: 50px;
		margin-bottom: 13px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.fill {
		background-color: #fff;
	}
	.filled {
		background-color: #fa8c16;
		color: #fff;
	}

	.ant-input-number {
		height: 40px;
		border-radius: 50px !important;
		border: 1px solid #ddd !important; 
		width: 100%;
		margin-bottom: -10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/* .search-price {
		background-color: #fff;
		display: flex;
		height: 40px;
		border: 1px solid #ddd;
		align-items: center;
		border-radius: 50px;
		margin-bottom: -8px;
		.slider {
			justify-items: start;
			padding-left: 10px;
		}
		.field-input {
			width: 150px;
			justify-items: end;
		}
	} */

	.pagination {
		display: flex;
		justify-content: left;
		margin-top: 20px;
	}
	.custom-pagination .ant-pagination-item {
		border: 1px solid #d9d9d9;
		border-radius: 50%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		margin: 0 5px;
	}

	.custom-pagination .ant-pagination-item-active {
		background-color: #fa8c16;
		border-color: #fa8c16;
		color: white;
	}

	.custom-pagination .ant-pagination-item a {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #000;
		font-weight: bold;
	}

	.custom-pagination .ant-pagination-item-active a {
		color: white;
	}

	.custom-pagination .ant-pagination-prev,
	.custom-pagination .ant-pagination-next {
		border: none;
	}

	.custom-pagination .ant-pagination-prev:hover,
	.custom-pagination .ant-pagination-next:hover {
		color: #fa8c16;
	}

	.custom-pagination .ant-pagination-prev .anticon,
	.custom-pagination .ant-pagination-next .anticon {
		font-size: 16px;
	}

	.custom-pagination .ant-pagination-prev,
	.custom-pagination .ant-pagination-next {
		padding: 0 10px;
	}

	.menu_search_area {
		background-color: #eef6eb;
		border-radius: 50px;
		margin-bottom: 15px;
		align-items: center;
		padding-top: 15px;
	}
	.menu_search {
		width: 100%;
	}
	.menu_search .ant-input {
		border-radius: 25px;
		border: 1px solid #ddd;
		width: 100%;
		height: 40px;
		margin-left: 30pxpx;
		margin-top: 10px !important;
	}

	.menu_search .ant-select-selector {
		border-radius: 25px !important;
		padding: 10px 20px;
		border: 1px solid #ddd !important;
		width: 100%;
		height: 40px !important;
	}

	.menu_search .ant-select {
		width: 100%;
	}
	.search-input,
	.nice-select,
	.search-button {
		width: 100%;
	}
	.menu_search button {
		background-color: #ff7c08 !important;
		font-weight: 600;
		height: 40px;
		width: 100%;
		border-radius: 25px;
		margin-right: 10px;
		margin-top: 10px !important;
		cursor: pointer;
	}

	.menu_search button:hover {
		background-color: #ff9933 !important;
	}

	@media (max-width: 768px) {
		.menu_search_area {
			flex-direction: column;
			padding: 10px;
		}

		.menu_search .ant-input,
		.menu_search .ant-select-selector,
		.menu_search button {
			margin-bottom: 10px;
			width: 100%;
		}
	}
`;
