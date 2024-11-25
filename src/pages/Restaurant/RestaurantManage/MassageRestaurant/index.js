import { useEffect, useState } from "react";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { MassageRestaurantContainer } from "./styled";
import { createChat } from "../../../../hub";
import { Avatar, Button, Divider, Form, Input } from "antd";
import dayjs from "dayjs";
import SpinCustom from "../../../../components/Common/SpinCustom";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import UserService from "../../../../services/UserService";

const MassageRestaurant = () => {
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
            form.resetFields()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(!!item) {
            const handleNewChat = (data) => {
                console.log('data', data);
                if (data?.chatBoxId === item?.chatBoxId) {
                    setChatList(prev => [...prev, data]);
                }
            };
            createChat(handleNewChat);
        }
    }, [item?.chatId, item?.chatBoxId, item]);

    const getChatList = async (chatBox) => {
        try {
            setLoading2(true)
            const res = await UserService.getChatList(chatBox?.chatBoxId)
            setChatList(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading2(false)
        }
    }

    
    return (  
        <RestaurantLayout>
            <MassageRestaurantContainer>
                <div className="w-30 left">
                    <div className="d-flex justify-content-center align-items-center" style={{height: '41px'}}>
                        Danh sách 
                    </div>
                    <Divider className="mt-10"/>
                    <div className="list">
                        {
                            chatBox?.map(i => (
                                <div className="item" key={i?.chatBoxId} onClick={() => {setItem(i); getChatList(i)}}> 
                                    <div>
                                        <Avatar size={30} src={<img src={i?.customerImage} alt="avatar"/>} />
                                    </div>
                                    <div className="fs-14 fw-500">
                                        {i?.customerName}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="w-70 right">
                    <div className="header">
                        {
                            !item 
                                ? <div> Chọn cuộc hội thoại </div>
                                : <>
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-column align-items-center mr-20 pl-10">
                                            <div style={{cursor: 'pointer'}}>
                                                <Avatar size={30} src={<img src={item?.customerImage} alt="avatar"/>} />
                                            </div>
                                            <div className="fs-12"> Online </div>
                                        </div>
                                        <div className="fs-14 fw-500">
                                            {item?.customerName}
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
            </MassageRestaurantContainer>
        </RestaurantLayout>
    );
}
 
export default MassageRestaurant;