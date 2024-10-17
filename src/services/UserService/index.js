import http from '../index'

import {
    apiLogin,
    apiUpdateProfile,
} from './urls'

const loginApi = body => http.post(apiLogin, body) 
const updateProfile = body => http.put(apiUpdateProfile, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})

const UserService = {
    loginApi,
    updateProfile,
}

export default UserService
