import {
	Avatar,
	Button,
	Divider,
	Drawer,
	Dropdown,
	Form,
	Input,
	Space,
} from "antd";
import { BodyChat, ChatComponentContainer } from "./styled";
import { useEffect, useRef, useState } from "react";
import UserService from "../../../services/UserService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../redux/Slice/userSlice";
import SpinCustom from "../../../components/Common/SpinCustom";
import dayjs from "dayjs";
import { connection } from "../../../hub";
import ModalDeleteChatBox from "./Modal/ModaldeleteChatBox";

const ChatComponent = ({ open, onCancel, getChatBox, chatBox }) => {
	const [loading, setLoading] = useState(false);
	const [loading2, setLoading2] = useState(false);
	// const [chatBox, setChatBox] = useState([])
	const [chatList, setChatList] = useState([]);
	const [item, setItem] = useState();
	const [modalDeleteChatBox, setModalDeleteChatBox] = useState(false);
	const [message, setMessage] = useState("");
	const user = useSelector(userInfor);
	const ref = useRef(null);
	const chatRef = useRef(null);

	// const chatHandlerRef = useRef()

	// const getChatBox = async () => {
	//     try {
	//         setLoading(true)
	//         const res = await UserService.getChatBox(user?.uid)
	//         setChatBox(res)
	//     } catch (error) {
	//         console.log(error);
	//     } finally {
	//         setLoading(false)
	//     }
	// }
	useEffect(() => {
		if (!!user) {
			getChatBox();
		}
	}, [user]);

	const handleSendMessage = async () => {
		try {
			setLoading(true);
			await UserService.createChat({
				chatId: 0,
				chatBoxId: item.chatBoxId,
				chatBy: user?.uid,
				content: message,
			});
			setMessage("");
			ref.current?.focus();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getChatList = async (chatBox) => {
		try {
			setLoading2(true);
			if (!chatBox?.isRead) {
				await UserService.readChatBox(user?.uid, chatBox?.chatBoxId);
				getChatBox();
			}
			const res = await UserService.getChatList(chatBox?.chatBoxId);
			setChatList(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading2(false);
		}
	};

	useEffect(() => {
		connection.on("CreateChat", (chat) => {
			if (chat?.chatBoxId === chatRef.current?.chatBoxId) {
				setChatList((prev) => [...prev, chat]);
			}
		});
	}, []);
	console.log("dsd", chatList);

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
			label: <span onClick={() => handleDeleteChat(i)}>Xóa</span>,
		},
	];

	const handleDeleteChat = async (i) => {
		try {
			await UserService.deleteChat(i.chatId);
			setChatList((prev) =>
				prev.filter((item) => item.chatId !== i.chatId)
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ChatComponentContainer>
			<Drawer
				// title="Nhắn tin với cửa hàng"
				open={!!open}
				onClose={onCancel}
				width={1200}
				closable={false}
			>
				<BodyChat>
					<div className="w-40 left">
						<div
							className="d-flex justify-content-center align-items-center fs-14 fw-500"
							style={{ height: "41px" }}
						>
							Danh sách nhà hàng
						</div>
						<Divider className="mt-10" />
						<div className="list">
							{/* i?.chatBoxId */}
							{chatBox?.map((i) => (
								<div
									className={`${
										!i?.isRead ? "noread" : ""
									} item ${
										i?.chatBoxId === item?.chatBoxId
											? "selected"
											: ""
									}`}
									key={i?.chatBoxId}
									onClick={() => {
										setItem(i);
										chatRef.current = i;
										getChatList(i);
									}}
								>
									<div className="d-flex align-items-center">
										<div>
											<Avatar
												size={30}
												src={
													<img
														src={i?.restaurantImage}
														alt="avatar"
													/>
												}
											/>
										</div>
										<div className="fs-14 fw-500">
											{i?.restaurantName}
										</div>
									</div>
									{!i?.isRead ? (
										<div className="read"></div>
									) : null}
								</div>
							))}
						</div>
					</div>
					<div className="w-60 right">
						<div className="header">
							{!item ? (
								<div className="fs-14 fw-500">
									Chọn cuộc hội thoại
								</div>
							) : (
								<div className="w-100 d-flex justify-content-space-between">
									<div className="d-flex align-items-center">
										<div className="d-flex flex-column align-items-center mr-20 pl-10">
											<div style={{ cursor: "pointer" }}>
												<Avatar
													size={30}
													src={
														<img
															src={
																item?.restaurantImage
															}
															alt="avatar"
														/>
													}
												/>
											</div>
										</div>
										<div className="fs-14 fw-500">
											{item?.restaurantName}
										</div>
									</div>
									<div>
										<Dropdown
											menu={{
												items: items,
											}}
										>
											<div
												className="fw-500 fs-22"
												style={{ cursor: "pointer" }}
											>
												...
											</div>
										</Dropdown>
									</div>
								</div>
							)}
						</div>
						<SpinCustom spinning={loading2}>
							<div className="list-message">
								{chatList?.map((i) => (
									<div
										key={i?.chatId}
										className={
											i?.chatBy === parseInt(user?.uid)
												? "mysefl"
												: "yours"
										}
									>
										<div
											className="message-content d-flex-end pr-10"
											style={{ textAlign: "right" }}
										>
											<div className="avatar-chat">
												<Avatar
													size={30}
													src={
														<img
															src={i?.chatByImage}
															alt="avatar"
														/>
													}
												/>
											</div>
											<div className="chat-message">
												{i?.content}
											</div>
											<div className="chat-time">
												{dayjs(i?.chatTime).format(
													"DD-MM-YYYY HH:mm"
												)}
											</div>
										</div>
										<div className="mr-20">
											{i?.chatBy ===
												parseInt(user?.uid) && (
												<div>
													<Dropdown
														menu={{
															items: item2(i),
														}}
														trigger={"click"}
													>
														<div
															className="fw-500 fs-16"
															style={{
																cursor: "pointer",
															}}
														>
															...
														</div>
													</Dropdown>
												</div>
											)}
										</div>
									</div>
								))}
							</div>
						</SpinCustom>
						<div className="send-mess p-10">
							{!!item && (
								<Form className="d-flex align-items-center">
									<Input
										ref={ref}
										value={message}
										onChange={(e) =>
											setMessage(e.target.value)
										}
										className="input w-100 mr-5"
										placeholder="Nhập tin"
									/>
									<Button
										htmlType="submit"
										type="primary"
										shape="round"
										className="send"
										loading={loading}
										onClick={() => handleSendMessage()}
									>
										Gửi
									</Button>
								</Form>
							)}
						</div>
					</div>
				</BodyChat>

				{!!modalDeleteChatBox && (
					<ModalDeleteChatBox
						open={modalDeleteChatBox}
						onCancel={() => setModalDeleteChatBox(false)}
						item={item}
						setItem={() => setItem(null)}
						getChatBox={getChatBox}
						setChatList={() => setChatList([])}
					/>
				)}
			</Drawer>
		</ChatComponentContainer>
	);
};

export default ChatComponent;
