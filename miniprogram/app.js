//app.js
App({
  onLaunch: function() {
    // 服务器域名
    this.globalData.url = "http://yeah.gold:8090/vipcard/";
    // this.globalData.url = "http://192.168.1.196:8081/vipcard/";
    // this.globalData.url = "http://localhost:8090/vipcard/";
    wx.cloud.init({
      env:'vipcard-3y6o1',
      traceUser:true
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    // user全局变量
    user: wx.getStorageSync("user"),
    url:wx.getStorageSync("url"),

    // 管理员全局变量
    admin: wx.getStorageSync("admin"),
    store: wx.getStorageSync("store"),
    url:wx.getStorageSync("url")
  }
})
