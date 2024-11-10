import React from "react";
import { ErrorPageContainer } from "./styled";
import { useNavigate } from "react-router-dom";
// import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
	// const error = useRouteError();
	// console.error(error);
	const nav = useNavigate();
	return (
		<ErrorPageContainer>
			<div className="not-found-container">
				<div className="error-code">404</div>
				<div className="error-message">
					<div className="error-text">Sorry,</div>
					<div className="error-text">Error!</div>
				</div>
				<p className="page-not-found"> Oops! Page Not Found.</p>
				{/* <p className="suggestion">
					Why don't you try one of these pages instead?
				</p> */}
				<div className="buttons">
					<button
						className="back-home"
						onClick={() => {
							nav("/");
						}}
					>
						GO BACK HOME
					</button>
					<button
						className="contact-us"
						onClick={() => {
							nav("/contact");
						}}
					>
						CONTACT US
					</button>
				</div>
			</div>
		</ErrorPageContainer>
	);
};

export default ErrorPage;
