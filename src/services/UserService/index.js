import http from "../index";

import {
	apiLogin,
	apiUpdateProfile,
	apiGetListWishList,
	apiAddWishList,
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
const UserService = {
	loginApi,
	updateProfile,
	getWishLish,
	createWishList,
};

export default UserService;
