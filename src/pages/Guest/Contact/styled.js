import styled from "styled-components";

export const ContactContainer = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 20px;

  .contact-page {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
    background-color: #f9f9f9;
  }

  .contact-info {
    flex: 1;
    min-width: 300px;
    margin: 20px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .contact-info-item {
    border-bottom: 1px solid #ff7c085c;
    padding-bottom: 35px;
    margin-bottom: 35px;
  }

  .contact-info-item h2 {
    text-transform: capitalize;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
    color: #ff7c08;
  }

  .contact-info-item p {
    display: block;
    text-align: center;
    font-size: 16px;
    color: black;
    line-height: 29px;
  }

  .contact-form {
    flex: 1;
    min-width: 300px;
    margin: 20px;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  .contact-form h2 {
    text-transform: capitalize;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
    color: #ff7c08;
  }

  .contact-map {
    margin-top: 20px;
    margin-bottom: 50px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .contact-map iframe {
    width: 100%;
    border: none;
  }

  .ant-input-prefix {
    margin-right: 8px;
  }

  .ant-btn {
    background-color: #ff7c08;
    border: none;
    margin-top: 15px;
  }

  .ant-btn:hover {
    background-color: #e06b00;
  }
  .textarea-wrapper {
    position: relative;
  }

  .textarea-wrapper .anticon {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .ant-input-textarea {
    padding-left: 30px;
  }
`;
