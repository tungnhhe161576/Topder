import React from "react";
import { Breadcrumb } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import router from "../../../../router";
import { getBreadcrumbItems } from "../../../../lib/breadCrumb";
import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  TikTokOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getNav, setActiveButton } from "../../../../redux/Slice/navSlice";
import image from "../../../../assets/images/foot-image.png";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const Header = () => {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const activeButton = useSelector(getNav);

  const breadcrumbItems = getBreadcrumbItems(router.routes, location);

  const items = [
    {
      title: (
        <span className="white" onClick={() => nav("/")}>
          <HomeOutlined style={{ fontSize: "20px", fontWeight: "700" }} /> Trang
          chủ
        </span>
      ),
      path: "/",
    },
    ...breadcrumbItems.slice(1)?.map((item) => ({
      title: (
        <span style={{ color: "#f07d22" }} onClick={() => nav(item?.path)}>
          {item?.title}
        </span>
      ),
      path: item?.path || "/",
    })),
  ];

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/":
        return "Trang chủ";
      case "/restaurant":
        return "Nhà Hàng - Dịch Vụ";
      case "/about-us":
        return "Về Chúng Tôi";
      case "/blog":
        return "Blog";
      case "/contact":
        return "Liên Hệ";
      default:
        return "Trang chủ";
    }
  };

  const handleButtonClick = (buttonName) => {
    dispatch(setActiveButton(buttonName));
  };
  return (
    <>
      <div className="header">
        <div className="header-content">
          <div className="parallelogram">
            <span>
              {" "}
              <MailOutlined style={{ transform: "skew(0deg)" }} />{" "}
              topder.vn@gmail.com
            </span>
            <span>
              {" "}
              <PhoneOutlined style={{ transform: "skew(0deg)" }} /> 0828 290 092
            </span>
            <span>
              {" "}
              <PhoneOutlined style={{ transform: "skew(0deg)" }} /> 0931 589 123
            </span>
          </div>
          <div className="contact-icon">
            <div className="icon">
              {" "}
              <TikTokOutlined />{" "}
            </div>
            <div className="icon">
              {" "}
              <IconFont type="icon-facebook" />{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="nav">
        <div
          className="d-flex justify-content-space-between"
          style={{ width: "90%", margin: "auto", height: "90px" }}
        >
          <div className="logo-topder" onClick={() => nav("/")}>
            <img src="/Logo2.png" alt="logo-topder" />
          </div>
          <div className="list">
            <span
              style={activeButton === "home" ? { color: "#f07d22" } : {}}
              onClick={() => {
                handleButtonClick("home");
                nav("/");
              }}
            >
              Trang Chủ
            </span>
            <span
              style={activeButton === "restaurant" ? { color: "#f07d22" } : {}}
              onClick={() => {
                handleButtonClick("restaurant");
                nav("/restaurant");
              }}
            >
              Nhà Hàng - Dịch Vụ
            </span>
            <span
              style={activeButton === "about-us" ? { color: "#f07d22" } : {}}
              onClick={() => {
                handleButtonClick("about-us");
                nav("/about-us");
              }}
            >
              Về Chúng Tôi
            </span>
            <span
              style={activeButton === "blog" ? { color: "#f07d22" } : {}}
              onClick={() => {
                handleButtonClick("blog");
                nav("/blog");
              }}
            >
              Blog
            </span>
            <span
              style={activeButton === "contact" ? { color: "#f07d22" } : {}}
              onClick={() => {
                handleButtonClick("contact");
                nav("/contact");
              }}
            >
              Liên Hệ
            </span>
          </div>
          <div className="user-info">
            <div className="lo-re">
              <span className="login" onClick={() => nav("/login")}>
                Đăng Nhập
              </span>{" "}
              /
              <span className="register" onClick={() => nav("/register")}>
                {" "}
                Đăng Ký
              </span>
            </div>
            {/* <div></div> */}
          </div>
        </div>
      </div>

      <div className="image-container">
        <img src={image} alt="image-header" />
        <div className="overlay"></div>
        <div className="text-image-container">
          <span className="white">{getPageTitle(location.pathname)}</span>
          {/* <Breadcrumb className='bread'>
                        {breadcrumbItems.map((item, index) => (
                            <Breadcrumb.Item key={item.path}>
                                {index === 0 ? (
                                    <span onClick={() => nav(`${item.path}`)}>
                                        <HomeOutlined style={{ fontSize: '20px', fontWeight: '700' }} /> Trang chủ {item.title}
                                    </span>
                                ) : (
                                    <span style={{color: '#f07d22'}} onClick={() => nav(`${item.path}`)}>{item.title}</span>
                                )}
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb> */}
          <Breadcrumb className="bread" items={items} />
        </div>
      </div>
    </>
  );
};

export default Header;
