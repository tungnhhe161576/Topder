import React from "react";
import { useNavigate } from "react-router-dom";
import { DecentralizationContainer } from "./styled";

const Decentralization = () => {
	const nav = useNavigate();
	return (
		<DecentralizationContainer>
			{/* <div className="unauthorized-layout">
				<img
					src={warningImage}
					alt="Warning"
					className="warning-image"
				/>
				<div className="warning-text">
					Bạn không có quyền truy cập trang này!
				</div>
				<button
					className="back-button"
					onClick={() => {
						nav("/");
					}}
				>
					Trở về trang chủ
				</button>
			</div> */}
			<div className="not-found-container">
				<div className="error-code">Authorization</div>
				<div className="error-message">
					<div className="error-text">Sorry,</div>
					<div className="error-text">Error!</div>
				</div>
				<p className="page-not-found">
					You do not have permission to access this page.
				</p>
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
		</DecentralizationContainer>
	);
};

export default Decentralization;
