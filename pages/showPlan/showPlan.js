// pages/publicPlan/publicPlan.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getPlanListUrl:'/calendar/getplanlist',
    planDate:'',
    //用于初始化显示的userId，0代表全部
    userId:null,
    //用户自己的id，用于判断是否显示编辑按钮
    myuserId: null,
    planList:[
      {
        planId: 1,
        userId: 1,
        myuserId:null,
        planName: 'test1',
        groupName: 'guomz',
        planDetail: 'plan1',
        planDate: '2019-4-10',
        planTime:'9:00'
      },
      {
        planId: 2,
        userId: 1,
        planName: 'test2',
        groupName: 'guomz',
        planDetail: 'plan2',
        planDate: '2019-4-12',
        planTime: '9:00'
      },
      {
        planId: 3,
        userId: 1,
        planName: 'test3',
        groupName: 'guomz',
        planDetail: 'plan3',
        planDate: '2019-4-15',
        planTime: '9:00'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      planDate:options.planDate,
      userId:options.userId,
      myuserId:app.globalData.userId
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
    var that=this;
    //判断是全局计划列表还是指定用户的计划列表，以此改变url
    if(this.data.userId==0)
    {
      wx.request({
        url: app.globalData.baseUrl + this.data.getPlanListUrl,
        data: {
          planDate: this.data.planDate
        },
        success: function (res) {
          if (res.data.success) {
            //console.log('success')
            that.setData({
              planList: res.data.planList
            });
          }
        }
      });
    }
    else
    {
      wx.request({
        url: app.globalData.baseUrl + this.data.getPlanListUrl,
        data: {
          userId: this.data.userId,
          planDate: this.data.planDate
        },
        success: function (res) {
          if (res.data.success) {
           // console.log('success')
            that.setData({
              planList: res.data.planList
            });
          }
        }
      });
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