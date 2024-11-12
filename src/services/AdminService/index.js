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
}

export default AdminService
