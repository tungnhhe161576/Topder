import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/Slice/userSlice'
import navReducer from '../redux/Slice/navSlice'
import accessTokenReducer from '../redux/Slice/accessTokenSlice'
import notiReducer from '../redux/Slice/notiSlice'

export default configureStore ({
    reducer: {
        user: userReducer, 
        navigation: navReducer,
        acccesToken: accessTokenReducer,
        noti: notiReducer,
    }
})