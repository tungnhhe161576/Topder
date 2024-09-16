import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import LoginPage from '../pages/Guest/LoginPage'
import RegisterPage from '../pages/Guest/RegisterPage'
import HomePage from '../pages/Guest/HomePage'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import AboutUs from '../pages/Guest/AboutUs'
import Blog from '../pages/Guest/Blog'
import Restaurant from '../pages/Guest/Restaurant'
import Contact from '../pages/Guest/Contact'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage />,
        title: '',
        children: [
            {
                path: '',
                element: <HomePage/> ,
                title: '',
            },
            {
                path: 'login',
                element: <LoginPage/>,
                title: 'Đăng Nhập',
            },
            {
                path: 'register',
                element: <RegisterPage/>,
                title: 'Đăng Ký',
                children: [
                    {}
                ]
            },
            {
                path: 'about-us',
                element: <AboutUs/>,
                title: 'Về Chúng Tôi',
            },
            {
                path: 'blog',
                element: <Blog/>,
                title: 'Blog',
            },
            {
                path: 'restaurant',
                element: <Restaurant/>,
                title: 'Nhà Hàng - Dịch Vụ',
            },
            {
                path: 'contact',
                element: <Contact/>,
                title: 'Liên Hệ',
            },
        ]
    }
])


export default router
