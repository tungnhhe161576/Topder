import { Button, Col, Form, Image, message, Row, Upload } from "antd";
import CommonLayout from "../CommonLayout";
import { ProfileContainer } from "./styled";
import { UserOutlined, ReconciliationFilled, StarFilled, HeartFilled, LogoutOutlined, UserSwitchOutlined, CameraOutlined, PhoneOutlined, WalletOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from "react-router-dom";
import { formatNumberToK } from "../../../lib/stringUtils";
import { useDispatch, useSelector } from "react-redux";
import { setUserInformation, updateUserInformation, userInfor } from "../../../redux/Slice/userSlice";
import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import ImageService from "../../../services/ImageService";
import { setAccessToken } from "../../../redux/Slice/accessTokenSlice";


const ProfileUserLayout = ( {children} ) => {
    const nav = useNavigate()
    const location = useLocation();
    const user = useSelector(userInfor)
    const [avatar, setAvatar] = useState(null)
    const dispatch  = useDispatch()
    const [loading, setLoading] = useState(false)
    const [wallet, setWallet] = useState()
    const [form] = Form.useForm()

    const isActive = (path) => location.pathname === path;

    const getWalletInfo = async () => {
        try {
            const res = await UserService.getWalletInfo(user?.uid)
            setWallet(res)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user && user?.image) {
            setAvatar(user.image);
            getWalletInfo()
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(setAccessToken(null));  
        dispatch(setUserInformation(null))
        nav('/login')
    }

    const handleBeforeUpload = (file) => {
        const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"]
        const isAllowedType = allowedImageTypes.includes(file.type)
        if (!isAllowedType) {
          message.open({
            content: 'Vui lòng chọn file hình ảnh đúng định dạng (JPG, PNG, GIF).',
            type: 'error',
            style: {
                marginTop: '20vh',
            },
          })
        } else {
          setAvatar(URL.createObjectURL(file))
        }
        return isAllowedType ? false : Upload.LIST_IGNORE
    }

    const handleUpdateAvatar = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            const file = values.avatar.file;
            const formData = new FormData();
            formData.append("file", file);

            const getImage = await ImageService.uploadImage(formData)
            setAvatar(getImage.url)

            const res = await UserService.updateProfile({
                Uid: user.uid,
                Image: getImage.url
            })
            message.open({
                content: res.message,
                type: 'success',
                style: {
                    marginTop: '20vh',
                },
            })

            dispatch(updateUserInformation({ image: getImage.url }));
        } catch (error) {
            console.error("Error updating avatar:", error)
        } finally {
            setLoading(false)
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
                                        <Form form={form}>
                                            <Form.Item
                                                name="avatar"
                                                className="m-0 p-0"
                                            >
                                                <Upload.Dragger
                                                    className="dragger"
                                                    beforeUpload={file => handleBeforeUpload(file)}
                                                    style={{ width: '100%', height: '150px', border: 'none' }}
                                                    accept="image/*"
                                                    multiple={false}
                                                    maxCount={1}
                                                    fileList={[]}
                                                >
                                                    <CameraOutlined className="fs-20"/>
                                                </Upload.Dragger>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                                {
                                    avatar !== user?.image 
                                        ? 
                                            <div className="d-flex justify-content-center mt-15">
                                                <Button 
                                                    className="mr-5 fs-12 fw-500 pl-20 pr-20" 
                                                    shape="round"
                                                    type="primary"
                                                    onClick={() => handleUpdateAvatar()}
                                                    loading={loading}
                                                >
                                                    Lưu
                                                </Button>
                                                <Button 
                                                    onClick={() => setAvatar(user?.image)}
                                                    className="fs-12 fw-500 white out-image"
                                                    style={{backgroundColor: 'gray', border: 'none'}}
                                                    shape="round"
                                                >
                                                    Thoát
                                                </Button>
                                            </div>
                                        : <></>
                                }
                                <div className="name white fw-700 fs-20 mt-20">
                                    {user?.name}
                                </div>
                                <div className="white fw-700 fs-18 mt-5 d-flex justify-content-center">
                                    <div>
                                        Số dư ví: <span style={{color: 'black'}}> {wallet?.walletBalance ? formatNumberToK(wallet?.walletBalance) : "0đ"} </span> 
                                    </div>
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
                                <div 
                                    className={`menu-item ${isActive('/user-profile/user-wallet') ? 'active' : ''}`} 
                                    onClick={() => nav('/user-profile/user-wallet')}
                                >
                                    <div className="icon">
                                        <WalletOutlined />
                                    </div>
                                    <div className="item-name">
                                        Ví của tôi
                                    </div>
                                </div>
                                <div className="menu-item" onClick={() => handleLogout()}>
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