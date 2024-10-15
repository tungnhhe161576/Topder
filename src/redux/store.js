import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/Slice/userSlice'
import navReducer from '../redux/Slice/navSlice'
import accessTokenReducer from '../redux/Slice/accessTokenSlice'

export default configureStore ({
    reducer: {
        user: userReducer, 
        navigation: navReducer,
        acccesToken: accessTokenReducer,
    }
})