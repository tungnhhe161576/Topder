import styled from "styled-components";
export const RegisterRestaurantContainer = styled.div`
  width: 100%;

  .register-form-container {
    width: 60%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  .header-logo {
    text-align: center;
  }
  .register-form-container h2 {
    text-align: center;
    margin-bottom: 30px;
  }

  .ant-row {
    margin-bottom: 2px;
  }
  .ant-btn {
    width: 100%;
  }

  .ant-btn-primary {
    background-color: #1890ff;
    border-color: #1890ff;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .register-submit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
  }
  .submit {
    background-color: #ff7c08 !important;
    margin-top: 10px;
    font-weight: 600;
    height: 40px;
    width: 150px;
  }
  .submit:hover {
    background-color: #ff9933 !important;
  }
  .notice {
    color: red;
    margin-top: 0px;
    font-size: 16px;
    font-weight: 600;
  }
`;
