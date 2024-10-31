import LoginPage from "../pages/Guest/LoginPage";
import RegisterPage from "../pages/Guest/RegisterPage";
import HomePage from "../pages/Guest/HomePage";
import ErrorPage from "../pages/ErrorPage";
import AboutUs from "../pages/Guest/AboutUs";
import Blog from "../pages/Guest/Blog";
import Restaurant from "../pages/Guest/Restaurant";
import Contact from "../pages/Guest/Contact";
import PrivacyPolicy from "../pages/Guest/PrivacyPolicy";
import TermAndConditon from "../pages/Guest/TermsAndCondition";
import ForgotPassword from "../pages/User/ForgotPassword";
import RegisterRestaurant from "../pages/Restaurant/RegisterRestaurant";
import RestaurantDetail from "../pages/Guest/Restaurant/RestaurantDetail";
import BlogDetail from "../pages/Guest/Blog/BlogDetail";
import Profile from "../pages/User/UserProfile/Profile";
import HistoryBooking from "../pages/User/UserProfile/HistoryBooking";
import Whishlist from "../pages/User/UserProfile/Whishlist";
import Rate from "../pages/User/UserProfile/Rate";
import ChangePassword from "../pages/User/UserProfile/ChangePassword";
import AuthenticationPhone from "../pages/User/UserProfile/AuthenticationPhone";
import Dashboard from "../pages/Restaurant/RestaurantManage/Dashboard";
import ManageRestaurant from "../pages/Restaurant/RestaurantManage/ManageRestaurant";
import ManageOrder from "../pages/Restaurant/RestaurantManage/ManageOrder";
import ManageRate from "../pages/Restaurant/RestaurantManage/ManageRate";
import Wallet from "../pages/User/UserProfile/Wallet";
import ManagementDiscount from "../pages/Restaurant/RestaurantManage/ManageDiscount";
import VerifyOTP from "../pages/User/VerifyOTP";
import ResetPassword from "../pages/User/ResetPassword";
import React from "react";
import UserRoutes from "./UserRouter";
import GuestRoutes from "./GuestRouter";
import RestaurantRoutes from "./RestautantRouter";
import SpinCustom from "../components/Common/SpinCustom";
import DepositOrWithdraw from "../pages/Transaction/DepositOrWithdraw";
import VNPayDepositOrWithdraw from "../pages/Transaction/VNPayDepositOrWithDraw";
import TransactionHistory from "../pages/User/UserProfile/TransactionHistory";
import ManageMenu from "../pages/Restaurant/RestaurantManage/ManageMenu";
import ManageTable from "../pages/Restaurant/RestaurantManage/ManageTable";

const LazyLoadingComponent = ({ children }) => {
	return (
		<React.Suspense
			fallback={
				<div
					className="loading-center"
					style={{
						display: "flex",
						justifyContent: "center",
						height: "100vh",
						alignItems: "center",
					}}
				>
					<SpinCustom />
				</div>
			}
		>
			{children}
		</React.Suspense>
	);
};

export const router = [
	//Guest
	{
		path: "/",
		element: (
			<LazyLoadingComponent>
				<GuestRoutes />
			</LazyLoadingComponent>
		),
		children: [
			{
				path: "",
				element: <HomePage />,
				title: "",
			},
			{
				path: "login",
				element: <LoginPage />,
				title: "Đăng Nhập",
			},
			{
				path: "register",
				element: <RegisterPage />,
				title: "Đăng Ký",
				children: [{}],
			},
			{
				path: "forgot-password",
				element: <ForgotPassword />,
				title: "Quên Mật Khẩu",
			},
			{
				path: "verify-otp",
				element: <VerifyOTP />,
				title: "OTP",
			},
			{
				path: "reset-password",
				element: <ResetPassword />,
				title: "Đặt Lại Mật Khẩu Mới",
			},
			{
				path: "about-us",
				element: <AboutUs />,
				title: "Về Chúng Tôi",
			},
			{
				path: "privacy-policy",
				element: <PrivacyPolicy />,
				title: "Chính sách bảo mật",
			},
			{
				path: "terms-condition",
				element: <TermAndConditon />,
				title: "Điều khoản và điều kiện",
			},
			{
				path: "blog",
				element: <Blog />,
				title: "Blog",
			},
			{
				path: "restaurant-view",
				element: <Restaurant />,
				title: "Nhà Hàng - Dịch Vụ",
			},
			{
				path: "contact",
				element: <Contact />,
				title: "Liên Hệ",
			},
			{
				path: "restaurant-detail/:restaurantId",
				element: <RestaurantDetail />,
				title: "Chi tiết nhà hàng",
			},
			{
				path: "restaurant-register",
				element: <RegisterRestaurant />,
				title: "Đăng kí nhà hàng",
			},
			{
				path: "blog-detail/:blogId",
				element: <BlogDetail />,
				title: "Chi tiết Blog",
			},
		],
	},

	// User
	{
		path: "user-profile",
		element: (
			<LazyLoadingComponent>
				<UserRoutes />
			</LazyLoadingComponent>
		),
		children: [
			{
				path: "",
				element: <Profile />,
				title: "",
			},
			{
				path: "history-booking",
				element: <HistoryBooking />,
				title: "Lịch sử đặt bàn",
			},
			{
				path: "wishlist",
				element: <Whishlist />,
				title: "Nhà hàng yêu thích",
			},
			{
				path: "rates",
				element: <Rate />,
				title: "Đánh giá",
			},
			{
				path: "change-password",
				element: <ChangePassword />,
				title: "Đổi mật khẩu",
			},
			{
				path: "authentication-phone",
				element: <AuthenticationPhone />,
				title: "Xác thực số điện thoại",
			},
			{
				path: "user-wallet",
				element: <Wallet />,
				title: "Ví",
			},
			{
				path: "transactiom-history",
				element: <TransactionHistory />,
				title: "Lịch sử giao dịch",
			},
			{
				path: "status-transaction",
				element: <DepositOrWithdraw />,
			},
			{
				path: "status-transaction-with-vnpay/:transactionId",
				element: <VNPayDepositOrWithdraw />,
			},
		],
	},

	//Restaurant
	{
		path: "restaurant",
		element: (
			<LazyLoadingComponent>
				<RestaurantRoutes />
			</LazyLoadingComponent>
		),

		children: [
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "manage-restaurant",
				element: <ManageRestaurant />,
			},
			{
				path: "manage-order",
				element: <ManageOrder />,
			},
			{
				path: "manage-rate",
				element: <ManageRate />,
			},
			{
				path: "manage-discount",
				element: <ManagementDiscount />,
			},
			{
				path: "manage-table",
				element: <ManageTable />,
			},
			{
				path: "manage-menu",
				element: <ManageMenu />,
			},
		],
	},

	//all nếu sai đường dẫn
	{
		path: "*",
		element: (
			<LazyLoadingComponent>
				<ErrorPage />
			</LazyLoadingComponent>
		),
	},
];
