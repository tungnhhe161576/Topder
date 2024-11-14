import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../src/assets/scss/index.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfigProvider } from "antd";
import 'dayjs/locale/vi'; // Import locale tiếng Việt
import viVN from 'antd/lib/locale/vi_VN'; // Import locale từ antd
import dayjs from 'dayjs';
dayjs.locale('vi');

const root = ReactDOM.createRoot(document.getElementById("root"));
const clientId = process.env.REACT_APP_GG_CLIENT_ID;
root.render(
	<GoogleOAuthProvider clientId={clientId}>
		<BrowserRouter>
			<Provider store={store}>
				<ConfigProvider locale={viVN}>
					<App />
				</ConfigProvider>
			</Provider>
		</BrowserRouter>
	</GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
