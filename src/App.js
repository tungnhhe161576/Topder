import { Outlet } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUserInformation } from './redux/Slice/userSlice';
import { jwtDecode } from "jwt-decode"

function App() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!!localStorage.getItem('token')) {
            const user = jwtDecode(localStorage.getItem('token'))
            if (!!user) {
                dispatch(setUserInformation(user)); 
            }
        }
    }, [dispatch]);
    
    return (
        <div>
            <Outlet/>
        </div>
    );
}

export default App;
