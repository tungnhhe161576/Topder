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
        breadcrumbName: '',
        children: [
            {
                path: '',
                element: <HomePage/> ,
                breadcrumbName: '',
            },
            {
                path: 'login',
                element: <LoginPage/>,
                breadcrumbName: 'Đăng Nhập',
            },
            {
                path: 'register',
                element: <RegisterPage/>,
                breadcrumbName: 'Đăng Ký',
                children: [
                    {}
                ]
            },
            {
                path: 'about-us',
                element: <AboutUs/>,
                breadcrumbName: 'Về Chúng Tôi',
            },
            {
                path: 'blog',
                element: <Blog/>,
                breadcrumbName: 'Blog',
            },
            {
                path: 'restaurant',
                element: <Restaurant/>,
                breadcrumbName: 'Nhà Hàng - Dịch Vụ',
            },
            {
                path: 'contact',
                element: <Contact/>,
                breadcrumbName: 'Liên Hệ',
            },
        ]
    }
])


export default router
