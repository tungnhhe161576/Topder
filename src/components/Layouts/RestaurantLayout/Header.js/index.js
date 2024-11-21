import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/Logo2.png";
import {
	SearchOutlined,
	MailOutlined,
	BellOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
	setUserInformation,
	userInfor,
} from "../../../../redux/Slice/userSlice";
import { setAccessToken } from "../../../../redux/Slice/accessTokenSlice";
import { Badge, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { onReceiveNoti, startConnection } from "../../../../hub";
import { addNoti, allNoti } from "../../../../redux/Slice/notiSlice";
import dayjs from "dayjs";
import UserService from "../../../../services/UserService";

const Header = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(userInfor);
	// const notis = useSelector(allNoti)
	const [notis, setNotis] = useState([])
	
	const items = [
		{
			key: '1',
			label: (
				<span className="fs-16 fw-600" onClick={() => nav(`/restaurant/manage-restaurant`)}>Thông tin nhà hàng</span>
			),
		},
			{
			key: '2',
			label: (
				<span className="fs-16 fw-600 w-100" onClick={() => handleLogout()}>Đăng xuất</span>
			),
		},
	];

	const getListNoti = async () => {
		try {
            // setLoading(true)
            const notisRes = await UserService.getAllNoti(user?.uid) 
			setNotis(notisRes)
            // dispatch(updateListNoti(res))
        } catch (error) {
            console.log(error)
        } 
	}
	useEffect(() => {
		if (!!user) {
			getListNoti()
		}
	}, [user])

	useEffect(() => {
		if (!!user) {
			const initSignalR = async () => {
				await startConnection();
				onReceiveNoti((data) => {
					console.log("data", data);
					
					const notiData = data.find(i => i?.uid === user?.uid)
					console.log("noti", notiData);
					if (!!notiData) {
						setNotis(prev => [notiData, ...prev])
					}
					
					// dispatch(addNoti(notiData))
				});
			};
	
			initSignalR();
	
			return () => {
				// connection.stop();
			};
		}
    }, [user]);


	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch(setAccessToken(null));
		dispatch(setUserInformation(null));
		nav("/login");
	};

	const itemNotis =  notis.map(notification => ({
		key: notification?.notificationId,
		label: (
			<div className={notification?.isRead ? 'no-read' : 'read'}>
			<div> {notification?.type} </div>
			<div>
				{notification?.content}
			</div>
			<div> {dayjs(notification?.createdAt).format('DD-MM-YYYY')} </div>
			</div>
		),
		}));

	
	return (
		<div className="header">
			<div className="logo" onClick={() => nav("/restaurant/dashboard")}>
				<img src={logo} alt="logo-topder" />
			</div>
			<div className="options">
				<div className="item search">
					<SearchOutlined />
				</div>
				<div className="item mail">
					<MailOutlined />
				</div>
				<div className="item notification">
					<Badge count={notis?.length} size="small">
						<div className="fs-22 fw-500">
							<Dropdown
								menu={{
									items: itemNotis,
								}}
								trigger={['click']}
							>
								<BellOutlined />
							</Dropdown>
						</div>
					</Badge>
				</div>
				<div className="item user">
					<Dropdown
						menu={{
							items: items,
						}}
					>
						<UserOutlined />
					</Dropdown>
				</div>
			</div>
		</div>
	);
};

export default Header;
