// pages/personal/personal.js
const util = require('../../../utils/util.js')
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     //属性
     vipCardList:[],//会员卡列表 对象数组
     admin:{
       openid:"",
       adminName: "",
       adminUrl: ""
     },
     shop:{
       shopName:"",//商家name 默认为用户微信名称
       shopLogo:"",//商家logo 默认为用户头像
       shopAddress:"",
       shopPhone:"",
       shopNode:""
     },
    //页面组件显示状态
    isShowVip:false,//是否展开会员卡列表 true展开
    cardStatus:"all",// 显示的什么类型的会员卡 0 已过期 1 未过期 3 全部
    cardStatus1:"textLine",// 全部样式
    cardStatus2:"",// 未过期的样式
    cardStatus3:"",// 已过期的样式
  },


 
  //展示会员卡列表
  showVip:function(){
    if(this.data.isShowVip){
      this.setData({
        isShowVip:false
      })
    }
    else if(!this.data.isShowVip){
      this.setData({
        isShowVip:true
      })
    }
  },

  //扫描二维码
  scancode: function () {
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        console.log(res);
        wx.showToast({
          title: '失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 授权登录事件
  getuserinfo(e) {
    const that = this;
    const adminName = e.detail.userInfo.nickName // 管理员姓名
    const adminUrl = e.detail.userInfo.avatarUrl // 头像路径
    wx.cloud.callFunction({
      name: 'getopenid',
      complete: res => {
        //获取用户的openid
        const openid = res.result.openid
        this.setData({
          admin: {
            openid: openid,
            adminName: adminName,
            adminUrl: adminUrl
          },
        })
        // 将个人信息放到本地缓存中
        wx.setStorageSync("admin", this.data.admin)
        // 更具openid查询到store的信息，保存到本地缓存中
        console.log(app.globalData.url+'store/' + openid)
        wx.request({
          url: app.globalData.url+'store/' + openid,
          method: 'GET',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              store:res.data
            })
            // 讲store存到本地缓存中中
            wx.setStorageSync("store", that.data.store)
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })


  },

  // 查看 全部 会员卡信息点击事件
  ClickCardStatus1:function(){
    this.setData({
      cardStatus:"all",//全部显示
      cardStatus1:"textLine", // 设置下划线样式
      cardStatus2:"", // 设置下划线样式
      cardStatus3:"" // 设置下划线样式
    })
  },
  // 查看 未过期 会员卡信息点击事件
  ClickCardStatus2:function(){
    this.setData({
      cardStatus:"未过期",
      cardStatus1:"", // 设置下划线样式
      cardStatus2:"textLine", // 设置下划线样式
      cardStatus3:"" // 设置下划线样式
    })
  },
  // 查看 已过期 会员卡信息点击事件
  ClickCardStatus3:function(){
    this.setData({
      cardStatus:"已过期",
      cardStatus1:"", // 设置下划线样式
      cardStatus2:"", // 设置下划线样式
      cardStatus3:"textLine" // 设置下划线样式
    })
  },

  //退出登录
  exit() {
    wx.setStorageSync("userInfo", "")
    wx.setStorageSync("openid", "")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // 如果存在商家信息，就可以直接登录
    if (app.globalData.admin) {
      this.setData({
        admin: {
          openid: app.globalData.admin.openid,
          adminName: app.globalData.admin.adminName,
          adminUrl: app.globalData.admin.adminUrl
        },
      })
      // 根据openid查询card信息
      wx.request({
        url:app.globalData.url+'storecard/cardByOpenid/' + app.globalData.admin.openid,
        method: 'GET',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            cardList:res.data
          })
        },
        fail: function (res) {
          dataInit(that)
          console.log(res)
        }
      })
    }
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
    const that = this;
    // 如果存在商家信息，就可以直接登录
    if (app.globalData.admin) {
      this.setData({
        admin: {
          openid: app.globalData.admin.openid,
          adminName: app.globalData.admin.adminName,
          adminUrl: app.globalData.admin.adminUrl
        },
      })
      // 根据openid查询card信息
      wx.request({
        url:app.globalData.url+'storecard/cardByOpenid/' + app.globalData.admin.openid,
        method: 'GET',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            cardList:res.data
          })
        },
        fail: function (res) {
          dataInit(that)
          console.log(res)
        }
      })
    }
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

// 初始化card数据
function dataInit(that) {
  that.setData({
    cardList: [
      {
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
      {
        "cardID": "032703",
        "logo": "https://7669-vipcard-3y6o1-1301438009.tcb.qcloud.la/image/google.png?sign=d24081f06d9b12f718953b0291f95c79&t=1585280719",
        "shopName": "香锅",
        "cardName": "香锅会员卡",
        "cardTypeList": ["储值卡"],
        "shopAddress": "南昌航空大学669号",
        "cardTimeStart": "2020-3-20",
        "cardTimeEnd": "2020-6-20",
        "shopPhone": "1008611",
        "cardMoney": "300",
        "cardStatus": "未过期",
        "cardNode": "这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡"
      },
      {
        "cardID": "032704",
        "logo": "https://7669-vipcard-3y6o1-1301438009.tcb.qcloud.la/image/google.png?sign=d24081f06d9b12f718953b0291f95c79&t=1585280719",
        "shopName": "健身房",
        "cardName": "健身房会员卡",
        "cardTypeList": ["积分卡", "计次卡"],
        "shopAddress": "南昌航空大学669号",
        "cardTimeStart": "2020-3-20",
        "cardTimeEnd": "2020-6-20",
        "shopPhone": "1008611",
        "cardScore": "80",
        "cardTimes": "12",
        "cardStatus": "已过期",
        "cardNode": "这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡"
      },
      {
        "cardID": "032705",
        "logo": "https://7669-vipcard-3y6o1-1301438009.tcb.qcloud.la/image/google.png?sign=d24081f06d9b12f718953b0291f95c79&t=1585280719",
        "shopName": "奶茶店",
        "cardName": "奶茶会员卡",
        "cardTypeList": ["储值卡"],
        "shopAddress": "南昌航空大学669号",
        "cardTimeStart": "2020-3-20",
        "cardTimeEnd": "2020-6-20",
        "shopPhone": "1008611",
        "cardMoney": "35",
        "cardStatus": "已过期",
        "cardNode": "这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡"
      },
      {
        "cardID": "032701",
        "logo": "https://7669-vipcard-3y6o1-1301438009.tcb.qcloud.la/image/google.png?sign=d24081f06d9b12f718953b0291f95c79&t=1585280719",
        "shopName": "理发店",
        "cardName": "老顾客会员卡",
        "cardTypeList": ["积分卡", "计次卡"],
        "shopAddress": "南昌航空大学669号",
        "cardTimeStart": "2020-3-20",
        "cardTimeEnd": "2020-6-20",
        "shopPhone": "1008611",
        "cardScore": "66",
        "cardTimes": 12,
        "cardStatus": "未过期",
        "cardNode": "这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡"
      },
    ],
  })
}