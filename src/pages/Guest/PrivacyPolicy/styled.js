import styled from "styled-components";

export const PrivacyPolicyContainer = styled.div`
	width: 90%;
	margin: auto;
	margin-top: 20px;

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		font-family: Arial, sans-serif;
	}

	.container {
		width: 80%;
		margin: 0 auto;
		padding: 20px;
	}
	.container p {
		margin-bottom: 20px;
	}
	.container ul li::after,
	.container ol li::after {
		position: absolute;
		content: "";
		background-position: center !important;
		background-repeat: no-repeat !important;
		background-size: cover !important;
		top: 2px;
		left: 0;
		width: 20px;
		height: 20px;
	}

	.title {
		font-size: 36px;
		margin-bottom: 20px;
	}

	section {
		margin-bottom: 30px;
	}

	h2 {
		font-size: 24px;
		margin-bottom: 10px;
	}

	p,
	ul {
		font-size: 18px;
		line-height: 1.6;
	}

	ul {
		list-style-type: none;
		padding-left: 0;
	}

	ul li {
		margin-bottom: 10px;
		display: flex;
		align-items: center;
		align-items: flex-start;
		margin-bottom: 10px;
		line-height: 1.5;
	}

	.icon {
		flex-shrink: 0;
		font-size: 20px;
		margin-right: 10px;
		color: orange;
		vertical-align: middle;
	}

	/* .home-button {
    background-color: orange;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
  }

  .home-button:hover {
    background-color: darkorange;
  } */
	button {
		border: none;
		box-shadow: none !important;
	}
	.common_btn {
		/* background: #ff7c08;
    text-transform: capitalize;
    color: #ffffff;
    padding: 12px 40px 12px 40px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    transition: all linear 0.3s;
    -webkit-transition: all linear 0.3s;
    -moz-transition: all linear 0.3s;
    -ms-transition: all linear 0.3s;
    -o-transition: all linear 0.3s; */
		background-color: #ff7c08 !important;
		margin-top: 10px;
		font-weight: 600;
		height: 40px;
		width: 150px;
	}
	/* 
  .common_btn::after {
    position: absolute;
    content: "";
    width: 23px;
    height: 24px;
    background: #e06b00;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    top: 50%;
    left: 0px;
    opacity: 0;
    transform: translateY(-50%);
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transition: all linear 0.3s;
    -webkit-transition: all linear 0.3s;
    -moz-transition: all linear 0.3s;
    -ms-transition: all linear 0.3s;
    -o-transition: all linear 0.3s;
  } */
	.common_btn:hover {
		/* background: var(--colorBlack);
    padding: 12px 25px 12px 55px;
    color: var(--colorWhite); */
		background-color: #ff9933 !important;
	}
	/* 
	.common_btn:hover::after {
		opacity: 1;
		left: 17px;
	} */
`;
