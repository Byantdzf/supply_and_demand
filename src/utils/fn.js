const getElement_WH = (element) => { // 获取元素位置
  console.log(element)
  return new Promise((resolve, reject) => {
    let query = wx.createSelectorQuery()
    query.select(element).boundingClientRect((rect) => {
      if (typeof rect == 'object') {
        resolve(rect)
      } else {
        reject('TypeError')
      }
    }).exec()
  })
}
const wxPay = (wxconfig) => { // 微信支付
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: wxconfig.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: wxconfig.nonceStr, // 支付签名随机串，不长于 32 位
      package: wxconfig.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: wxconfig.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: wxconfig.paySign, // 支付签名
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject('已取消支付')
      }
    })
  })
}
const callPhone = (phoneNumber) => {
  return new Promise((resolve, reject) => {
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
      success: function () {
        console.log('拨打电话成功!')
        // resolve(res)
      },
      fail: function () {
        console.log('拨打电话失败！')
        // reject('拨打电话失败')
      }
    })
  })
}

export {getElement_WH, wxPay, callPhone}
