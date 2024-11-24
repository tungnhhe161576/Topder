import React, { useState } from "react";
import { CommonLayoutContainer } from "./styled";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "antd";
import { WechatOutlined } from '@ant-design/icons';
import ChatComponent from "../ChatComponent";

const CommonLayout = ({ children }) => {
    const [openChat, setOpenChat] = useState(false)
    console.log(openChat);
    
    
    return (
        <CommonLayoutContainer>
            <Header />
            <div className="children">
                <div className="chat" onClick={() => setOpenChat(true)}>
                    <Button>
                        <WechatOutlined />
                    </Button>
                </div>
                <div>
                    {children}
                </div>
            </div>
            <Footer />

            {
                !!openChat && (
                    <ChatComponent
                        open={openChat}
                        onCancel={() => setOpenChat(false)}
                    />
                )
            }
        </CommonLayoutContainer>
        
    );
};

export default CommonLayout;
