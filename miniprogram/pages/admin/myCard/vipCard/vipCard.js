// pages/myCard/vipCard/vipCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardID: "",
    card: null,
    QRCode: ""
  },

  showQRCode(e) {
    console.log(this.data)
    // 更具storeOpenid获取二维码
    this.setData({
      QRCode: app.globalData.url + 'storecard/QRCode/' + this.data.card.storeCardId
    })
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 保存图片到本地
  downImg() {
    const that = this;
     // 保存海报
    wx.showLoading({
      title: '保存中...'
    })
    wx.downloadFile({
      url: that.data.QRCode,
      success: function (res) {
        console.log(res.tempFilePath)
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '您的推广海报已存入手机相册，赶快分享给好友吧',
              showCancel:false,
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success:modalSuccess=>{
                  wx.openSetting({
                    success(settingdata) {
                      console.log("settingdata", settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击图片即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      console.log("failData",failData)
                    },
                    complete(finishData) {
                      console.log("finishData", finishData)
                    }
                  })
                }
              })
            }
          },
          complete(res) {
            wx.hideLoading()
          }
        })
      }
    })
  

    // 关闭窗口
    this.setData({
      modalName: null
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // 通过跳转的路径获取cardID
    var cardID = options.cardID
    console.log(app.globalData.url + 'storecard/' + cardID)
    // 将cardID增加到交易记录的url上
    this.setData({
      ["iconList[1].url"]: "./record/record?cardID=" + cardID
    })
    // 从全局变量中获取id
    const admin = app.globalData.admin
    this.setData({
      admin: admin
    })
    // 通过id获取card信息
    wx.request({
      url: app.globalData.url + 'storecard/cardByStoreCardID/' + cardID,
      method: 'GET',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
      },
      success: function (res) {
        console.log(res)
        that.setData({
          card: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
function datainit(that) {
  that.setData({
    card: {
      "cardID": "032702",
      "logo": "https://7669-vipcard-3y6o1-1301438009.tcb.qcloud.la/image/google.png?sign=d24081f06d9b12f718953b0291f95c79&t=1585280719",
      "shopName": "季季红",
      "cardName": "季季红会员卡",
      "cardTypeList": ["储值卡", "积分卡"],
      "shopAddress": "江西省南昌市南昌航空大学669号旁边的乐世界二楼",
      "cardTimeStart": "2020-3-20",
      "cardTimeEnd": "2020-6-20",
      "shopPhone": "1008611",
      "cardMoney": "200",
      "cardScore": "60",
      "cardStatus": "未过期",
      "cardNode": "这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡",
    },
  })
}