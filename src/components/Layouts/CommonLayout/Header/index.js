import React, { useEffect } from "react";
import { Col, Dropdown, Row } from "antd";
import { useNavigate } from "react-router-dom";
import {
  MailOutlined,
  PhoneOutlined,
  TikTokOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getNav, setActiveButton } from "../../../../redux/Slice/navSlice";
import image from "../../../../assets/images/foot-image.png";
import image2 from "../../../../assets/images/blog-item.jpg";
import image3 from "../../../../assets/images/8.3.jpg";
import logo2 from "../../../../assets/images/Logo2.png";


const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const Header = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const activeButton = useSelector(getNav);
    const itemsDropdown = [
        {
            key: '1',
            label: (
                <span className="fs-16 fw-600" onClick={() => nav('/privacy-policy')}>Chính sách bảo mật</span>
            ),
        },
            {
            key: '2',
            label: (
                <span className="fs-16 fw-600" onClick={() => nav('/terms-condition')}>Điều khoản và điều kiện</span>
            ),
        },
    ];

    const handleButtonClick = (buttonName) => {
        dispatch(setActiveButton(buttonName));
    };

    useEffect(() => {
        let prevBtn = document.getElementById('prev');
        let nextBtn = document.getElementById('next');
        let carousel = document.querySelector('.carousel');
        if (carousel) { 
            let items = carousel.querySelectorAll('.list .item');
            let indicator = carousel.querySelector('.indicators');
            let dots = indicator.querySelectorAll('.indicators ul li');
            let active = 0;
            let firstPosition = 0;
            let lastPosition = items.length - 1;
            let autoPlay;

            const startAutoPlay = () => {
                clearInterval(autoPlay); 
                autoPlay = setInterval(() => {
                    nextBtn.click();
                }, 5000);
            }
            startAutoPlay();

            const setSlider = () => {
                let itemActiveOld = carousel.querySelector('.list .item.active');
                if(itemActiveOld) itemActiveOld.classList.remove('active');
                items[active].classList.add('active');

                let dotActiveOld = indicator.querySelector('.indicators ul li.active');
                if(dotActiveOld) dotActiveOld.classList.remove('active');
                dots[active].classList.add('active');

                indicator.querySelector('.number').innerText = '0' + (active + 1);
                startAutoPlay();
            }
            setSlider();

            nextBtn.onclick = () => {
                active = active + 1 > lastPosition ? 0 : active + 1;
                carousel.style.setProperty('--calculation', 1);
                setSlider();
            }
            prevBtn.onclick = () => {
                active = active - 1 < firstPosition ? lastPosition : active - 1;
                carousel.style.setProperty('--calculation', -1);
                setSlider();
                clearInterval(autoPlay);
                autoPlay = setInterval(() => {
                    nextBtn.click();
                }, 5000);
            }
            dots.forEach((item, position) => {
                item.onclick = () => {
                    active = position;
                    setSlider();
                }
            });
        }
    }, [])

        
    return (
        <>
            <div className="header">
                <div className="header-content">
                    <div className="parallelogram">
                        <span>
                            <MailOutlined style={{ transform: "skew(0deg)" }} /> 
                            {" "}topder.vn@gmail.com
                        </span>
                        <span>
                            <PhoneOutlined style={{ transform: "skew(0deg)" }} /> 
                            {" "}0828 290 092
                        </span>
                        <span>
                            <PhoneOutlined style={{ transform: "skew(0deg)" }} />
                            {" "}0931 589 123
                        </span>
                    </div>
                    <div className="contact-icon">
                        <div className="icon">
                            <TikTokOutlined />{" "}
                        </div>
                        <div className="icon">
                            <IconFont type="icon-facebook" />{" "}
                        </div>
                    </div>
                </div>
            </div>

            <div className="nav">
                <div className="d-flex justify-content-space-between" style={{ width: "90%", margin: "auto", height: "90px" }}>
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col xs={6} sm={6} md={3} lg={3} xl={3}>
                            <div className="logo-topder" onClick={() => nav("/")}>
                                <img src={logo2} alt="logo-topder" />
                            </div>
                        </Col>
                        <Col xs={15} sm={15} md={18} lg={18} xl={18}>
                            <div className="list">
                                <span 
                                    style={activeButton === "home" ? { color: "#f07d22" } : {}}
                                    onClick={() => {
                                        handleButtonClick("home");
                                        nav("/");
                                    }}
                                > Trang Chủ </span>
                                <span
                                    style={activeButton === "restaurant" ? { color: "#f07d22" } : {}}
                                    onClick={() => {
                                        handleButtonClick("restaurant");
                                        nav("/restaurant-view");
                                    }}
                                > Nhà Hàng - Dịch Vụ </span>
                                <span style={activeButton === "about-us" ? { color: "#f07d22" } : {}} >
                                    <Dropdown
                                        menu={{
                                            items: itemsDropdown,
                                        }}
                                    >
                                        <span 
                                            onClick={() => {
                                                handleButtonClick("about-us");
                                                nav("/about-us");
                                            }}
                                        >
                                            Về chúng tôi
                                        </span>
                                    </Dropdown>
                                </span>
                                <span
                                    style={activeButton === "blog" ? { color: "#f07d22" } : {}}
                                    onClick={() => {
                                        handleButtonClick("blog");
                                        nav("/blog");
                                    }}
                                > Blog </span>
                                <span
                                    style={activeButton === "contact" ? { color: "#f07d22" } : {}}
                                    onClick={() => {
                                        handleButtonClick("contact");
                                        nav("/contact");
                                    }}
                                > Liên Hệ </span>
                            </div>
                        </Col>
                        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                            <div className="user-info">
                                <div className="lo-re">
                                    <span className="login" onClick={() => nav("/login")}>
                                        Đăng Nhập
                                    </span>
                                    /
                                    <span className="register" onClick={() => nav("/register")}>
                                        Đăng Ký
                                    </span>
                                </div>
                                {/* <div></div> */}
                            </div>
                        </Col>
                    </Row> 
                </div>
            </div>

            <div className="carousel">
                <div className="list">
                    <div class="item ">
                        <figure>
                            <img src={image} alt="img"/>
                        </figure>
                        <div class="content">
                            <p class="category" onclick={() => nav('/restaurant-view')}>
                                Cà phê | Trà sữa 
                            </p>
                            <h2>
                                Mer.Coffee & Tea
                            </h2>
                            <p class="description">
                                Menu 4 món bánh kem hương vị, nhiệt đới mới toanh tại Mer. cả nhà đã update chưa? Ai thử cũng "nghiện" - vậy mà có Hommies vẫn chưa đu trand Bánh Kem tại Mer sao ?
                            </p>
                            <div class="more">
                                <button onClick={() => nav('/restaurant-detail')}>
                                    Đặt bàn
                                </button>
                                <button onClick={() => nav('/restaurant-detail')}>
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="item ">
                        <figure>
                            <img src={image2} alt="img"/>
                        </figure>
                        <div class="content">
                            <p class="category">
                                Cà phê | Trà sữa 
                            </p>
                            <h2>
                                Mer.Coffee & Tea
                            </h2>
                            <p class="description">
                                Menu 4 món bánh kem hương vị, nhiệt đới mới toanh tại Mer. cả nhà đã update chưa? Ai thử cũng "nghiện" - vậy mà có Hommies vẫn chưa đu trand Bánh Kem tại Mer sao ?
                            </p>
                            <div class="more">
                                <button>
                                    Đặt bàn
                                </button>
                                <button>
                                    <i class="fa-solid fa-play"></i> Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="item ">
                        <figure>
                            <img src={image3} alt="img"/>
                        </figure>
                        <div class="content">
                            <p class="category">
                                Cà phê | Trà sữa 
                            </p>
                            <h2>
                                Mer.Coffee & Tea
                            </h2>
                            <p class="description">
                                Menu 4 món bánh kem hương vị, nhiệt đới mới toanh tại Mer. cả nhà đã update chưa? Ai thử cũng "nghiện" - vậy mà có Hommies vẫn chưa đu trand Bánh Kem tại Mer sao ?
                            </p>
                            <div class="more">
                                <button>
                                    Đặt bàn
                                </button>
                                <button>
                                    <i class="fa-solid fa-play"></i> Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="arrows">
                    <button id="prev"> {'<'} </button>
                    <button id="next"> {'>'} </button>
                </div>
                <div class="indicators">
                    <div class="number">02</div>
                    <ul>
                        <li class="active"></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;
