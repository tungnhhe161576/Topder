import styled from "styled-components";

export const BlogDetailContainer = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 100px;

  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .blog-page-container {
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .blog-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .blog-header {
    position: relative;
  }

  .blog-image {
    width: 100%;
    border-radius: 10px;
  }

  .blog-author {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    color: #ff7f00;
    font-weight: bold;
  }

  .blog-title {
    margin-top: 20px;
    font-size: 30px;
    color: #333;
  }

  .blog-description {
    font-size: 16px;
    margin-top: 10px;
    line-height: 1.6;
    color: #555;
  }

  h3 {
    margin-top: 20px;
    color: #333;
  }

  .blog-footer {
    margin-top: 30px;
    font-weight: bold;
    color: #ff7f00;
  }
  .blog-footer span {
    font-size: 20px;
    font-weight: 700;
    color: black;
    text-transform: capitalize;
    margin-right: 10px;
  }
  .blog-footer a {
    color: #ff7f00;
    text-transform: capitalize;
    margin-right: 20px;
  }
  .blog-sidebar {
    padding-left: 20px;
  }

  .sidebar-section {
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .sidebar-section h2 {
    margin-bottom: 10px;
    color: #ff7f00;
    border-bottom: 1px solid #ff7c085c;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  .sidebar-section p {
    color: #333;
    margin: 0;
  }

  .sidebar-section a {
    color: #333;
    margin: 0;
  }

  .submit {
  }

  .submit:hover {
    background-color: #ff9933 !important;
    color: #333;
  }
  @media (max-width: 768px) {
    .blog-page-container {
      padding: 10px;
    }

    .blog-content {
      padding: 15px;
    }

    .blog-sidebar {
      padding-left: 0;
    }
  }
`;
