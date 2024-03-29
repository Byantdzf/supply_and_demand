/* ========================================================
                        小程序配置文件
======================================================== */
// 域名
// var host = 'https://love.ufutx.com/api',
// var host = 'http://demand.hankin.ufutx.cn/api'
var host = 'https://demand.hankin.top/api'
export const service = {
  // 登录接口s
  login: `${host}/wechat/login`,
  // 手机号
  mobile: `${host}/wechat/mobile`,
  // 注册
  register: `${host}/wechat/register`,
  // 主域
  host: `${host}`
}

export default {
  service
}
