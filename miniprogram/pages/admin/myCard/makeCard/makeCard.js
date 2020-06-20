// pages/makeCard/makeCard.js
const app = getApp()
Page({


  data: {
    // 需要提交给服务器的数据格式                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    storeCard:{
      cardName: "季季红",
      cardTypes: [
        {
          cardTypeId: 1
        },
        {
          cardTypeId: 2
        }
      ],
      cardTimeStart: "2020-05-07",
      cardTimeEnd: "2020-06-28",
      cardStatus: "未过期",
      cardNode: "这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这是用于测试的卡这",
      cardSurplus: 100,
      cardNum: 200,
      cardLogo: "https://7669-vipcard-3y6o1-1301438009.tcb.qcloud.la/image/google.png?sign\u003dd24081f06d9b12f718953b0291f95c79\u0026t\u003d1585280719",
      store: {
        storeOpenid: "oHy4O5A5cA3WAdC9YTJo8qMQiIUo"
      }
    },
    // 页面初始化数据
    dateStart: '2018-01-01',//默认起始时间  
    dateEnd: '2020-01-24',//默认结束时间 
    cardTypeIndex: null,//会员卡类型下标
    cardTypePicker: ['储值卡', '计次卡'],//会员卡类型
    cardIsScore: false,//用户是否可以积分
    cardGradeRuleIndex: null,//会员卡等级下标
    cardGradeRulePicker: [],//会员卡等级规则,更具会员卡类型生成
    cardBackground:"",
    // 会员卡等级设置
    gradingList:[
      {
        gradeList: "",//等级列表
        ruleListMin:"",//规则列表 min
        ruleListMax:"",//规则列表 max
        discountList: ""//折扣列表
      },
    ]
  },
  // 输入会员卡名称
  input_cardName(e){
    this.setData({
      ["storeCard.cardName"]: e.detail.value
    })
  },
 // 输入发放数量
 input_cardNum(e){
  this.setData({
    ["storeCard.cardNum"]: e.detail.value,
    ["storeCard.cardSurplus"]: e.detail.value
  })
},

  showModal() {  

}  ,
  DateStartChange(e) {
    this.setData({
      dateStart:e.detail.value,
      ["storeCard.cardTimeStart"]: e.detail.value
    })
  },
  DateEndChange(e) {
    this.setData({
      dateEnd:e.detail.value,
      ["storeCard.cardTimeEnd"]: e.detail.value
    })
  },
  // 会员卡选择
  cardTypePickerChange(e) {
    console.log('cardTypePickerChange',e.detail.value)
    this.setData({
      cardTypeIndex: e.detail.value
      // ["storeCard.cardTypes"]:[e.detail.value]
    })
    // 构造会员卡类型对象
    const cardtype = {
      cardTypeId:this.data.cardTypeIndex
    }
    // 判断是否可以积分
    if(this.data.cardIsScore){
      // 可以积分
      // 清空数组
      this.setData({
        ["storeCard.cardTypes"]:[]
      });
      // 构造会员卡类型对象 积分
      const cardtypeScore = {
        cardTypeId:"2"
      }
      this.data.storeCard.cardTypes.push(cardtypeScore)
      this.data.storeCard.cardTypes.push(cardtype)
      this.setData({
        ["storeCard.cardTypes"]:this.data.storeCard.cardTypes
      });
    }else{
      // 不可以积分
      // 清空数组
      this.setData({
        ["storeCard.cardTypes"]:[]
      });
      this.data.storeCard.cardTypes.push(cardtype)
      this.setData({
        ["storeCard.cardTypes"]:this.data.storeCard.cardTypes
      });
    }
    console.log(this.data.storeCard.cardTypes)
    //更新会员卡等级数组
    InitCardGrade(this)
  },
  // 是否可以积分
  cardIsScoreChange(e) {
    this.setData({
      cardIsScore: e.detail.value
    })
    // 构造会员卡类型对象
    const cardtype = {
      cardTypeId:this.data.cardTypeIndex
    }
    // 判断是否可以积分
    if(this.data.cardIsScore){
      // 可以积分
      // 清空数组
      this.setData({
        ["storeCard.cardTypes"]:[]
      });
      // 构造会员卡类型对象 积分
      const cardtypeScore = {
        cardTypeId:"2"
      }
      this.data.storeCard.cardTypes.push(cardtypeScore)
      this.data.storeCard.cardTypes.push(cardtype)
      this.setData({
        ["storeCard.cardTypes"]:this.data.storeCard.cardTypes
      });
    }else{
      // 不可以积分
      // 清空数组
      this.setData({
        ["storeCard.cardTypes"]:[]
      });
      this.data.storeCard.cardTypes.push(cardtype)
      this.setData({
        ["storeCard.cardTypes"]:this.data.storeCard.cardTypes
      });
    }
    console.log(this.data.storeCard.cardTypes)
    // //更新会员卡等级数组
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
    const grading = {
      gradeList: "",//等级列表
        ruleList:"",//规则列表
        discountList: ""//折扣列表
    }
    this.data.gradingList.push(grading)
      this.setData({
        gradingList:this.data.gradingList
      })
  },
  // 减少一行会员卡等级
  removeList(){
    this.data.gradingList.pop(),
      this.setData({
        gradingList:this.data.gradingList
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
            cardBackground:res.tempFilePaths,
            ["storeCard.cardLogo"]:res.tempFilePaths[0]
          })
      }
    });
  },
  // 提交创建会员卡的请求
  submitCard:function(){
    console.log('提交前的数据',this.data.storeCard)
    const that = this
    // 提示框，是否确认修改
    wx.showModal({
      title: '提示',
      content: '确认添加？',
      showCancel: false,
      success(res) {
        wx.request({
          url:app.globalData.url+'storecard/' ,
          method: 'POST',
          header: { 'content-type': 'application/json' },
          data: that.data.storeCard,
          success: function (res) {
            console.log('提交的storeCard',that.data.storeCard)
            console.log(res)
            // 判断服务器返回的返回码
            if(res.statusCode == 200){
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
          }else if(res.statusCode == 404){
            wx.showModal({
              title: '提示',
              content: 'URL错误',
              showCancel: false,
              success(res) {
                
              }
            })
          }
          },
          fail:function(res){
            console.log('提交的storeCard',that.data.storeCard)
            console.log(res)
          }
        })
        
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载会员卡的store.storeOpenid
    this.setData({
      ["storeCard.store.storeOpenid"]:app.globalData.store.storeOpenid
    });
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