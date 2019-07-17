/* ========================================================
                        小程序配置文件
======================================================== */
// 域名
// var host = 'https://love.ufutx.com/api',
// var host = 'http://job.hankin.ufutx.cn/api'
var host = 'https://jy.xofo9600.com/api/'
export const service = {
  // 登录接口
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
