import { useRoutes } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUserInformation } from './redux/Slice/userSlice';
import { jwtDecode } from "jwt-decode"
import UserService from './services/UserService';
import { router } from './router';
import { setAllNoti } from './redux/Slice/notiSlice';

function App() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!!localStorage.getItem('token')) {
            getInfo()
        }
    }, []);

    const getInfo = async () => {
        try {
            const user = jwtDecode(localStorage.getItem('token'))
            const res = await UserService.getCurrentUser(user?.uid)
            const notisRes = await UserService.getAllNoti(user?.uid)   
            dispatch(setUserInformation(res))
            dispatch(setAllNoti(notisRes.sort((a, b) => b.notificationId - a.notificationId)))
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
