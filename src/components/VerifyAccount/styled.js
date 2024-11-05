import styled from "styled-components";

export const VerifyAccountContainer = styled.div`
	width: 100%;
	.verification-success-container {
		background-color: #2c3e50;
		padding: 50px 0;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.verification-success-card {
		width: 500px;
		text-align: center;
		padding: 40px;
	}

	.verification-success-logo {
		margin-bottom: 20px;
	}

	.verification-success-title {
		margin-top: 0;
		color: #fa8c16;
	}

	.verification-success-button {
		margin-top: 20px;
		background-color: #fa8c16;
		border-color: #fa8c16;
	}
	.verification-success-button:hover {
		background-color: #e09543 !important;
		border-color: #fa8c16;
	}

	.verification-success-support {
		margin-top: 20px;
	}

	.verification-success-thanks {
		margin-top: 20px;
		display: block;
	}
`;
