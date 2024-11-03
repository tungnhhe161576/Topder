import styled from "styled-components";

export const DecentralizationContainer = styled.div`
	/* UnauthorizedLayout.css */
	/* .unauthorized-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: #f5f7fa;
		color: #333;
		text-align: center;
	}

	.warning-image {
		width: 150px;
		height: auto;
		margin-bottom: 20px;
		filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
		animation: shake 1s ease-in-out infinite;
	}

	.warning-text {
		font-size: 24px;
		font-weight: bold;
		color: #d9534f;
		padding: 10px 20px;
		background-color: #f8d7da;
		border-radius: 8px;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
		animation: fadeIn 1.5s ease-in-out;
	}

	.back-button {
		padding: 10px 20px;
		font-size: 18px;
		font-weight: bold;
		color: #ffffff;
		background-color: #007bff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.back-button:hover {
		background-color: #0056b3;
	}

	/* Hiệu ứng lắc ảnh cảnh báo */
	/* @keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		75% {
			transform: translateX(5px);
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY(-20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	} */
	/* NotFound.css */

	.not-found-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		//background-color: #a4d5eb;
		background-color: #f2b177;
		font-family: "Arial", sans-serif;
		color: #333;
		text-align: center;
	}

	.error-code {
		font-size: 15rem;
		font-weight: bold;
		color: rgba(0, 0, 0, 0.1);
		position: absolute;
		top: 10%;
	}

	.error-message {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.error-text {
		font-size: 2.5rem;
		font-weight: bold;
		color: #333;
		background-color: #f1c40f;
		padding: 10px 20px;
		border-radius: 10px;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
		position: relative;
	}

	.error-text:first-child {
		transform: rotate(-5deg);
	}

	.error-text:last-child {
		transform: rotate(5deg);
	}

	.page-not-found {
		font-size: 1.5rem;
		font-weight: bold;
		margin-top: 20px;
	}

	.suggestion {
		font-size: 1rem;
		color: #555;
		margin-bottom: 30px;
	}

	.buttons {
		display: flex;
		gap: 20px;
	}

	button {
		background-color: #3498db;
		color: #fff;
		padding: 10px 20px;
		font-size: 1rem;
		font-weight: bold;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	button:hover {
		transform: translateY(-3px);
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
	}

	.back-home {
		background-color: #2ecc71;
	}

	.contact-us {
		background-color: #e74c3c;
	}
`;
