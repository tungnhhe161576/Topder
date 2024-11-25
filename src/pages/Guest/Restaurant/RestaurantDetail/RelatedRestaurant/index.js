import { Button, Rate } from "antd";
import { useNavigate } from "react-router-dom";

const RelatedRestaurant = ( {data} ) => {
    const nav = useNavigate()

    return (  
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
                <div className="button-booking d-flex">
                    <Button className="button mr-5" shape="round" onClick={() => nav('/restaurant-detail/' + data?.uid)}>
                        Đặt bàn
                    </Button>
                    <Button className="button mr-5" shape="round">
                        Nhắn tin
                    </Button>
                    <Button className="button" shape="round">
                        Yêu thích
                    </Button>
                </div>
            </div>
        </div>
    );
}
 
export default RelatedRestaurant;