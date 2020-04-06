// pages/makeCard/makeCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateStart: '2018-01-01',//默认起始时间  
    dateEnd: '2020-01-24',//默认结束时间 
    cardTypeIndex: null,//会员卡类型下标
    cardTypePicker: ['储值卡', '计次卡'],//会员卡类型
    cardIsScore: false,//用户是否可以积分
    cardGradeRuleIndex: null,//会员卡等级下标
    cardGradeRulePicker: [],//会员卡等级规则
    cardBackground:"",
    // 会员卡等级设置
    gradeList: ["",""],//等级列表
    ruleList: ["",""],//规则列表
    discountList: ["",""],//折扣列表
  },
  showModal() {  

}  ,
  DateStartChange(e) {
    this.setData({
      dateStart: e.detail.value
    })
  },
  DateEndChange(e) {
    this.setData({
      dateEnd: e.detail.value
    })
  },
  // 会员卡选择
  cardTypePickerChange(e) {
    this.setData({
      cardTypeIndex: e.detail.value
    })
    //更新会员卡等级数组
    InitCardGrade(this)
  },
  // 是否可以积分
  cardIsScoreChange(e) {
    this.setData({
      cardIsScore: e.detail.value
    })
    //更新会员卡等级数组
    InitCardGrade(this)
  },
  cardGradeRulePickerChange(e) {
    if(this.data.cardTypeIndex == null){
      wx.showModal({  
        title: '提示',  
        content: '请选择会员卡类型',  
        success: function(res) {  
            if (res.confirm) {  
            console.log('用户点击确定')  
            } else if (res.cancel) {  
            console.log('用户点击取消')  
            }  
        }  
    }) 
    }else{
      this.setData({
        cardGradeRuleIndex: e.detail.value
      })
    }

  },
  // 增加一行会员卡等级
  addList(){
    this.data.gradeList.push(""),
    this.data.ruleList.push(""),
    this.data.discountList.push(""),
      this.setData({
        gradeList:this.data.gradeList,
        ruleList:this.data.ruleList,
        discountList:this.data.discountList,
      })
  },
  // 减少一行会员卡等级
  removeList(){
    this.data.gradeList.pop(),
    this.data.ruleList.pop(),
    this.data.discountList.pop(),
      this.setData({
        gradeList:this.data.gradeList,
        ruleList:this.data.ruleList,
        discountList:this.data.discountList,
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
            cardBackground:res.tempFilePaths
          })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
function InitCardGrade(that) {
  // 根据会员卡类型修改会员卡等级规则
  if (that.data.cardTypePicker[that.data.cardTypeIndex] == "积分卡") {
    that.setData({
      cardGradeRulePicker: ["按照积分", "不设置会员卡等级"]
    })
  } else if (that.data.cardTypePicker[that.data.cardTypeIndex] == "储值卡") {
    if (that.data.cardIsScore) {
      //有积分功能
      that.setData({
        cardGradeRulePicker: ["按照积分", "按照充值金额", "不设置会员卡等级"]
      })
    } else {
      that.setData({
        cardGradeRulePicker: ["按照充值金额", "不设置会员卡等级"]
      })
    }
  } else if (that.data.cardTypePicker[that.data.cardTypeIndex] == "计次卡") {
    if (that.data.cardIsScore) {
      //有积分功能
      that.setData({
        cardGradeRulePicker: ["按照积分", "按照充值次数", "不设置会员卡等级"]
      })
    } else {
      that.setData({
        cardGradeRulePicker: ["按照充值次数", "不设置会员卡等级"]
      })
    }
  }
}