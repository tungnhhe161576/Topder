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
}

export default AdminService
