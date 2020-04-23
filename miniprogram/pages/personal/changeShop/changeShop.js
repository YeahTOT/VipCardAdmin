// pages/personal/changeShop/changeShop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:{
      shopName:"",//商家name 默认为用户微信名称
      shopLogo:"",//商家logo 默认为用户头像
      shopAddress:"",
      shopPhone:"",
      shopNode:"",
      shopType: "" // 商家类型
    },
    shopTypePicker: [], // 商家类型列表
    shopTypeIndex: "", // 商家类型的下标
    
  },
  // model窗口
  showModal(e) {
    this.setData({
      modelShopType: true
    })
  },
  hideModal(e) {
    this.setData({
      modelShopType: false,
      shopType: ""
    })
  },
  addShopType(e) {
    this.setData({
      modelShopType: false,
    })
  },
  // 商家类型
  shopTypePickerChange(e) {
    this.setData({
      shopTypeIndex: e.detail.value,
      shop:{
        shopType: this.data.shopTypePicker[e.detail.value]
      }
    })
    // 如果选择自定义，则弹出输入框
    if(this.data.shopType == "自定义"){
      this.setData({
        modelShopType: true
      })
    }
  },
  // 输入商家名称
  inputShopName(e) {
    this.setData({
      shop:{
         shopName: e.detail.value
      }
    })
  },
  // 输入自定义商家类型
  inputShopType(e){
    this.setData({
      shop:{
        shopType: e.detail.value
      }
    })
  },
  // 输入店铺电话
  inputShopPhone(e){
    this.setData({
      shop:{
        shopPhone: e.detail.value
      }
     
    })
  },
  // 选择图片
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          shop:{
            shopLogo: res.tempFilePaths
          }
        })
      }
    });
  },
  //获取位置
  getLocation(e) {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res.address)
        console.log(res.latitude)
        console.log(res.longitude)
        console.log(res.name)
        var location = res.address
        that.setData({
          shop:{
            shopLocation: location
          }  
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.shop)
    if (app.globalData.shop) {
      this.setData({
        shop:{
          shopName: app.globalData.shop.shopName,
          shopLogo: app.globalData.shop.shopLogo
        }
      })
    }
    // 初始数据加载
    initData(this);
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
function initData(that) {
  that.setData({
    shopTypePicker: ["饮食", "服装", "自定义"]
  })
}