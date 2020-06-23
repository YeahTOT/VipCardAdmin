// components/card/card.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    card:Object,
    isShowButton:{ // 属性名
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showQRCode(e) {
      console.log("1111")
      console.log(this.properties)
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
      // wx.downloadFile({
      //   url: that.data.QRCode,
      //   success: function (res) {
      //     console.log(res.tempFilePath)
      //     //图片保存到本地
      //     wx.saveImageToPhotosAlbum({
      //       filePath: res.tempFilePath,
      //       success: function (data) {
      //         wx.hideLoading()
      //         wx.showModal({
      //           title: '提示',
      //           content: '您的推广海报已存入手机相册，赶快分享给好友吧',
      //           showCancel:false,
      //         })
      //       },
      //       fail: function (err) {
      //         if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
      //           // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
      //           wx.showModal({
      //             title: '提示',
      //             content: '需要您授权保存相册',
      //             showCancel: false,
      //             success:modalSuccess=>{
      //               wx.openSetting({
      //                 success(settingdata) {
      //                   console.log("settingdata", settingdata)
      //                   if (settingdata.authSetting['scope.writePhotosAlbum']) {
      //                     wx.showModal({
      //                       title: '提示',
      //                       content: '获取权限成功,再次点击图片即可保存',
      //                       showCancel: false,
      //                     })
      //                   } else {
      //                     wx.showModal({
      //                       title: '提示',
      //                       content: '获取权限失败，将无法保存到相册哦~',
      //                       showCancel: false,
      //                     })
      //                   }
      //                 },
      //                 fail(failData) {
      //                   console.log("failData",failData)
      //                 },
      //                 complete(finishData) {
      //                   console.log("finishData", finishData)
      //                 }
      //               })
      //             }
      //           })
      //         }
      //       },
      //       complete(res) {
      //         wx.hideLoading()
      //       }
      //     })
      //   }
      // })
    
  
      // 关闭窗口
      this.setData({
        modalName: null
      })
    },
  }
})
