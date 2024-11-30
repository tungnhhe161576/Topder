import QueryString from 'qs';
import http from '../index'

import {
    apiGetAllBlog,
    apiGetCategoryBLog,
    apiDeleteBlog,
    apiUpdateBlog,
    apiCreateBlog,
    apiGetAllUser,
    apiDeleteBlogCategory,
    apiCreateBlogCategory,
    apiUpdateBlogCategory,
    apiGetAllContact,
    apiDeleteContact,
    apiGetDataDashboard,
    apiBanAccount,
    apiGetAllTransaction,
    apiChangeStatusWithdraw,
    apiGetAddAdvertisement,
    apiCretaeAdvertisementPrice,
    apiUpdateAdvertisementPrice,
    apiDeleteAdvertisementPrice,
    apiGetAllBookingAds,
    apiUpdateBookingAds,
    apiActiveBlog,
    apiGetAllOrder,
    apiGetListReport,
    apiCreateCategoryRestaurant,
    apiUpdateCategoryRestaurant,
    apiGetPolicySystem,
    apiDeletePolicy,
    apiCreatePolicy,
    apiUpdatePolicy,
    apiHandleReport,
    apiHandleOrderReport,
    apiDeleteCategory,
} from './urls'



const getAllBlog = (body) => {
    const params = QueryString.stringify(body);
	return http.get(`${apiGetAllBlog}?${params}`);
}
const getCategoryBLog = (body) => {
    const params = QueryString.stringify(body);
	return http.get(`${apiGetCategoryBLog}?${params}`);
}
const deleteBlog = (blogId) => http.delete(`${apiDeleteBlog}/${blogId}`)
const updateBlog = (body) => http.put(apiUpdateBlog, body)
const createBlog = (body) => http.post(apiCreateBlog, body)
const getAllUser = () => http.get(apiGetAllUser)
const deleteBlogCategory = (id) => http.delete(`${apiDeleteBlogCategory}/${id}`)
const createBlogCategory = (body) => http.post(apiCreateBlogCategory, body)
const updateBlogCategory = (body) => http.put(apiUpdateBlogCategory, body)
const getAllContact = () => http.get(`${apiGetAllContact}?pageNumber=1&pageSize=1000`)
const deleteContact = (contactId ) => http.delete(`${apiDeleteContact}/${contactId}?id=0`)
const getDataDashboard = () => http.get(apiGetDataDashboard)
const banAccount = (userId, status) => http.get(`${apiBanAccount}/${userId}?status=${status}`)
const getAllTransaction = () => http.get(apiGetAllTransaction)
const changeStatusWithdraw = (transactionId, status) => http.put(`${apiChangeStatusWithdraw}/${transactionId}?status=${status}`)
const getAddAdvertisement = () => http.get(apiGetAddAdvertisement)
const cretaeAdvertisementPrice = (body) => http.post(apiCretaeAdvertisementPrice, body)
const updateAdvertisementPrice = (body) => http.put(apiUpdateAdvertisementPrice, body)
const deleteAdvertisementPrice = (id) => http.delete(`${apiDeleteAdvertisementPrice}?id=${id}`)
const getAllBookingAds = () => http.get(apiGetAllBookingAds)
const updateBookingAds = (bookingId, status) => http.put(`${apiUpdateBookingAds}/${bookingId}?status=${status}`)
const activeBlog = (blogId , status) => http.put(`${apiActiveBlog}/${blogId}?status=${status}`)
const getAllOrder = () => http.get(apiGetAllOrder)
const getListReport = () => http.get(`${apiGetListReport}?pageNumber=1&pageSize=1000`)
const createCategoryRestaurant = (body) => http.post(apiCreateCategoryRestaurant, body)
const updateCategoryRestaurant = (body) => http.put(apiUpdateCategoryRestaurant, body)
const getPolicySystem = () => http.get(apiGetPolicySystem)
const deletePolicy = (id) => http.delete(`${apiDeletePolicy}/${id}`)
const createPolicy = (body) => http.post(apiCreatePolicy, body)
const updatePolicy = (body) => http.put(apiUpdatePolicy, body)
const handleReport = (body) => http.put(apiHandleReport, body)
const handleOrderReport = (id) => http.put(`${apiHandleOrderReport}/${id}`)
const deleteCategory = (id) => http.delete(`${apiDeleteCategory}/${id}`)



const AdminService = {
    getAllBlog,
    getCategoryBLog,
    deleteBlog,
    updateBlog,
    createBlog,
    getAllUser,
    deleteBlogCategory,
    createBlogCategory,
    updateBlogCategory,
    getAllContact,
    deleteContact,
    getDataDashboard,
    banAccount,
    getAllTransaction,
    changeStatusWithdraw,
    getAddAdvertisement,
    cretaeAdvertisementPrice,
    updateAdvertisementPrice,
    deleteAdvertisementPrice,
    getAllBookingAds,
    updateBookingAds,
    activeBlog,
    getAllOrder,
    getListReport,
    createCategoryRestaurant,
    updateCategoryRestaurant,
    getPolicySystem,
    deletePolicy,
    createPolicy,
    updatePolicy,
    handleReport,
    handleOrderReport,
    deleteCategory,
}


export default AdminService
