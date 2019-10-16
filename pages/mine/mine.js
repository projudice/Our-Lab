// pages/mine/mine.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasToken: app.globalData.token,
    userInfo: app.globalData.userInfo,
    type: app.globalData.type
  },

  login: function() {
    var currentPage = getCurrentPages()[getCurrentPages().length - 1].route
    wx.navigateTo({
      url: '../login/login?page=' + currentPage,
    })
  },

  logout: function() {
    var self = this
    api.logout(function(res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        app.globalData.token = null
        app.globalData.userInfo = null
        app.globalData.type = 0
        self.setData({
          hasToken: app.globalData.token,
          userInfo: app.globalData.userInfo,
          type: app.globalData.type
        })
      }
    })
  },

  classRecords: function() {
    if (app.globalData.token) {
      wx.navigateTo({
        url: '../selfClasses/selfClasses',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  createClassesRecords: function() {
    if (app.globalData.token) {
      wx.navigateTo({
        url: '../selfCreate/selfCreate',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  deviceRecords: function() {
    if (app.globalData.token) {
      wx.navigateTo({
        url: '../selfDevices/selfDevices',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  changePassword: function() {
    if (app.globalData.token) {
      wx.navigateTo({
        url: '../changePassword/changePassword',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.setData({
      hasToken: app.globalData.token,
      userInfo: app.globalData.userInfo,
      type: app.globalData.type
    })
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

  }
})