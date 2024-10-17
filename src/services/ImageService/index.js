import http from '../index'

import {
    apiUploadImage,
} from './urls'

const uploadImage = body => http.post(apiUploadImage, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})

const UserService = {
    uploadImage,
}

export default UserService
