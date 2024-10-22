import http from "../index";

import { apiUploadImage, apiGetImage, apiUpdateImage } from "./urls";

const uploadImage = (body) =>
	http.post(apiUploadImage, body, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
const getImgRestaurant = (restaurantId) =>
	http.get(`${apiGetImage}/${restaurantId}`);
const updatedImageRes = (body) => http.put(apiUpdateImage, body);

const UserService = {
	uploadImage,
	getImgRestaurant,
	updatedImageRes,
};

export default UserService;
