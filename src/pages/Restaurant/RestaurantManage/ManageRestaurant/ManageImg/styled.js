import styled from "styled-components";

export const ManageImgContainer = styled.div`
	width: 100%;

	.image-container {
		img {
			background-size: cover;
			/* background-size: cover; */
			background-position: center;
			width: 200px;
			max-height: 150px;
		}
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
