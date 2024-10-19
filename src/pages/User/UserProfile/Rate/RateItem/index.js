import { Rate } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const RateItem = ( {rate} ) => {
    const nav = useNavigate()


    return (  
        <div className="rate-container">
            <div className="image-container" onClick={() => nav('/restaurant-detail/' + rate?.restaurantId)}>
                <img src={rate?.restaurantImage} alt="restaurant-image"/>
            </div>
            <div className='detail'>
                <div className='name' onClick={() => nav('/restaurant-detail/' + rate?.restaurantId)}> {rate?.restaurantName} </div>
                <div className='date'> {dayjs(rate?.createDate).format('DD-MM-YYYY')} </div>
                <div className='vote'>
                    <Rate className='fs-13' style={{color: '#ff7c08'}} value={rate?.star} disabled/>
                </div>
                <div className='content'>
                    {rate?.content}
                </div>
            </div>
        </div>
    );
}
 
export default RateItem;