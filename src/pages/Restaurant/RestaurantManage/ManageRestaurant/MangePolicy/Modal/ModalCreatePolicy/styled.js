import styled from "styled-components";

export const ModalCreatePolicyContainer = styled.div`
	width: 100%;
	.policy-container {
		width: 600px;
	}
	.policy-item {
		display: block;
		text-align: start;
		padding: 16px;
		border-radius: 8px;
		background-color: #f9f9f9;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: all 0.3s;
		height: 150px;
	}

	.policy-item:hover {
		background-color: #e6f7ff; /* Màu nền khi hover */
		border-color: #1890ff;
	}

	.policy-item .fw-500 {
		font-weight: bold;
		color: #333;
	}

	.policy-item .fw-12 {
		font-size: 12px;
		color: #666;
	}
`;
