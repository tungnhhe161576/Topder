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
import RestaurantItem from "../components/RestaurantItem";
import BlogItem from "../components/BlogItem";
import PrivacyPolicy from "../pages/Guest/PrivacyPolicy";
import TermAndConditon from "../pages/Guest/TermsAndCondition";
import ForgotPassword from "../pages/Guest/ForgotPassword";
import RegisterRestaurant from "../pages/Guest/RegisterRestaurant";

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
        path: "restaurant",
        element: <Restaurant />,
        title: "Nhà Hàng - Dịch Vụ",
      },
      {
        path: "contact",
        element: <Contact />,
        title: "Liên Hệ",
      },
      {
        path: "blog-item",
        element: <BlogItem />,
      },
      {
        path: "restaurant/register",
        element: <RegisterRestaurant />,
        title: "Đăng kí nhà hàng",
      },
    ],
  },
]);

export default router;
