import styled from "styled-components";

export const CommonLayoutContainer = styled.div`
  width: 100%;
  background: linear-gradient(to right, #fff6ee 0%, white 50%, #fff6ee 100%);

  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    display: inline-block;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }
  /* :root {
  --colorPrimary: #ff7c08;
  --colorRed: #eb0029;
  --paraColor: #484747;
  --colorBlack: #231f40;
  --colorWhite: #ffffff;
  --paraFont: "Manrope", sans-serif;
  --headingFont: "Barlow", sans-serif;
  --cursiveFont: "Oleo Script", cursive;
  --boxShadow: rgba(100, 100, 111, 0.15) 0px 7px 29px 0px;
}  */
  .header {
    width: 100%;
    background: #231f40;
    height: 45px;

    .header-content {
      display: flex;
      width: 90%;
      margin: auto;
      justify-content: space-between;

      .parallelogram {
        width: 600px;
        height: 45px;
        background-color: #f07d22;
        transform: skew(-30deg);
        margin-left: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      .parallelogram span {
        transform: skew(30deg);
        font-size: 15px;
        font-weight: 600;
        color: white;
      }

      .contact-icon {
        align-self: center;
        font-size: 20px;
        font-weight: 600;
        color: white;
        display: flex;

        .icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #f07d22;
          margin-right: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .contact-icon {
    }
  }

  .nav {
    width: 100%;
    /* height: 90px;
        margin: auto;
        display: flex;
        justify-content: space-between; */
    position: sticky;
    top: 0;
    z-index: 100;
    background: linear-gradient(to right, #fff6ee 0%, white 50%, #fff6ee 100%);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .logo-topder img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .list {
      align-self: center;
      display: flex;
      justify-content: space-between;

      span {
        padding: 0 15px;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s ease;
        transform-origin: center bottom;
        border-color: transparent !important;
        box-shadow: none !important;
      }

      span:hover {
        color: #ff7a33;
        transform: scale(1.05);
      }
    }

    .user-info {
      align-self: center;
    }

    .lo-re {
      font-size: 20px;
      cursor: pointer;
    }

    .login:hover,
    .register:hover {
      color: #ff7a33;
    }
  }

  .image-container {
    width: 100%;
    height: 350px;
    position: relative;
    display: inline-block;
  }

  .image-container img {
    height: 100%;
    width: 100%;
    opacity: 0.8;
    z-index: 1;
  }

  .image-container .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .text-image-container {
    z-index: 2;
    position: absolute;
    top: 50%;
    padding-left: 30%;
    /* left: 10%; */
    transform: translate(-50%, -50%);
    color: black;
    font-size: 50px;
    font-weight: bold;
    text-align: center;

    .bread {
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    .bread:hover {
      font-weight: 700;
    }
  }

  .children {
    width: 100%;
  }
  // footer
  footer {
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
  }

  .footer_overlay {
    background: #231f40e0;
  }

  .footer_content .footer_logo {
    width: 120px;
  }

  .footer_content span {
    display: block;
    margin: 0px 0px;
    color: #ffffff;
  }

  .footer_content .social_link li a {
    color: #ffffff;
    width: 35px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    background: #ff7c08;
    border-radius: 50%;
    margin-right: 10px;
    margin-top: 0;
    padding: 0;
    position: initial;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }

  .footer_content .social_link li a:hover {
    background: #ffffff;
    color: #ff7c08;
  }

  .footer_content .info {
    color: #dfdddd;
    margin-top: 20px;
    display: block;
    border-bottom: 1px solid #ff7c0885;
    padding-bottom: 20px;
    margin-bottom: 20px;
    padding-left: 35px;
    position: relative;
  }

  .footer_content .info:last-child {
    margin-bottom: 0;
  }

  .footer_content .info i {
    font-size: 20px;
    color: #ff7c08;
    position: absolute;
    left: 0;
    top: 3px;
  }

  .footer_content h3 {
    color: #ffffff;
    font-size: 22px;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 20px;
    border-bottom: 1px solid #ff7c08;
    display: inline-block;
    padding-bottom: 5px;
  }

  .footer_content ul li a {
    color: #dfdddd;
    text-transform: capitalize;
    font-size: 16px;
    margin-top: 15px;
    display: block;
    position: relative;
    padding-left: 15px;
    transition: all linear 0.3s;
    -webkit-transition: all linear 0.3s;
    -moz-transition: all linear 0.3s;
    -ms-transition: all linear 0.3s;
    -o-transition: all linear 0.3s;
  }

  .footer_content ul li a::after {
    position: absolute;
    content: "";
    width: 7px;
    height: 7px;
    background: #ff7c08;
    top: 9px;
    left: 0;
    transition: all linear 0.3s;
    -webkit-transition: all linear 0.3s;
    -moz-transition: all linear 0.3s;
    -ms-transition: all linear 0.3s;
    -o-transition: all linear 0.3s;
  }

  .footer_content ul li a:hover {
    color: #ff7c08;
  }

  .footer_social_link ul li a {
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    background: #eeeeee5e;
    border-radius: 50%;
    margin: 0px 10px 0px 0px;
    padding: 0 !important;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }

  .footer_bottom_text p {
    color: #fff6ee;
    text-align: center;
  }

  .footer_bottom_text p b {
    text-transform: capitalize;
    color: #fff6ee;
    transition: all linear 0.3s;
    -webkit-transition: all linear 0.3s;
    -moz-transition: all linear 0.3s;
    -ms-transition: all linear 0.3s;
    -o-transition: all linear 0.3s;
    font-weight: 600;
  }

  .footer_bottom {
    padding: 10px 0px;
    background: #ff7c08;
  }

  .scroll_btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 9999;
    cursor: pointer;
    text-align: center;
    color: #ffffff;
    text-transform: capitalize;
    width: 45px;
    height: 45px;
    line-height: 45px;
    background: #ff7c08;
    border: 1px solid #ffffff;
    border-radius: 50%;
    transition: all linear 0.3s;
    -webkit-transition: all linear 0.3s;
    -moz-transition: all linear 0.3s;
    -ms-transition: all linear 0.3s;
    -o-transition: all linear 0.3s;
    animation: scroll_amini linear 2s infinite alternate;
    -webkit-animation: scroll_amini linear 2s infinite alternate;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }

  .scroll_btn:hover {
    background: #231f40;
  }

  @keyframes scroll_amini {
    from {
      bottom: 30px;
    }

    to {
      bottom: 50px;
    }
  }
`;
