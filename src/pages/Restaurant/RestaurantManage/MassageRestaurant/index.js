import { useEffect, useRef, useState } from "react";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { MassageRestaurantContainer } from "./styled";
import { connection, createChat } from "../../../../hub";
import { Avatar, Badge, Button, Divider, Dropdown, Form, Input } from "antd";
import dayjs from "dayjs";
import SpinCustom from "../../../../components/Common/SpinCustom";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import UserService from "../../../../services/UserService";
import ModalDeleteChatBox from "../../../../components/Layouts/ChatComponent/Modal/ModaldeleteChatBox";

const MassageRestaurant = () => {
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [chatBox, setChatBox] = useState([])
    const [chatList, setChatList] = useState([])
    const [item, setItem] = useState()
    const [message, setMessage] = useState('')
    const [modalDeleteChatBox, setModalDeleteChatBox] = useState(false)
    const user = useSelector(userInfor)
    const ref = useRef()
    const chatRef   = useRef(null)


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
            await UserService.createChat({
                chatId: 0,
                chatBoxId: item.chatBoxId,
                chatBy: user?.uid,
                content: message,
            }) 
            setMessage('')
            ref.current?.focus();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        connection.on('CreateChat', (chat) => {
            if (chat?.chatBoxId === chatRef.current?.chatBoxId) {
                setChatList(prev => [...prev, chat]);
            }
            getChatBox()
        });
    }, []);


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

    const items = [
		{
			key: "1",
			label: (
				<span onClick={() => setModalDeleteChatBox(true)}>
					Xóa đoạn chat
				</span>
			),
		},
	];
    const item2 = (i) => [
		{
			key: "1",
			label: (
				<span onClick={() => handleDeleteChat(i)}>
					Xóa
				</span>
			),
		},
	];

    const handleDeleteChat = async (i) => {
        try {
            await UserService.deleteChat(i.chatId)
            setChatList(prev => prev.filter(item => item.chatId!== i.chatId))
        } catch (error) {
            console.log(error)
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
                                <div className={`${!i?.isRead ? 'noread' : ''} item ${i?.chatBoxId === item?.chatBoxId ? 'selected' : ''}`} key={i?.chatBoxId} onClick={() => {setItem(i); getChatList(i); chatRef.current = i}}> 
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <Avatar size={30} src={<img src={i?.customerImage} alt="avatar"/>} />
                                        </div>
                                        <div className="fs-14 fw-500">
                                            {i?.customerName}
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
                <div className="w-70 right">
                    <div className="header">
                        {
                            !item 
                                ? <div> Chọn cuộc hội thoại </div>
                                : <div className="w-100 d-flex justify-content-space-between">
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
                                    <div>
                                        <Dropdown
                                            menu={{
                                                items: items,
                                            }}
                                        >
                                            <div className="fw-500 fs-22">
                                                ...
                                            </div>
                                        </Dropdown>
                                    </div>
                                </div>
                        }
                    </div>
                    <Divider className="mt-5"/>
                    <SpinCustom spinning={loading2}>
                        <div className="list-message">
                            {
                                chatList?.map(i => (
                                    <div key={i?.chatId} className={i?.chatBy === user?.uid ? 'mysefl' : 'yours'}>
                                        <div className="mr-20">
                                            {i?.chatBy === parseInt(user?.uid) && (
                                                <div>
                                                    <Dropdown
                                                        menu={{
                                                            items: item2(i),
                                                        }}
                                                        trigger={'click'}
                                                    >
                                                        <div className="fw-500 fs-16">
                                                            ...
                                                        </div>
                                                    </Dropdown>
                                                </div>
                                            )}
                                        </div>
                                        <div className="d-flex flex-column pr-10" style={{textAlign: 'right'}}>
                                            <div>
                                                {i?.content}
                                            </div>
                                            <div className="gray fs-10">
                                                {dayjs(i?.chatTime).format('DD-MM-YYYY HH:mm')}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </SpinCustom>
                    <div className="send-mess p-10">
                        {
                            !!item && <Form className="d-flex align-items-center">
                                <Input ref={ref} className="w-100" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Nhập tin"/>
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
                            </Form>
                        }
                    </div>
                </div>

                {
                    !!modalDeleteChatBox && (
                        <ModalDeleteChatBox
                            open={modalDeleteChatBox}
                            onCancel={() => setModalDeleteChatBox(false)}
                            item={item}
                            setItem={() => setItem(null)}
                            getChatBox={getChatBox}
                        />
                    )
                }
            </MassageRestaurantContainer>
        </RestaurantLayout>
    );
}
 
export default MassageRestaurant;