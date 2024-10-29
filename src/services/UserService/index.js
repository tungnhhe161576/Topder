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
	apiGetOrderHistory,
	apiViewOrderDetail,
	apiPaidOrder,
	apiGetWalletInfo,
	apiAddOTP,
	apiCreateOrUpdateBank,
	apiRegisterCustomer,
	apiUpdateResInfor,
	apiCheckEmail,
	apiDeposit,
	apiCheckRecharge,
	apiGetTransactionHistory,
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
const registerCustomer = (body) =>
	http.post(apiRegisterCustomer, body, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
const updateDescription = (body) => http.put(apiUpdateDesRestaurant, body);
const updateRestaurantInfor = (body) =>
	http.put(apiUpdateResInfor, body, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
const forgotPassword = (email) =>
	http.post(apiForgotPassword, `"${email}"`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
const checkExisEmail = (email) => http.get(`${apiCheckEmail}?email=${email}`);
const verifyOTP = (body) => http.post(apiVerifyOTP, body);
const resetPassword = (body) => http.post(apiResetPassword, body);
const changePassword = (body) => http.post(apiChangePassword, body);

const getMenu = (restaurantId) => http.get(`${apiGetMenu}/${restaurantId}`)
const getTable = (restaurantId, timeReservation, dateReservation) => http.get(`${apiGetTable}?restaurantId=${restaurantId}&timeReservation=${timeReservation}&dateReservation=${dateReservation}`)
const calTotalOrder = (body) => http.post(apiCalTotalOrder, body)
const getAllDiscount = (restaurantId, customerId, totalPrice) => http.get(`${apiGetAllDiscount}/${restaurantId}/${customerId}/${totalPrice}`)
const createOrder = (body) => http.post (apiCreateOrder, body)
const getOrderHistory = (customerId) => http.get(`${apiGetOrderHistory}/${customerId}`)
const getOrderDetail = (customerId, orderId) => http.get(`${apiViewOrderDetail}/${customerId}/${orderId}`)
const paidOrder = body => http.post(apiPaidOrder, body)
const getWalletInfo = userId => http.get(`${apiGetWalletInfo}/${userId}`)
const addOTP = (body) => http.post(apiAddOTP, body)
const createOrUpdateBank = (body) => http.put(apiCreateOrUpdateBank, body)
const deposit = body => http.post(apiDeposit, body)
const checkRecharge = ({transactionId, status}) => http.put(`${apiCheckRecharge}?transactionId=${transactionId}&status=${status}`)
const getTransactionhistory = (customerId) => http.get(`${apiGetTransactionHistory}/${customerId}`)

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
	getOrderHistory,
	getOrderDetail,
	paidOrder,
	getWalletInfo,
	addOTP,
	createOrUpdateBank,
	registerCustomer,
	updateRestaurantInfor,
	checkExisEmail,
	deposit,
	checkRecharge,
	getTransactionhistory,
};

export default UserService;
