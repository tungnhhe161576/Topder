import styled from "styled-components";
export const LoginContainer = styled.div`
  width: 100%;

  @font-face {
    font-family: Badabb;
    src: url("../fonts/Badabb/Badabb.ttf");
  }

  @font-face {
    font-family: Poppins;
    src: url("../fonts/Poppins/Poppins.otf");
  }

  .left-side {
    background-color: #ff7c08;
    height: 100vh;
    position: relative;
  }

  .login-img {
    width: 80%;
    position: absolute;
    top: 30%;
    left: 10%;
  }

  .left-side h2 {
    text-align: center;
    font-family: Badabb;
    color: white;
    font-size: 80px;
    margin-top: 50px;
  }

  .right-side {
    background-color: #f1ceaf;
    position: relative;
    height: 100vh;
    overflow: auto;
  }

  .button-close {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #3d3d52;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    color: white;
    margin-left: 20px;
  }

  .title {
    font-family: sans-serif;
    text-align: center;
    display: flex;
    flex-direction: column;

    .side1 {
      font-weight: 700;
      margin-top: 50px;
      font-size: 36px;
    }

    .side2 {
      font-weight: bold;
      font-size: 20px;
      margin-top: 5px;
    }
  }

  .form {
    width: 60%;
    margin: auto;
    display: flex;
  }

  .forgot-password {
    color: blue;
    cursor: pointer;
    align-self: end;
    /* margin-left: 20px; */
    margin-top: -8px;
  }

  .submit {
    background-color: #ff7c08 !important;
    margin-top: 30px;
    font-weight: 600;
    width: 150px;
    height: 40px;
    justify-items: center;
    width: 90%;
    align-self: center;
  }

  .or {
    align-self: center;
  }

  .others-login {
    align-self: center;
    width: 90%;
    height: 50px;
  }

  .others-login Button {
    background-color: rgb(255 255 255 / 44%);
    color: black;
    border: none;
    width: 100%;
    height: 100%;
  }

  .others-login Button:hover {
    background-color: rgb(255 255 255 / 44%) !important;
    color: black !important;
    font-weight: 600 !important;
  }

  .submit:hover {
    background-color: #ff9933 !important;
  }
`;
