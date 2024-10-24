import http from "../index";

import {
	apiLogin,
	apiUpdateProfile,
	apiGetListWishList,
	apiAddWishList,
	apigetCurrentUser,
	apiGetFeedback,
	apiCreateFeedback,
	apiGetListRestaurants,
	apiRegisterRestaurant,
	apiDeleteFeedback,
	apiDeleteWishList,
	apiUpdateDesRestaurant,
	apiForgotPassword,
	apiVerifyOTP,
	apiResetPassword,
	apiChangePassword,
	apiGetMenu,
	apiGetTable,
	apiCalTotalOrder,
	apiGetAllDiscount,
	apiCreateOrder,
} from "./urls";
const categoryResApi = (body) => http.get(apiGetListRestaurants, body);
const loginApi = (body) => http.post(apiLogin, body);
const updateProfile = (body) =>
	http.put(apiUpdateProfile, body, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
const getWishLish = (userId) => http.get(`${apiGetListWishList}/${userId}`);
const createWishList = (body) => http.post(apiAddWishList, body);
const deleteWishlist = (customerId, wishlistId) =>
	http.delete(`${apiDeleteWishList}/${customerId}/${wishlistId}`);
const getCurrentUser = (uid) => http.get(`${apigetCurrentUser}/${uid}`);
const getFeedbacks = (customerId) =>
	http.get(`${apiGetFeedback}?customerId=${customerId}`);
const createFeedback = (body) => http.post(apiCreateFeedback, body);
const deleteFeedback = (feedbackId) =>
	http.delete(`${apiDeleteFeedback}/${feedbackId}`);
const registerRestaurant = (body) =>
	http.post(apiRegisterRestaurant, body, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
const updateDescription = (body) => http.put(apiUpdateDesRestaurant, body);
const forgotPassword = (email) =>
	http.post(apiForgotPassword, `"${email}"`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
const verifyOTP = (body) => http.post(apiVerifyOTP, body);
const resetPassword = (body) => http.post(apiResetPassword, body);
const changePassword = (body) => http.post(apiChangePassword, body);

const getMenu = (restaurantId) => http.get(`${apiGetMenu}/${restaurantId}`)
const getTable = (restaurantId) => http.get(`${apiGetTable}/${restaurantId}`)
const calTotalOrder = (body) => http.post(apiCalTotalOrder, body)
const getAllDiscount = (restaurantId, customerId, totalPrice) => http.get(`${apiGetAllDiscount}/${restaurantId}/${customerId}/${totalPrice}`)
const createOrder = (body) => http.post (apiCreateOrder, body)

const UserService = {
	loginApi,
	updateProfile,
	getWishLish,
	createWishList,
	deleteFeedback,
	getCurrentUser,
	getFeedbacks,
	createFeedback,
	categoryResApi,
	registerRestaurant,
	deleteWishlist,
	updateDescription,
	forgotPassword,
	verifyOTP,
	resetPassword,
	changePassword,
	getMenu,
	getTable,
	calTotalOrder,
	getAllDiscount,
	createOrder,
};

export default UserService;
