// pages/personal/changestore/changestore.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: {}, // 店铺信息
    storeTypePicker: [], // 商家类型列表
    storeTypeIndex: "", // 商家类型的下标
  },
  // model窗口

  showModal(e) {
    this.setData({
      modelstoreType: true
    })
  },
  hideModal(e) {
    this.setData({
      modelstoreType: false,
      storeType: ""
    })
  },
  addstoreType(e) {
    this.setData({
      modelstoreType: false,
    })
  },
  // 商家类型
  storeTypePickerChange(e) {
    this.setData({
      storeTypeIndex: e.detail.value,
      ["store.storeType"]: this.data.storeTypePicker[e.detail.value]
    })
    // 如果选择自定义，则弹出输入框
    if (this.data.store.storeType == "自定义") {
      this.setData({
        modelstoreType: true
      })
    }
  },
  // 输入商家名称
  inputstoreName(e) {
    this.setData({
      ["store.storeName"]: e.detail.value
    })
  },
  // 输入自定义商家类型
  inputstoreType(e) {
    this.setData({
      ["store.storeType"]: e.detail.value
    })
  },
  // 输入店铺电话
  inputstorePhone(e) {
    this.setData({
      ["store.storePhone"]: e.detail.value
    })
  },
  // 选择图片
  ChooseImage() {
    const that =this;
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        that.setData({
          ["store.storeLogo"]: res.tempFilePaths[0]
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
          ["store.storeAddress"]: location
        })
      }
    })
  },
  textareaBInput(e){
      this.setData({
        ["store.storeNode"]: e.detail.value
      })
  },
  // 确认修改store信息
  changeStore: function () {
    console.log(this.data.store)
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确认修改?',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + 'store/',
            method: 'PUT',
            header: { 'content-type': 'application/json;charset=UTF-8' },
            data: that.data.store,
            success: function (res) {
              if (res.data) {
                console.log("修改成功！");
                wx.showModal({
                  title: '提示',
                  content: '修改成功',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta: 2
                      })
                    } 
                  }
                })
              }
            },
            fail: function (res) {
              console.log(res)
              wx.showModal({
                title: '提示',
                content: '修改失败',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 2
                    })
                  } 
                }
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("onload.admin",app.globalData.admin)
    // console.log("onload.store",app.globalData.store)
    const that = this;
    const store = app.globalData.store;
    if (store) {
      this.setData({
        store: store
      })
    }
    // 初始化所有商家类型
    wx.request({
      url: app.globalData.url + 'storetype',
      method: 'GET',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
      },
      success: function (res) {
        console.log(res.data);
        var storeTypeArr = res.data;
        var str = [];
        var i = 0;
        for (; i < storeTypeArr.length; i++) {
          str[i] = storeTypeArr[i].storeType
        }
        str[i++] = '自定义'
        // 将数据转换成数组
        that.setData({
          storeTypePicker: str
        })
      },
      fail: function (res) {
        // 初始数据加载
        initDataStoreType(that);
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
function initDataStoreType(that) {
  that.setData({
    storeTypePicker: ["饮食", "服装", "自定义"]
  })
}