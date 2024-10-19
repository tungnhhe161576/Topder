import http from "../index";

import {
	apiLogin,
	apiUpdateProfile,
	apiGetListWishList,
	apiAddWishList,
    apigetCurrentUser,
    apiGetFeedback,
	apiCreateFeedback,
} from "./urls";

const loginApi = (body) => http.post(apiLogin, body);
const updateProfile = (body) =>
	http.put(apiUpdateProfile, body, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
const getWishLish = (userId) => http.get(`${apiGetListWishList}/${userId}`);
const createWishList = (body) => http.post(apiAddWishList, body);
const getCurrentUser = uid => http.get(`${apigetCurrentUser}/${uid}`)
const getFeedbacks = customerId => http.get(`${apiGetFeedback}?customerId=${customerId}`)
const createFeedback = body => http.post(apiCreateFeedback, body)


const UserService = {
	loginApi,
	updateProfile,
	getWishLish,
	createWishList,
    getCurrentUser,
    getFeedbacks,
	createFeedback,
};

export default UserService;
