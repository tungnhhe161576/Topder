import http from "../index";

import { apiUploadImage, apiGetImage, apiUpdateImage, apiDeleteImage, apiCreateImages } from "./urls";

const uploadImage = (body) =>
	http.post(apiUploadImage, body, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
const getImgRestaurant = (restaurantId) =>
	http.get(`${apiGetImage}/${restaurantId}`);
const updatedImageRes = (imageId, restaurantId, file) => 
http.put(`${apiUpdateImage}`, file, {
	headers: {
		"Content-Type": "multipart/form-data",
	},
	params: {
		imageId,
		restaurantId,
	},
});
	
const deleteImage = (restaurantId, imageId) => http.delete(`${apiDeleteImage}/${restaurantId}/${imageId}`)
const createImages = (restaurantId, files) => 
http.post(`${apiCreateImages}`, files, {
	headers: {
		"Content-Type": "multipart/form-data",
	},
	params: {
		restaurantId,
	},
});

const UserService = {
	uploadImage,
	getImgRestaurant,
	updatedImageRes,
	deleteImage,
	createImages,
};

export default UserService;
