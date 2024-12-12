import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUserInformation, userInfor } from './redux/Slice/userSlice';
import { jwtDecode } from "jwt-decode"
import UserService from './services/UserService';
import { router } from './router';

function App() {
    const dispatch = useDispatch();
    const nav = useNavigate()
    const location = useLocation()
    

    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/oversea/index.js';
        script.async = true;
    
        script.onload = () => {
            new window.CozeWebSDK.WebChatClient({
                config: {
                    bot_id: '7444619342701953031',
                },
                componentProps: {
                    title: 'Topder',
                },
            });
        };
    
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    
    
    useEffect(() => {
        if (!!localStorage.getItem('token')) {
            getInfo()
        }
    }, []);

    const getInfo = async () => {
        try {
            const user = jwtDecode(localStorage.getItem('token'))
            const res = await UserService.getCurrentUser(user?.uid)
            dispatch(setUserInformation(res))
            if (location.pathname.includes('transaction/vnpay') || location.pathname.includes('vietqr')) {
                return
            } else {
                if (res?.role === "Customer") {
                    nav(location.pathname);
                } else if (res?.role === "Restaurant") {
                    // nav("/restaurant/dashboard");
                    location.pathname === '/' ? nav("/restaurant/dashboard") : nav(location.pathname);
                } else if(res?.role === "Admin"){
                    // nav("/admin/dashboard");
                    location.pathname === '/' ? nav("/admin/dashboard") : nav(location.pathname);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const routes = useRoutes(router)
    
    
    return (
        <div>
            {routes}
        </div>
    );
}

export default App;
