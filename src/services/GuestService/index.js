import QueryString from 'qs'
import http from '../index'

import {
    apiGetDataInHomePage,
    apiGetDataRestaurantDetail,
    apiGetAllRestaurants,
    apiGetAllRestaurantCategory,
    apiGetAllFeedback,
	apiGetRelatedRestaurants,
} from './urls'

const apiHomePageData = body => http.get(apiGetDataInHomePage, body)
const apiRestaurantDetail = restaurantId => http.get(`${apiGetDataRestaurantDetail}/${restaurantId}` )

// const getAllRestaurants = (params) => {
//     const filteredParams = Object.fromEntries(
//         Object.entries(params).filter(([key, value]) => value !== undefined && value !== null)
//     );
//     const query = new URLSearchParams(filteredParams).toString();
//     return http.get(`${apiGetAllRestaurants}?${query}`);
// };

const getAllRestaurants = body => {
    const params = QueryString.stringify(body)
    return http.get(`${apiGetAllRestaurants}?${params}`)
}

const getAllRestaurantCategory = body => http.get(apiGetAllRestaurantCategory, body)

const getAllFeedBack = restaurantId => http.get(`${apiGetAllFeedback}/${restaurantId}` )
const getRelatedRestaurant = (restaurantId, categoryRestaurantId) => http.get(`${apiGetRelatedRestaurants}/${restaurantId}/${categoryRestaurantId}`)

const GuestService = {
    apiHomePageData,
    apiRestaurantDetail,
    getAllRestaurants,
    getAllRestaurantCategory,
    getAllFeedBack,
    getRelatedRestaurant,
}

export default GuestService
