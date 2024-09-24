import { Col, Image, Row } from "antd";
import CommonLayout from "../CommonLayout";
import { ProfileContainer } from "./styled";
import avatar from '../../../assets/images/Dat.jpg'
import { UserOutlined, ReconciliationFilled, StarFilled, HeartFilled, LogoutOutlined, UserSwitchOutlined, CameraOutlined, PhoneOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from "react-router-dom";


const ProfileUserLayout = ( {children} ) => {
    const nav = useNavigate()
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    } 


    return (  
        <CommonLayout>
            <ProfileContainer>
                <Row>
                    <Col xs={12} sm={12} md={10} lg={8} xl={6}>
                        <div className="left">
                            <div className="avatar">
                                <div className="img-container">
                                    <Image src={avatar} alt="avatar"/>
                                    <div className="cam">
                                        <CameraOutlined className="fs-20"/>
                                    </div>
                                </div>
                                <div className="name white fw-700 fs-20 mt-30">
                                    Đỗ Văn Đạt
                                </div>
                            </div>
                            <div className="menu">
                                <div 
                                    className={`menu-item ${isActive('/user-profile') ? 'active' : ''}`}
                                    onClick={() => nav('/user-profile')}
                                >
                                    <div className="icon">
                                        <UserOutlined />
                                    </div>
                                    <div className="item-name">
                                        Thông tin cá nhân
                                    </div>
                                </div>
                                <div 
                                    className={`menu-item ${isActive('/user-profile/history-booking') ? 'active' : ''}`}
                                    onClick={() => nav('/user-profile/history-booking')}
                                >
                                    <div className="icon">
                                        <ReconciliationFilled />
                                    </div>
                                    <div className="item-name">
                                        Lịch sử đặt bàn
                                    </div>
                                </div>
                                <div 
                                    className={`menu-item ${isActive('/user-profile/wishlist') ? 'active' : ''}`} 
                                    onClick={() => nav('/user-profile/wishlist')}
                                >
                                    <div className="icon">
                                        <HeartFilled />
                                    </div>
                                    <div className="item-name">
                                        Yêu thích
                                    </div>
                                </div>
                                <div 
                                    className={`menu-item ${isActive('/user-profile/rates') ? 'active' : ''}`} 
                                    onClick={() => nav('/user-profile/rates')}
                                >
                                    <div className="icon">
                                        <StarFilled />
                                    </div>
                                    <div className="item-name">
                                        Đánh giá
                                    </div>
                                </div>
                                <div 
                                    className={`menu-item ${isActive('/user-profile/change-password') ? 'active' : ''}`} 
                                    onClick={() => nav('/user-profile/change-password')}
                                >
                                    <div className="icon">
                                        <UserSwitchOutlined />
                                    </div>
                                    <div className="item-name">
                                        Đổi mật khẩu
                                    </div>
                                </div>
                                <div 
                                    className={`menu-item ${isActive('/user-profile/authentication-phone') ? 'active' : ''}`} 
                                    onClick={() => nav('/user-profile/authentication-phone')}
                                >
                                    <div className="icon">
                                        <PhoneOutlined />
                                    </div>
                                    <div className="item-name">
                                        Xác thực điện thoại
                                    </div>
                                </div>
                                <div className="menu-item" onClick={handleLogout}>
                                    <div className="icon">
                                        <LogoutOutlined />
                                    </div>
                                    <div className="item-name">
                                        Đăng xuất
                                    </div>
                                </div>
                            </div>
                        </div>      
                    </Col> 
                    <Col xs={12} sm={12} md={14} lg={16} xl={18}>
                        <div className="right">
                            {children}
                        </div>
                    </Col> 
                </Row>
            </ProfileContainer>
        </CommonLayout>
    );
}
 
export default ProfileUserLayout;