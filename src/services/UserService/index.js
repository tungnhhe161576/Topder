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
	apiGetAllOrderByRestaurant,
	apiUpdateOrderForConfirm,
	apiCreateTableOrder,
	apiUpdateRestaurantProfile,
	apiGetAllTableLazy,
	apiGetAllTableScheduleList,
	apiCreateScheduleTable,
	apiDeleteScheduleTable,
	apiGetAllImageRestaurant,
	apiUpdatePolicy,
	apiGetAllFeedbackByRestaurant,
	apiGetDiscountByRestaurant,
	apiUpdateActiveDiscount,
	apiDeleteDiscount,
	apiUpdateDiscount,
	apiCreateDiscount,
	apiUpdateScheduleTable,
	apiGetAllRestaurantTable,
	apiUpdateTable,
	apiDeleteTable,
	apiGetAllRoom,
	apiCreateTable,
	apiIsEnabledRoom,
	apiInvisibleRoom,
	apiUpdateRoom,
	apiCreateRoom,
	apiGetAllMenu,
	apiDeleteMenu,
	apiUpdateMenu,
	apiGetAllCategoryMenu,
	apiCreateMenu,
	apiActiveMenu,
	apiDeleteCategoryMenu,
	apiCreateCategoryMenu,
	apiUpdateCategoryMenu,
	apiUploadFileMenu,
	apiSearchDataByMonth,
	apiSearchDataByDay,
	apiGetAllBookingAds,
	apiPaymentBooking,
	apiCheckPaymentBooking,
	apiCretaeAdsBooking,
	apiCancelBookingAds,
	apiCreateTableByExcel,
	apiEnableBooking,
	apiGetAllNoti,
	apiReadNoti,
	apiDeleteNoti,
	apiReadAllNoti,
	apiDeleteAllNoti,
	apiCreateChatBox,
	apiGetChatBox,
	apiGetChatList,
	apiCreateChat,
	apiReport,
	apiCheckExistChatBox,
	apiReadChatBox,
	apiCreateReply,
	apiViewFeedback,
	apiAddMenus,
	apiReturnFee,
	apiCreatePolicy,
	apiGetInActivePolicy,
	apiChoosePolicy,
	apiCreateRoomByExcel,
	apiDeleteChatBox,
	apiDeleteChat,
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
	http.get(`${apiGetFeedback}?customerId=${customerId}`);
const createFeedback = (body) => http.post(apiCreateFeedback, body);
const deleteFeedback = (feedbackId) =>
	http.put(`${apiDeleteFeedback}/${feedbackId}`);
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
const paidOrder = (orderId, userId, paymentGateway, typeOrder) =>
	http.post(
		`${apiPaidOrder}?orderId=${orderId}&userId=${userId}&paymentGateway=${paymentGateway}&typeOrder=${typeOrder}`
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
const loginGG = (accessToken) => http.post(`${apiLoginGG}?accessToken=${accessToken}`);

const cancelOrder = (body) => http.put(apiCancelOrder, body);
const getRestaurantDashboard = (restaurantId) =>
	http.get(`${apiGetRestaurantDashboard}/${restaurantId}`);
const changeMenus = (body) => http.put(apiChangeMenus, body);
const addMenus = (body) => http.put(apiAddMenus, body);
const getAllOrderByRestaurant = (restaurantId) => http.get(`${apiGetAllOrderByRestaurant}/${restaurantId}?pageNumber=1&pageSize=10000`)
const updateOrderForConfirm = (orderId, status) => http.put(`${apiUpdateOrderForConfirm}/${orderId}?status=${status}`)
const createTableOrder = (body) => http.post(apiCreateTableOrder, body)
const updateRestaurantProfile = (body) => http.put(apiUpdateRestaurantProfile, body)
const getAllTableLazy = (restaurantId) => http.get(`${apiGetAllTableLazy}/${restaurantId}`)
const getAllTableScheduleList = (restaurantId) => http.get(`${apiGetAllTableScheduleList}/${restaurantId}`)
const createScheduleTable = (body) => http.post(apiCreateScheduleTable, body)
const deleteScheduleTable = (scheduleId) => http.delete(`${apiDeleteScheduleTable}/${scheduleId}`)
const getAllImageRestaurant = (restaurantId) => http.get(`${apiGetAllImageRestaurant}/${restaurantId}?pageNumber=1&PageSize=10000`)
const updatePolicy = (restaurantId, discountPrice, firstFeePercent, returningFeePercent, cancellationFeePercent) => 
	http.put(`${apiUpdatePolicy}/${restaurantId}?discountPrice=${discountPrice}&firstFeePercent=${firstFeePercent}&returningFeePercent=${returningFeePercent}&cancellationFeePercent=${cancellationFeePercent}`)
const getAllFeedbackByRestaurant = (restaurantId) => http.get(`${apiGetAllFeedbackByRestaurant}/${restaurantId}`)
const getDiscountByRestaurant = (restaurantId) => http.get(`${apiGetDiscountByRestaurant}/${restaurantId}?pageNumber=1&pageSize=10000`)
const updateActiveDiscount = (body) => http.put(apiUpdateActiveDiscount, body)
const deleteDiscount = (restaurantId, discountId) => http.put(`${apiDeleteDiscount}/${restaurantId}/${discountId}`)
const updateDiscount = (body) => http.put(apiUpdateDiscount, body)
const createDiscount = (body) => http.post(apiCreateDiscount, body)
const updateScheduleTable = (body) => http.put(apiUpdateScheduleTable, body)
const getAllRestaurantTable = (restaunrantId) => http.get(`${apiGetAllRestaurantTable}/${restaunrantId}`)
const updateTable = (body) => http.put(apiUpdateTable, body)
const deleteTable = (restaurantId, tableId) => http.put(`${apiDeleteTable}/${restaurantId}/${tableId}`)
const getAllRoom = (restaurantId) => http.get(`${apiGetAllRoom}/${restaurantId}?pageNumber=1&pageSize=1000`)
const createTable = (body) => http.post(apiCreateTable, body)
const isEnabledRoom = (restaurantId, roomId, isEnabledBooking) => http.put(`${apiIsEnabledRoom}/${restaurantId}/${roomId}?isEnabledBooking=${isEnabledBooking}`)
const invisibleRoom = (restaurantId, roomId) => http.put(`${apiInvisibleRoom}/${restaurantId}/${roomId}`)
const updateRoom = (body) => http.put(apiUpdateRoom, body)
const createRoom = (body) => http.post(apiCreateRoom, body)
const getAllMenu = (restaurantId) => http.get(`${apiGetAllMenu}/${restaurantId}?pageNumber=1&pageSize=10000`)
const deleteMenu = (restaurantId, menuId) => http.put(`${apiDeleteMenu}/${restaurantId}/${menuId}`)
const updateMenu = (body) => http.put(apiUpdateMenu, body)
const getAllCategoryMenu = (restaurantId) => http.get(`${apiGetAllCategoryMenu}/${restaurantId}`)
const createMenu = (body) => http.post(apiCreateMenu, body)
const activeMenu = (menuId, status) => http.put(`${apiActiveMenu}/${menuId}?status=${status}`)
const deleteCategoryMenu = (id) => http.put(`${apiDeleteCategoryMenu}/${id}`)
const createCategoryMenu = (body) => http.post(apiCreateCategoryMenu, body)
const updateCategoryMenu = (body) => http.put(apiUpdateCategoryMenu, body)
const uploadFileMenu = (restaurantId, file) => {
	const formData = new FormData();
    formData.append('RestaurantId', restaurantId);
    formData.append('File', file);
	http.post(apiUploadFileMenu, formData);
}
const searchDataByMonth = (restaurantId, searchMonth) => http.get(`${apiSearchDataByMonth}/${restaurantId}?searchMonth=${searchMonth}`)
const searchDataByDay = (restaurantId, searchDay) => http.get(`${apiSearchDataByDay}/${restaurantId}?searchDay=${searchDay}`)
const getAllBookingAds = (restaurantId) => http.get(`${apiGetAllBookingAds}/${restaurantId}`)
const paymentBooking = (bookingId, paymentGateway) => http.post(`${apiPaymentBooking}?bookingId=${bookingId}&paymentGateway=${paymentGateway}`)
const checkPaymentBooking = (bookingId, status) => http.put(`${apiCheckPaymentBooking}/${bookingId}?status=${status}`)
const cretaeAdsBooking = (body) => http.post(apiCretaeAdsBooking, body)
const cancelBookingAds = (bookingId, status) => http.put(`${apiCancelBookingAds}/${bookingId}?status=${status}`)
const createTableByExcel = (restaurantId, file) => {
	const formData = new FormData();
    formData.append('RestaurantId', restaurantId);
    formData.append('File', file);
	http.post(apiCreateTableByExcel, formData);
}
const createRoomByExcel = (restaurantId, file) => {
	const formData = new FormData();
    formData.append('RestaurantId', restaurantId);
    formData.append('File', file);
	http.post(apiCreateRoomByExcel, formData);
}
const enableBooking = (restaurantId, isEnabledBooking) => http.put(`${apiEnableBooking}/${restaurantId}?isEnabledBooking=${isEnabledBooking}`)
const getAllNoti = (userId) => http.get(`${apiGetAllNoti}?pageNumber=1&pageSize=10000&userId=${userId}`)
const readNoti = (notiId) => http.put(`${apiReadNoti}/${notiId}`)
const deleteNoti = (userId, notificationId) => http.delete(`${apiDeleteNoti}/${userId}/${notificationId}`)
const readAllNoti = (userId) => http.put(`${apiReadAllNoti}/${userId}`)
const deleteAllNoti = (userId) => http.delete(`${apiDeleteAllNoti}/${userId}`)
const createChatBox = (body) => http.post(apiCreateChatBox, body)
const getChatBox = (userId) => http.get(`${apiGetChatBox}/${userId}`)
const getChatList = (chatBoxId) => http.get(`${apiGetChatList}/${chatBoxId}`)
const createChat = (body) => http.post(apiCreateChat, body)
const report = (body) => http.post(apiReport, body)
const checkExistChatBox = (customerId, restaunrantId ) => http.get(`${apiCheckExistChatBox}/${customerId}/${restaunrantId}`)
const readChatBox = (uid, chatBoxId) => http.post(`${apiReadChatBox}?uid=${uid}&chatboxId=${chatBoxId}`)
const createReply = (body) => http.post(apiCreateReply, body)
const viewFeedback = (orderId) => http.get(`${apiViewFeedback}/${orderId}`)
const returnFee = (customerId, restaurantId) => http.put(`${apiReturnFee}/?customerId=${customerId}&restaurantId=${restaurantId}`)
const createPolicy = (body) => http.post(apiCreatePolicy, body)
const getInActivePolicy = (restaurantId) => http.get(`${apiGetInActivePolicy}/${restaurantId}`)
const choosePolicy = (id) => http.put(`${apiChoosePolicy}/${id}`)
const deleteChatBox = (id) => http.delete(`${apiDeleteChatBox}/${id}`)
const deleteChat = (id) => http.delete(`${apiDeleteChat}/${id}`)






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
	getAllOrderByRestaurant,
	updateOrderForConfirm,
	createTableOrder,
	updateRestaurantProfile,
	getAllTableLazy,
	getAllTableScheduleList,
	createScheduleTable,
	deleteScheduleTable,
	getAllImageRestaurant,
	updatePolicy,
	getAllFeedbackByRestaurant,
	getDiscountByRestaurant,
	updateActiveDiscount,
	deleteDiscount,
	updateDiscount,
	createDiscount,
	updateScheduleTable,
	getAllRestaurantTable,
	updateTable,
	deleteTable,
	getAllRoom,
	createTable,
	isEnabledRoom,
	invisibleRoom,
	updateRoom,
	createRoom,
	getAllMenu,
	deleteMenu,
	updateMenu,
	getAllCategoryMenu,
	createMenu,
	activeMenu,
	deleteCategoryMenu,
	createCategoryMenu,
	updateCategoryMenu,
	uploadFileMenu,
	searchDataByMonth,
	searchDataByDay,
	getAllBookingAds,
	paymentBooking,
	checkPaymentBooking,
	cretaeAdsBooking,
	cancelBookingAds,
	createTableByExcel,
	enableBooking,
	getAllNoti,
	readNoti,
	deleteNoti,
	readAllNoti,
	deleteAllNoti,
	createChatBox,
	getChatBox,
	getChatList,
	createChat,
	report,
	checkExistChatBox,
	readChatBox,
	createReply,
	viewFeedback,
	addMenus,
	returnFee,
	createPolicy,
	getInActivePolicy,
	choosePolicy,
	createRoomByExcel,
	deleteChatBox,
	deleteChat,
};


export default UserService;
