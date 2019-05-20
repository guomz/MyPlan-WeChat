// pages/edit/edit.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //0代表添加计划，输入框无内容，用于点击日历某一天精确添加；1代表查看或修改，输入框有内容，内容是否可修改根据nowUserId与userId的对比
    isEdit:null,
    userId:null,
    //点击查看的计划的用户id
    nowUserId:null,
    planId:null,
    planDate:null,
    groupName:null,
    planName:null,
    planTime:'09:00',
    planDetail:null,
    updatePlanUrl:'/calendar/updateplan',
    deletePlanUrl:'/calendar/deleteplan',
    addPlanUrl: '/calendar/addplan'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.isEdit==1)
    {
      this.setData({
       // userId: app.globalData.userId,
        planId: options.planId,
       // planDate: options.planDate,
        groupName: options.groupName,
        planName: options.planName,
        planTime: options.planTime,
        planDetail: options.planDetail,
        nowUserId:parseInt(options.userId)
      });
    }   
    this.setData({
      planDate:options.planDate,
      userId:app.globalData.userId,
      isEdit:options.isEdit
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

  },

  onTimeChange: function (e) {
    this.setData({
      planTime: e.detail.value
    });
  },
/**
 * 提交编辑按钮
 */
  onSubmit:function(e){
   // console.log(e.detail.value.planDetail)
   if(this.data.isEdit==1)
   {
     wx.request({
       url: app.globalData.baseUrl + this.data.updatePlanUrl,
       data: {
         planId: this.data.planId,
         groupName: e.detail.value.groupName,
         planName: e.detail.value.planName,
         planTime: this.data.planTime,
         planDetail: e.detail.value.planDetail
       },
       success: function (res) {
         if (res.data.success) {
           wx.navigateBack({
             delta: 1
           });
           wx.showToast({
             title: '修改成功',
           });
         }
         else {
           wx.showToast({
             title: '操作失败',
           });
         }
       }
     });
   }
   else
   {
     var planList=[];
     var plan={
       userId: app.globalData.userId,
       planName: e.detail.value.planName,
       groupName: e.detail.value.groupName,
       planDetail: e.detail.value.planDetail,
       planDate: this.data.planDate,
       planTime: this.data.planTime
     };
     planList[0]=plan;
     wx.request({
       url: app.globalData.baseUrl+this.data.addPlanUrl,
       data:{
         planListStr:JSON.stringify(planList)
       },
       success:function(res){
         if(res.data.success)
         {
           wx.navigateBack({
             delta:1
           });
           wx.showToast({
             title: '操作成功',
           });
         }
         else
         {
           wx.showToast({
             title: '操作失败',
           });
         }
       }
     });
   }
    
  },
/**
 * 删除计划按钮
 */
  onDelete:function(e){
    wx.showModal({
      title: '警告',
      content: '确认删除吗？',
      success:function(res){
        if(res.confirm)
        {
          wx.request({
            url: app.globalData.baseUrl + this.data.deletePlanUrl,
            data: {
              planId: this.data.planId
            },
            success: function (res) {
              if (res.data.success) {
                wx.navigateBack({
                  delta: 1
                });
                wx.showToast({
                  title: '删除成功',
                });
              }
              else {
                wx.showToast({
                  title: '操作失败',
                });
              }
            }
          });
        }
      }
    });
    
  },
/**
 * 点击返回按钮
 */
  onTap:function(e){
    wx.navigateBack({
      delta:1
    });
  }
})