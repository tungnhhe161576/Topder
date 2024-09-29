import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/Guest/LoginPage";
import RegisterPage from "../pages/Guest/RegisterPage";
import HomePage from "../pages/Guest/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    title: "",
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
        title: "Forgot Password",
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
        path: "restaurant-detail",
        element: <RestaurantDetail />,
        title: "Chi tiết nhà hàng",
      },
      {
        path: "restaurant/register",
        element: <RegisterRestaurant />,
        title: "Đăng kí nhà hàng",
      },
      {
        path: "blog-detail",
        element: <BlogDetail />,
        title: "Chi tiết Blog",
      },

      // User
      {
        path: "user-profile",
        children: [
          {
            path: "",
            element: <Profile/>,
            title: "",
          },
          {
            path: "history-booking",
            element: <HistoryBooking/>,
            title: "Lịch sử đặt bàn",
          },
          {
            path: "wishlist",
            element: <Whishlist/>,
            title: "Nhà hàng yêu thích",
          },
          {
            path: "rates",
            element: <Rate/>,
            title: "Đánh giá",
          },
          {
            path: "change-password",
            element: <ChangePassword/>,
            title: "Đổi mật khẩu",
          },
          {
            path: "authentication-phone",
            element: <AuthenticationPhone/>,
            title: "Xác thực số điện thoại",
          },
          {
            path: "user-wallet",
            element: <Wallet/>,
            title: "Ví",
          },
        ],
        title: "Thông tin cá nhân",
      },

      // Restaurent
      {
        path: "restaurant",
        // element: ,
        title: "Quản lý nhà hàng",
        children: [
          {
            path: "dashboard",
            element: <Dashboard/>,
          },
          {
            path: "manage-restaurant",
            element: <ManageRestaurant/>,
          },
          {
            path: "manage-order",
            element: <ManageOrder/>,
          },
          {
            path: "manage-rate",
            element: <ManageRate/>,
          },
        ]
      },
    ],
  },
]);

export default router;
