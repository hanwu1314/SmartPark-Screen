import hwRequest from '../request'

/**
 * 获取园区信息
 * @returns
 */
export function getParkInfoAPI() {
  return hwRequest.get({
    url: '/park/statistics/info'
  })
}
