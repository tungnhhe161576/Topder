import { useNavigate, useRoutes } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUserInformation } from './redux/Slice/userSlice';
import { jwtDecode } from "jwt-decode"
import UserService from './services/UserService';
import { router } from './router';

function App() {
    const dispatch = useDispatch();
    const nav = useNavigate()
    
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
            if (res?.role === "Customer") {
				nav("/");
			} else if (res?.role === "Restaurant") {
				nav("/restaurant/dashboard");
			} else {
				nav("/admin/dashboard");
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
