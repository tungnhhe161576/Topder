/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { CommonLayoutContainer } from './styled'
import { Breadcrumb } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import router from '../../../router'
import { getBreadcrumbItems } from '../../../lib/breadCrumb'
import { HomeOutlined, MailOutlined, PhoneOutlined, TikTokOutlined, createFromIconfontCN  } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { getNav, setActiveButton } from "../../../redux/Slice/navSlice";

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });

const CommonLayout = ( {children} ) => {
    const nav = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const activeButton = useSelector(getNav);

    
    const breadcrumbItems = getBreadcrumbItems(router.routes, location);

    const handleButtonClick = (buttonName) => {
        dispatch(setActiveButton(buttonName));
      };


    return (
        <CommonLayoutContainer>
            <div className='header'>
                <div className='header-content'>
                    <div class="parallelogram">
                        <span> <MailOutlined style={{transform: 'skew(0deg)'}}/> topder.vn@gmail.com</span>
                        <span> <PhoneOutlined style={{transform: 'skew(0deg)'}}/> 0828 290 092</span>
                        <span> <PhoneOutlined style={{transform: 'skew(0deg)'}}/> 0931 589 123</span>
                    </div>
                    <div className='contact-icon'>
                        <div className='icon'> <TikTokOutlined /> </div>
                        <div className='icon'> <IconFont type="icon-facebook" /> </div> 
                    </div>
                </div>
            </div>

            <div className='nav'>
                <div className='logo-topder' onClick={() => nav('/')}>
                    <img src='/Logo2.png' alt='logo-topder'/>
                </div>
                <div className='list'>
                    <span 
                        style={activeButton === "home" ? {color: '#f07d22'} : {}}
                        onClick={() => {handleButtonClick("home"); nav('/')}}
                    >
                        Trang Chủ
                    </span>
                    <span
                        style={activeButton === "restaurant" ? {color: '#f07d22'} : {}}
                        onClick={() => {handleButtonClick("restaurant"); nav('/restaurant')}}
                    >
                        Nhà Hàng - Dịch Vụ
                    </span>
                    <span 
                        style={activeButton === "about-us" ? {color: '#f07d22'} : {}}
                        onClick={() => {handleButtonClick("about-us"); nav('/about-us')}}
                    >
                        Về Chúng Tôi
                    </span>
                    <span
                        style={activeButton === "blog" ? {color: '#f07d22'} : {}}
                        onClick={() => {handleButtonClick("blog"); nav('/blog')}}
                    >
                        Blog
                    </span>
                    <span
                        style={activeButton === "contact" ? {color: '#f07d22'} : {}}
                        onClick={() => {handleButtonClick("contact"); nav('/contact')}}
                    >
                        Liên Hệ
                    </span>
                </div>
                <div className='user-info'>
                    <div className='lo-re'>
                        <span className='login' onClick={() => nav('/login')}>Đăng Nhập</span> /
                        <span className='register' onClick={() => nav('/register')}> Đăng Ký</span>
                    </div>
                    {/* <div></div> */}
                </div>
            </div>

            <div className='image-container'>
                <img src='https://amia.vn/wp-content/uploads/2021/10/hinh-anh-cac-mon-an-ngon-nhan-lam-theo-yeu-cau-rieng.jpg' alt='image header'/>
                <div className='text-image-container'>
                    Trang chủ
                <Breadcrumb className='bread'>
                    {breadcrumbItems.map((item, index) => (
                        <Breadcrumb.Item key={item.path}>
                            {index === 0 ? (
                                <span onClick={() => nav(`${item.path}`)}>
                                    <HomeOutlined style={{ fontSize: '20px', fontWeight: '700' }} /> Trang chủ {item.breadcrumbName}
                                </span>
                            ) : (
                                <span style={{color: '#f07d22'}} onClick={() => nav(`${item.path}`)}>{item.breadcrumbName}</span>
                            )}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
                </div>
            </div>

            <div className='children'>
                {children}
            </div>
        </CommonLayoutContainer>
    )
}

export default CommonLayout