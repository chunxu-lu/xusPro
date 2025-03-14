import axios from 'axios'
import { showMessage } from './status' // 引入状态码文件
import { ElMessage } from 'element-plus' // 引入el 提示框，这个项目里用什么组件库这里引什么
// baseURL: import.meta.env.VITE_API_DOMAIN, // 动态赋值的环境变量
// 创建axios实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 60000, // 设置接口超时时间
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8', // 传参方式json
    withCredentials: true // 跨域携带cookie
  }
})

// http request 拦截器
instance.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      config.headers['Authorization'] = `Bearer ${token}` // 这里自定义配置，这里传的是token
    }
    // 可以在请求发送之前对config进行修改，比如添加token等
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
instance.interceptors.response.use(
  response => {
    const res = response.data // 直接返回响应数据
    if (res.code !== 200) {
      ElMessage.error(res.msg)
      return res.msg || 'Error'
    } else {
      return res
    }
  },
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status) // 传入响应码，匹配响应码对应信息
      ElMessage.error(response.data.msg || '请求失败')
      return response.data
    } else {
      ElMessage.warning('网络连接异常,请稍后再试!')
      return error
    }
  }
)

// 封装 GET POST 请求并导出
export function request<T = any>(url = '', params = {}, type = 'POST', onUploadProgress = null): Promise<T> {
  return new Promise((resolve, reject) => {
    let promise

    if (type.toUpperCase() === 'GET') {
      promise = instance.get(url, { params })
    } else if (type.toUpperCase() === 'POST') {
      const config = {
        onUploadProgress: onUploadProgress
          ? progressEvent => {
              // 计算进度百分比
              if (progressEvent.lengthComputable) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                onUploadProgress(percentCompleted) // 调用传入的回调函数
              }
            }
          : undefined
      }
      promise = instance.post(url, params, config)
    } else {
      promise = Promise.reject(new Error('不支持的请求类型'))
    }

    // 处理返回
    promise
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
