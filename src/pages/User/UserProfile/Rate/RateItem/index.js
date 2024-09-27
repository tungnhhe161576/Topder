import { Rate } from 'antd';
import restaurantImg from '../../../../../assets/images/blog-item.jpg'

const RateItem = () => {
    return (  
        <div className="rate-container">
            <div className="image-container">
                <img src={restaurantImg} alt="restaurant-image"/>
            </div>
            <div className='detail'>
                <div className='name'> Mer.Coffee & Tea </div>
                <div className='date'> 13/06/2024 </div>
                <div className='vote'>
                    <Rate className='fs-13' style={{color: '#ff7c08'}} value={5} disabled/>
                </div>
                <div className='content'>
                    Đồ uống ngon, ok
                </div>
            </div>
        </div>
    );
}
 
export default RateItem;