import styled from "styled-components";

export const ContactContainer = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 50px;

  .contact-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    max-width: 100%;
  }

  .contact-info {
    background: #f3f7fb;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 60px;
  }

  .contact-info-item {
    border-bottom: 1px solid #ff7c085c;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  .contact-info-item h2 {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    color: #ff7c08;
  }

  .contact-info-item p {
    text-align: center;
    font-size: 16px;
    color: black;
    line-height: 29px;
  }

  .contact-form {
    flex: 1;
    min-width: 500px;
    margin: 20px;
    background-color: #ffffff;
    padding: 20px;
    padding-top: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .contact-form h2 {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
    color: #ff7c08;
  }

  .contact_map {
    width: 100%;
    height: 500px;
    border-radius: 10px;
    overflow: hidden;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
  }

  .contact_map iframe {
    width: 100%;
    height: 100%;
  }

  .contact-submit {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .ant-btn {
    background-color: #ff7c08;
    border: none;
    font-weight: 600;
    height: 40px;
    width: 150px;
  }

  .ant-btn:hover {
    background-color: #ff9933;
  }
  .contact-submit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
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
`;
