import http from '../index'

import {
    apiGetDataInHomePage
} from './urls'

const apiHomePageData = body => http.get(apiGetDataInHomePage, body)

const GuestService = {
    apiHomePageData
}

export default GuestService
