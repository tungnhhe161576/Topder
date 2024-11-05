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
	apiWithdraw,
	apiLoginGG,
	apiCheckPaymentOrder,
	apiCancelOrder,
	apiGetRestaurantDashboard,
	apiChangeMenus,
} from "./urls";

const categoryResApi = (body) => http.get(apiGetListRestaurants, body);
const loginApi = (body) => http.post(apiLogin, body);
const updateProfile = (body) =>
	http.put(apiUpdateProfile, body, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
const getWishLish = (userId) =>
	http.get(`${apiGetListWishList}/${userId}?pageSize=1000`);
const createWishList = (body) => http.post(apiAddWishList, body);
const deleteWishlist = (customerId, wishlistId) =>
	http.delete(`${apiDeleteWishList}/${customerId}/${wishlistId}`);
const getCurrentUser = (uid) => http.get(`${apigetCurrentUser}/${uid}`);
const getFeedbacks = (customerId) =>
	http.get(`${apiGetFeedback}?pageSize=10000&customerId=${customerId}`);
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

const getMenu = (restaurantId) => http.get(`${apiGetMenu}/${restaurantId}`);
const getTable = (restaurantId, timeReservation, dateReservation) =>
	http.get(
		`${apiGetTable}?restaurantId=${restaurantId}&timeReservation=${timeReservation}&dateReservation=${dateReservation}`
	);
const calTotalOrder = (body) => http.post(apiCalTotalOrder, body);
const getAllDiscount = (restaurantId, customerId, totalPrice) =>
	http.get(
		`${apiGetAllDiscount}/${restaurantId}/${customerId}/${totalPrice}`
	);
const createOrder = (body) => http.post(apiCreateOrder, body);
const getOrderHistory = (customerId) =>
	http.get(`${apiGetOrderHistory}/${customerId}?pageSize=10000`);
const getOrderDetail = (customerId, orderId) =>
	http.get(`${apiViewOrderDetail}/${customerId}/${orderId}`);
const paidOrder = (orderId, userId, paymentGateway) =>
	http.post(
		`${apiPaidOrder}?orderId=${orderId}&userId=${userId}&paymentGateway=${paymentGateway}`
	);
const getWalletInfo = (userId) => http.get(`${apiGetWalletInfo}/${userId}`);
const addOTP = (body) => http.post(apiAddOTP, body);
const createOrUpdateBank = (body) => http.put(apiCreateOrUpdateBank, body);
const deposit = (body) => http.post(apiDeposit, body);
const checkRecharge = ({ transactionId, status }) =>
	http.put(
		`${apiCheckRecharge}?transactionId=${transactionId}&status=${status}`
	);
const getTransactionhistory = (customerId) =>
	http.get(`${apiGetTransactionHistory}/${customerId}`);
const withdraw = (body) => http.post(apiWithdraw, body);
const checkPaymentOrder = (orderID, status) =>
	http.get(`${apiCheckPaymentOrder}/${orderID}?status=${status}`);
const loginGG = (body) => http.post(apiLoginGG, body);

const cancelOrder = (body) => http.put(apiCancelOrder, body);
const getRestaurantDashboard = (restaurantId) =>
	http.get(`${apiGetRestaurantDashboard}/${restaurantId}`);
const changeMenus = (body) => http.put(apiChangeMenus, body);
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
	withdraw,
	loginGG,
	checkPaymentOrder,
	cancelOrder,
	getRestaurantDashboard,
	changeMenus,
};

export default UserService;
