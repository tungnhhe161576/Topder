import http from '../index'

import {
    apiLogin,
} from './urls'

const loginApi = body => http.post(apiLogin, body) 

const UserService = {
    loginApi,
}

export default UserService
