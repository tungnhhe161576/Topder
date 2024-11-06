import QueryString from "qs";
import http from "../index";

import {
	apiGetDataInHomePage,
	apiGetDataRestaurantDetail,
	apiGetAllRestaurants,
	apiGetAllRestaurantCategory,
	apiGetAllFeedback,
	apiGetRelatedRestaurants,
	apiGetAllBlog,
	apiGetAllBlogCategory,
	apiGetBlogDetail,
	apiGetRestaurantFee,
	apiCreateContact,
	apiVerifyAccountRequest,
	apiGetAllCategory,
} from "./urls";

const apiHomePageData = (body) => http.get(apiGetDataInHomePage, body);
const apiRestaurantDetail = (restaurantId) =>
	http.get(`${apiGetDataRestaurantDetail}/${restaurantId}`);

// const getAllRestaurants = (params) => {
//     const filteredParams = Object.fromEntries(
//         Object.entries(params).filter(([key, value]) => value !== undefined && value !== null)
//     );
//     const query = new URLSearchParams(filteredParams).toString();
//     return http.get(`${apiGetAllRestaurants}?${query}`);
// };

const getAllRestaurants = (body) => {
	const params = QueryString.stringify(body);
	return http.get(`${apiGetAllRestaurants}?${params}`);
};

const getAllRestaurantCategory = (body) =>
	http.get(apiGetAllRestaurantCategory, body);
const getAllFeedBack = (restaurantId) =>
	http.get(`${apiGetAllFeedback}/${restaurantId}?pageSize=10000`);
const getRelatedRestaurant = (restaurantId, categoryRestaurantId) =>
	http.get(
		`${apiGetRelatedRestaurants}/${restaurantId}/${categoryRestaurantId}`
	);
const getAllBlog = (body) => {
	const params = QueryString.stringify(body);
	return http.get(`${apiGetAllBlog}?${params}`);
};
const getBlogCategory = () => http.get(apiGetAllBlogCategory);
const getBlogDetail = (blogId) => http.get(`${apiGetBlogDetail}/${blogId}`);
const getRestaurantFee = (restaurantId) =>
	http.get(`${apiGetRestaurantFee}/${restaurantId}`);
const createContact = (body) => http.post(apiCreateContact, body);
const verifyAccount = (uId) => http.get(`${apiVerifyAccountRequest}/${uId}`);
const getAllCategory = () => http.get(apiGetAllCategory);

const GuestService = {
	apiHomePageData,
	apiRestaurantDetail,
	getAllRestaurants,
	getAllRestaurantCategory,
	getAllFeedBack,
	getRelatedRestaurant,
	getAllBlog,
	getBlogCategory,
	getBlogDetail,
	getRestaurantFee,
	createContact,
	verifyAccount,
	getAllCategory,
};

export default GuestService;
