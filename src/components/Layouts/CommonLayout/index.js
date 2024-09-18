import React from "react";
import { CommonLayoutContainer } from "./styled";
import Header from "./Header";
import Footer from "./Footer";

const CommonLayout = ({ children }) => {
  return (
    <CommonLayoutContainer>
      <Header />

      <div className="children">{children}</div>
      <Footer />
    </CommonLayoutContainer>
  );
};

export default CommonLayout;
