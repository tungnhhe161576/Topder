import { Button, message, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import UserService from "../../../../../services/UserService";
import { useState } from "react";
import ModalRequestLogin from "../../../../../components/Modal/RequestLogin";

const RelatedRestaurant = ( {data, user} ) => {
    const nav = useNavigate()
    const [openRequestLogin, setOpenRequestLogin] = useState(false)
    const [text, setText] = useState('')

    const handleCreateChatBox = async () => {
        if (!user) {
			setOpenRequestLogin(true);
			setText("Bạn cần đăng nhập để nhắn tin với cửa hàng này");
			return;
		}
        
		try {
			const res = await UserService.checkExistChatBox(user?.uid, data?.uid)
			if (res) {
				message.open({
					content: 'Cuộc hội thoại đã được tạo!',
					type: 'success',
					style: {
						marginTop: '10vh',
					},
				})
			} else {
				await UserService.createChatBox({
					chatBoxId: 0,
					customerId: user?.uid,
					restaurantId: data?.uid
				})
				message.open({
					content: 'Tạo cuộc hội thoại thành công!',
					type: 'success',
					style: {
						marginTop: '10vh',
					},
				})
			}
		} catch (error) {
			console.log(error);
		} finally {}
	}

    return (  
        <>
            <div className="related-restaurant-container">
                <div className="image-container">
                    <img src={data?.logo} alt="related-restaunrant"/>
                </div>
                <div className="restaurant-container">
                    <div className="name">
                        {data?.nameRes}
                    </div>
                    <div className="rate">
                        <Rate className='primary fs-14' value={data?.star} disabled/> - ({data?.totalFeedbacks} đánh giá)
                    </div>
                    <div className="button-booking d-flex justify-content-center">
                        <Button className="button mr-5" shape="round" onClick={() => nav('/restaurant-detail/' + data?.uid)}>
                            Đặt bàn
                        </Button>
                        <Button className="button mr-5" shape="round" onClick={() => handleCreateChatBox()}>
                            Nhắn tin
                        </Button>
                    </div>
                </div>
            </div>
            {!!openRequestLogin && (
				<ModalRequestLogin
					open={openRequestLogin}
					onCancel={() => setOpenRequestLogin(false)}
					text={text}
				/>
			)}
        </>
    );
}
 
export default RelatedRestaurant;