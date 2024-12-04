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
import { connection } from "../../../hub";

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
        connection.on('CreateChat', (chat) => {
            if (!!chat && !!user) {
                getChatBox()
            }
        });
    }, [user]);
    // useEffect(() => {
    //     if (!!user) {
    //         getChatBox()
    //     }
    // }, [user])
    
    return (
        <CommonLayoutContainer>
            <Header />
            <div className="children">
                {
                    !!user 
                        ? <div className="chat" onClick={() => setOpenChat(true)}>
                            <Badge
                                count={
                                    chatBox?.filter(
                                        (i) => i?.isRead === false
                                    ).length
                                }
                                size="large"
                                style={{marginRight: '-10px', marginTop: '-5px'}}
                            >
                                <WechatOutlined className="fs-30"/>
                            </Badge>    
                        </div>
                        : null
                }
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
                        getChatBox={getChatBox}
                        chatBox={chatBox}
                    />
                )
            }
        </CommonLayoutContainer>
        
    );
};

export default CommonLayout;
