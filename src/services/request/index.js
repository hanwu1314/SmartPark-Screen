import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
class HWRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(
      (config) => {
        const token = getToken()
        if (token) {
          config.headers.Authorization = token
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        if (res.data.code === 50000) {
          Message({
            type: 'warning',
            message: res.data.msg
          })
          return
        }
        return res
      },
      (err) => {
        Message({
          type: 'warning',
          message: err.response.data.msg
        })
        return err
      }
    )
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'get' })
  }

  post(config) {
    return this.request({ ...config, method: 'post' })
  }
  put(config) {
    return this.request({ ...config, method: 'put' })
  }
  delete(config) {
    return this.request({ ...config, method: 'delete' })
  }
}

export default new HWRequest(BASE_URL, TIMEOUT)
