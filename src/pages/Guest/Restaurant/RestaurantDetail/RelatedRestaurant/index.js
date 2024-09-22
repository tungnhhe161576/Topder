import { Button, Rate } from "antd";

const RelatedRestaurant = () => {
    return (  
        <div className="related-restaurant-container">
            <div className="image-container">
                <img src="https://simexcodl.com.vn/wp-content/uploads/2023/11/cac-loai-ca-phe-o-viet-nam-8.jpg" alt="related-restaunrant"/>
            </div>
            <div className="restaurant-container">
                <div className="name">
                    Bụi phố cà phê
                </div>
                <div className="rate">
                    <Rate className='primary fs-14' value={5} disabled/> - (5 đánh giá)
                </div>
                <div className="button-booking">
                    <Button className="bg-primary button" shape="round">
                        Đặt bàn
                    </Button>
                </div>
            </div>
        </div>
    );
}
 
export default RelatedRestaurant;