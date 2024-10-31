import styled from "styled-components";

export const MangementMenuContainer = styled.div`
	width: 100%;
	height: calc(100vh - 200px);
	.body {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		padding: 40px 20px;
	}
	.ant-table-thead > tr > th {
		background-color: #f5f5f5;
		font-weight: bold;
	}

	h3 {
		font-size: 18px;
		font-weight: bold;
	}

	button {
		font-size: 14px;
		font-weight: 500;
	}
`;
