// miniprogram/pages/user/personal/getVipCard/getVipCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userOpenid:"",
    storeCard:{}
  },

  // 确认领取会员卡
  getCard(){
    const that = this;
    console.log(this.data)
    wx.request({
      url: app.globalData.url+'usercard/',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: that.data,
      success: function (res) {
        console.log(res.data)
        wx.showModal({
          title: '提示',
          content: '领取成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 2
              })
            } 
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // 获取userOpenid
    this.setData({
      userOpenid:app.globalData.user.openid
    })
    // 获取商家会员卡的信息
    wx.request({
      url: app.globalData.url + 'storecard/cardByStoreCardID/' + options.storeCardId,
      method: 'GET',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
      },
      success: function (res) {
        console.log(res)
        that.setData({
          storeCard: res.data
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