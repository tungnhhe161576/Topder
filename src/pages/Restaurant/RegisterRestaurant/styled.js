import styled from "styled-components";
export const RegisterRestaurantContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: #f5f5f5;

  .register-form-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .form-register {
    margin: 0 auto;
  }

  .header-logo {
    text-align: center;
    margin-bottom: 20px;
  }

  .register-form-container h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
  }

  .ant-row {
  }

  .ant-col {
  }

  .ant-btn {
    width: 100%;
  }

  .ant-btn-primary {
    background-color: #1890ff;
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
    font-weight: 600;
    height: 40px;
    width: 150px;
  }

  .submit:hover {
    background-color: #ff9933 !important;
  }

  .notice {
    color: red;
    font-size: 16px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .register-form-container {
      width: 90%;
    }

    .ant-row {
      flex-direction: column;
    }

    .ant-col {
      width: 100% !important;
    }

    .submit {
      width: 100%;
    }

    .ant-input,
    .ant-select,
    .ant-time-picker,
    .ant-upload {
      width: 100% !important;
    }
  }

  @media (max-width: 480px) {
    .register-form-container h2 {
      font-size: 20px;
    }

    .submit {
      font-size: 14px;
    }
  }
`;
