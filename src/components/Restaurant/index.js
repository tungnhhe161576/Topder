import React from 'react'
import { RestaurantItemContainer } from './styled'
import { useNavigate } from 'react-router-dom'
import { Rate } from 'antd'
import { HeartOutlined } from '@ant-design/icons';

const RestaurantItem = () => {
    const nav = useNavigate()

    return (
        <RestaurantItemContainer>
            <div className='brand-image' onClick={() => nav('/')}>
                <img className='image-detail' src='https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Cup-Of-Creamy-Coffee.png' alt='Brand-image'/>
            </div>

            <div className='brand-detail'>
                <div className='brand-category' onClick={() => {nav('/')}}> 
                    <span className='pl-15 pr-15'> Quán cà phê | Trà sữa </span>
                </div>
                <div className='brand-name' onClick={() => nav('/')}> Mer.Coffee & Tea </div>
                <div className='rate'>  
                    <Rate style={{color: '#ff7c08'}} value={5} disabled/> - (5 đánh giá)
                </div>
                <div className='hard'></div>
                <div className='option'>
                    <div className='booking' onClick={() => nav('/')}> 
                        <span>Đặt bàn ngay</span>
                    </div>
                    <div className='drop-heart'>
                        <HeartOutlined style={{color: '#ff7c08'}}/>
                    </div>
                </div>
            </div>
        </RestaurantItemContainer>   
    )
}

export default RestaurantItem