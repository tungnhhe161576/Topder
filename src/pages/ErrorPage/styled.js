import styled from "styled-components";

export const ErrorPageContainer = styled.div`
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
