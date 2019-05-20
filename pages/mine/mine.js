// pages/mine/mine.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    userId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:app.globalData.userInfo,
      userId:app.globalData.userId
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

/**
 * 测试下载
 */
  onTap:function(e){
    wx.downloadFile({
      url:'http://video.317hu.com/917b3140-3da6-47d5-911c-a15462fcdeb2.pdf',
      success:function(res){
        wx.openDocument({
          filePath: res.tempFilePath,
          success:function(res){

          }
        });
      }
    });
  }

})