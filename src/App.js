import { Outlet } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUserInformation } from './redux/Slice/userSlice';
import { jwtDecode } from "jwt-decode"
import UserService from './services/UserService';

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
            dispatch(setUserInformation(res))
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div>
            <Outlet/>
        </div>
    );
}

export default App;
