import React, { useEffect, useState } from "react";
import { CommonLayoutContainer } from "./styled";
import Header from "./Header";
import Footer from "./Footer";
import { Badge, Button } from "antd";
import { WechatOutlined } from '@ant-design/icons';
import ChatComponent from "../ChatComponent";
import UserService from "../../../services/UserService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../redux/Slice/userSlice";

const CommonLayout = ({ children }) => {
    const [openChat, setOpenChat] = useState(false)
    const user = useSelector(userInfor)
    const [chatBox, setChatBox] = useState([])

    const getChatBox = async () => {
        try {
            const res = await UserService.getChatBox(user?.uid)
            setChatBox(res)
        } catch (error) {
            console.log(error);
        } finally {
        }
    }
    useEffect(() => {
        if (!!user) {
            getChatBox()
        }
    }, [user])
    
    return (
        <CommonLayoutContainer>
            <Header />
            <div className="children">
                <div className="chat" onClick={() => setOpenChat(true)}>
                    <Badge
                        count={
                            chatBox?.filter(
                                (i) => i?.isRead === false
                            ).length
                        }
                        size="small"
                    >
                        <WechatOutlined className="fs-30"/>
                    </Badge>    
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
