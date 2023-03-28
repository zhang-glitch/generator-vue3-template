import axios, { AxiosInstance } from 'axios'
import utils from '@utils/index'

const instanceAxios: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: { withCredentials: true }
})

// 请求拦截器,鉴权判断
instanceAxios.interceptors.request.use((config) => {
  if (!(config.url && config.url.includes('login'))) {
    config.headers['Authorization'] = utils.getItem('token')
  }

  return config
})

instanceAxios.interceptors.response.use((response) => {
  const data = response.data
  // 处理数据并返回
  if (data.code == 0) {
    // console.log('错误')
    // 做一些消息提示处理
  }
  return data
})

export default function request(
  method: 'get' | 'post',
  url: string,
  data: any
) {
  // 处理请求的url和数据
  data = method === 'get' ? { params: data } : data
  // 发送请求
  return new Promise((resolve, reject) => {
    instanceAxios[method](url, data) // get {params: {}} , post data: {}
      .then(
        (response) => {
          resolve(response)
        },
        (error) => {
          // 消息提示
          alert(error)
          reject(error)
        }
      )
      .catch((error) => {
        // 消息提示
        alert(error)
        reject(error)
      })
  }).catch((error) => {
    console.log(error)
  })
}
