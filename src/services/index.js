import axios from 'axios'

const parseBody = (response) => {
  const resData = response.data
  return resData
}

const instance = axios.create()

instance.interceptors.request.use(
  config => {
    config.baseURL = process.env.REACT_APP_ROOT_API
    return config
  },
  error => Promise.reject(error.message)
)

instance.interceptors.response.use(
  response => parseBody(response),
  error => Promise.reject(error.message)
)

export default instance