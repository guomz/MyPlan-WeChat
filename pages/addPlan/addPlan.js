// pages/edit/edit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addPlanUrl:'/calendar/addplan',
    weekArr: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周'],
    weekDayArr: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
    startWeek: 1,
    endWeek: 18,
    weekDay: 1,
    planTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.startWeekInit();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 显示目前是第几周，初始化picker
   */
  startWeekInit: function(e) {
    var initDateStr = app.globalData.initDate;
    var initDateArr = initDateStr.split("-");
    var initDate = new Date();
    initDate.setFullYear(initDateArr[0], initDateArr[1] - 1, initDateArr[2]);
    var nowDate = new Date();
    var times = nowDate.getTime() - initDate.getTime();
    //得到相差天数
    var days = times / (1000 * 60 * 60 * 24)+1;
    var weeks = parseInt(days / 7);
    if (days % 7 > 0) {
      weeks = weeks + 1;
    }
    this.setData({
      startWeek: weeks
    });
    //console.log(weeks);
  },

  /**
   * 获得初始时间
   */
  getInitDate: function() {
    var initDateStr = app.globalData.initDate;
    var initDateArr = initDateStr.split("-");
    var initDate = new Date();
    initDate.setFullYear(initDateArr[0], initDateArr[1] - 1, initDateArr[2]);
    return initDate;
  },

  onStartWeekChange: function(e) {
    this.setData({
      startWeek: parseInt(e.detail.value) + 1
    });
  },

  onEndWeekChange: function(e) {
    this.setData({
      endWeek: parseInt(e.detail.value) + 1
    });
  },

  onWeekDayChange: function(e) {
    this.setData({
      weekDay: parseInt(e.detail.value) + 1
    })
  },

  onTimeChange: function(e) {
    this.setData({
      planTime: e.detail.value
    });
  },

  onSubmit: function(e) {
    //初始日期对象获取
    var startDate = this.getInitDate();
    //得到开始周次日期对象
    var startWeek = this.data.startWeek;
    var endWeek = this.data.endWeek;
    var weekDay = this.data.weekDay;
    if (endWeek < startWeek) {
      wx.showToast({
        title: '请选择正确的周次',
        icon: 'none'
      });
      return;
    }
    //这里日期加法需要注意
    startDate.setDate(startDate.getDate() + 7 * (startWeek - 1) + (weekDay - 1));
    //初始化计划数组
    var planList = [];
    for (var i = 0; i < endWeek - startWeek + 1; i++) {
      var year = startDate.getFullYear();
      var month = startDate.getMonth() + 1;
      var day = startDate.getDate();
      planList[i] = {
        userId: app.globalData.userId,
        planName: e.detail.value.planName,
        groupName: e.detail.value.groupName,
        planDetail: e.detail.value.planDetail,
        planDate: year + '-' + month + '-' + day,
        planTime: this.data.planTime
      }
      startDate.setDate(startDate.getDate() + 7);
    }

    var that=this;
    wx.request({
      url: app.globalData.baseUrl+this.data.addPlanUrl,
      data:{
        planListStr:JSON.stringify(planList)
      },
      success:function(res)
      {
        var titleFlag='';
        if(res.data.success)
        {
          titleFlag='操作成功';
          wx.navigateBack({
            delta:1
          });
        }
        else
        {
          titleFlag='操作失败';
          wx.navigateBack({
            delta:1
          });
        }
        wx.showToast({
          title: titleFlag,
        });
      }
    });

  }
})