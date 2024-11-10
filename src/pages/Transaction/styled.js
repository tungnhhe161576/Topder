import styled from "styled-components";

export const TransactionContainer = styled.div`
	.transaction-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		text-align: center;
		background-color: #f4f6f8;
	}

	.transaction-status {
		background-color: #ffffff;
		padding: 40px;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		width: auto; /* Thêm độ rộng cố định nếu cần */
		height: auto;
	}

	.icon {
		font-size: 70px;
	}

	.success {
		color: #52c41a;
	}

	.failure {
		color: red;
	}

	h2 {
		font-size: 50px;
		color: #52c41a;
	}

	p {
		font-size: 20px;
		color: #333;
	}

	.back-button {
		background-color: #ff7c08 !important;
		margin-top: 30px;
		font-weight: 600;
		height: 40px;
		justify-items: center;
		align-self: center;
	}
`;
