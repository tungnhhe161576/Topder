import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/Logo2.png'
import { SearchOutlined, MailOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';

const Header = () => {
    const nav = useNavigate()
    
    return (  
        <div className='header'>
            <div className="logo" onClick={() => nav("/restaurant/dashboard")}>
                <img src={logo} alt="logo-topder" />
            </div>
            <div className='options'>
                <div className='item search'> 
                    <SearchOutlined /> 
                </div>
                <div className='item mail'> 
                    <MailOutlined /> 
                </div>
                <div className='item notification'> 
                    <BellOutlined /> 
                </div>
                <div className='item user'> 
                    <UserOutlined /> 
                </div>
            </div>
        </div>
    );
}
 
export default Header;