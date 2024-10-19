import styled from "styled-components";

export const ManageOrderContainer = styled.div`
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

	.ant-table-tbody > tr > td {
		text-align: center;
	}
	.order-detail {
		margin-top: 20px;
	}

	.order-detail table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 10px;
	}

	.order-detail table th,
	.order-detail table td {
		padding: 10px;
		text-align: center;
		border-bottom: 1px solid #f0f0f0;
	}

	.order-detail table th {
		font-weight: bold;
		background-color: #f5f5f5;
	}

	.order-detail table td {
		font-size: 16px;
	}
	.btn-status {
		background-color: #20c997;
		color: white;
		font-weight: bold;
		border-radius: 20px;
		padding: 5px 20px;
	}
	.status-bar {
		display: flex;
		justify-content: space-evenly;
		margin-bottom: 20px;
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
