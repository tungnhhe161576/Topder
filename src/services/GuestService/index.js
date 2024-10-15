import http from '../index'

import {
    apiGetDataInHomePage,
    apiGetDataRestaurantDetail,
} from './urls'

const apiHomePageData = body => http.get(apiGetDataInHomePage, body)
const apiRestaurantDetail = restaurantId => http.get(`${apiGetDataRestaurantDetail}/${restaurantId}` )

const GuestService = {
    apiHomePageData,
    apiRestaurantDetail,
}

export default GuestService
