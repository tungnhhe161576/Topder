import QueryString from 'qs';
import http from '../index'

import {
    apiGetAllBlog,
    apiGetCategoryBLog,
    apiDeleteBlog,
    apiUpdateBlog,
    apiCreateBlog,
    apiGetAllUser,
} from './urls'



const getAllBlog = (body) => {
    const params = QueryString.stringify(body);
	return http.get(`${apiGetAllBlog}?${params}`);
}
const getCategoryBLog = () => http.get(`${apiGetCategoryBLog}?pageNumber=1&pageSize=1000`)
const deleteBlog = (blogId) => http.delete(`${apiDeleteBlog}/${blogId}`)
const updateBlog = (body) => http.put(apiUpdateBlog, body)
const createBlog = (body) => http.post(apiCreateBlog, body)
const getAllUser = () => http.get(apiGetAllUser)



const AdminService = {
    getAllBlog,
    getCategoryBLog,
    deleteBlog,
    updateBlog,
    createBlog,
    getAllUser,
}

export default AdminService
