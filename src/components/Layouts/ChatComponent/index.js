import { Avatar, Button, Divider, Drawer, Form, Input, Space } from "antd";
import { BodyChat, ChatComponentContainer } from "./styled";
import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../redux/Slice/userSlice";
import SpinCustom from '../../../components/Common/SpinCustom'
import dayjs from "dayjs";
import { createChat, startConnection } from "../../../hub";

const ChatComponent = ({open, onCancel}) => {
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [chatBox, setChatBox] = useState([])
    const [chatList, setChatList] = useState([])
    const [item, setItem] = useState()
    const user = useSelector(userInfor)
    const [form] = Form.useForm()

    const getChatBox = async () => {
        try {
            setLoading(true)
            const res = await UserService.getChatBox(user?.uid)
            setChatBox(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (!!user) {
            getChatBox()
        }
    }, [user])

    const handleSendMessage = async () => {
        try {
            setLoading(true)
            const formValue = await form.validateFields()
            await UserService.createChat({
                chatId: 0,
                chatBoxId: item.chatBoxId,
                chatBy: user?.uid,
                content: formValue?.content,
            }) 

            // createChat((data) => {
            //     console.log('data', data);
            //     if (data?.chatBoxId === item?.chatBoxId) {
            //         setChatList(prev => [...prev, data])
            //     }
            // });
            form.resetFields()
            // getChatList(item)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    
    const getChatList = async (chatBox) => {
        try {
            setLoading2(true)
            if (!chatBox?.isRead) {
                await UserService.readChatBox(user?.uid, chatBox?.chatBoxId)
                getChatBox()
            }
            const res = await UserService.getChatList(chatBox?.chatBoxId)
            setChatList(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading2(false)
        }
    }
    useEffect(() => {
        if (!!item) {
            // let list 
            const handleNewChat = (data) => {
                if (data?.chatBoxId === item?.chatBoxId) {
                    setChatList(prev => [...prev, data]);
                    // list = data
                }
            };
            // console.log('list', list);
            // if (!!list) {
            // }
    
            // Đăng ký listener
            createChat(handleNewChat);
    
            // Dọn dẹp listener khi component unmount hoặc item thay đổi
            return () => {
                // Có thể cần thêm một hàm hủy để ngắt kết nối trong createChat nếu cần thiết
                // removeChat(handleNewChat);
            };
        }
    }, [item]);
    
    
    return (  
        <ChatComponentContainer>
            <Drawer
                // title="Nhắn tin với cửa hàng" 
                open={!!open}
                onClose={onCancel} 
                width={900}
                closable={false}
            >
                <BodyChat>
                    <div className="w-40 left">
                        <div className="d-flex justify-content-center align-items-center" style={{height: '41px'}}>
                            Danh sách 
                        </div>
                        <Divider className="mt-10"/>
                        <div className="list">
                        {/* i?.chatBoxId */}
                            {
                                chatBox?.map(i => (
                                    <div className={`${!i?.isRead ? 'noread' : ''} item ${i?.chatBoxId === item?.chatBoxId ? 'selected' : ''}`} key={i?.chatBoxId} onClick={() => {setItem(i); getChatList(i)}}> 
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <Avatar size={30} src={<img src={i?.restaurantImage} alt="avatar"/>} />
                                            </div>
                                            <div className="fs-14 fw-500">
                                                {i?.restaurantName}
                                            </div>
                                        </div>
                                        {!i?.isRead 
                                            ? <div className="read"></div>
                                            : null
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-60 right">
                        <div className="header">
                            {
                                !item 
                                    ? <div> Chọn cuộc hội thoại </div>
                                    : <>
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-column align-items-center mr-20 pl-10">
                                                <div style={{cursor: 'pointer'}}>
                                                    <Avatar size={30} src={<img src={item?.restaurantImage} alt="avatar"/>} />
                                                </div>
                                                <div className="fs-12"> Online </div>
                                            </div>
                                            <div className="fs-14 fw-500">
                                                {item?.restaurantName}
                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
                        <Divider className="mt-5"/>
                        <SpinCustom spinning={loading2}>
                            <div className="list-message">
                                {
                                    chatList?.map(i => (
                                        <div key={i?.chatId} className={i?.chatBy === user?.uid ? 'mysefl' : 'yours'}>
                                            <div>
                                                {i?.content}
                                            </div>
                                            <div className="gray fs-10">
                                                {dayjs(i?.chatTime).format('DD-MM-YYYY HH:mm')}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </SpinCustom>
                        <div className="send-mess p-10">
                            <Form form={form} className="d-flex align-items-center">
                                <Form.Item
                                    name='content'
                                    className="w-100 mr-5"
                                >
                                    <Input className="w-100" placeholder="Nhập tin"/>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        shape="round"
                                        className="send"
                                        loading={loading}
                                        onClick={() => handleSendMessage()}
                                    >
                                        Gửi
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </BodyChat>
            </Drawer>
        </ChatComponentContainer>
    );
}
 
export default ChatComponent;