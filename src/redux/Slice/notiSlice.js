import { createSlice } from '@reduxjs/toolkit'

export const notiSlice = createSlice({
    name: 'noti',
    initialState: {
        value: []
    },
    reducers: {
        setAllNoti: (state, action) => {
            state.value = action.payload;
        },
        addNoti: (state, action) => {
            state.value.push(action.payload);
        },
    }
})


export const allNoti = (state) => state.noti.value;
export const { setAllNoti, addNoti } = notiSlice.actions

export default notiSlice.reducer