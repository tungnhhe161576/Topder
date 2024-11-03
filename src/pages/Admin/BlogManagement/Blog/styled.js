import styled from "styled-components";

export const BlogContainer = styled.div`
	width: 100%;
	.body {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		padding: 40px 20px;
	}
	.ant-table {
		width: 100%;
		margin: 20px 0;
	}

	.ant-table-thead > tr > th {
		background-color: #f5f5f5;
		font-weight: bold;
		text-align: center;
	}

	.ant-table-tbody > tr > td {
		text-align: center;
		padding: 16px;
	}
	.ant-table-tbody > tr > td {
		text-align: center;
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
`;
