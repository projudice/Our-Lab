// pages/device/device.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devices: [],
    url: api.serverDomain,
    imgSrc: '/pages/resources/no-photo.png',
    index: 0,
    type: 0
  },

  appoint: function (e) {
    var self = this
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/appointDevice/appointDevice?id=' + self.data.devices[index].id + '&alert=' + self.data.devices[index].alert,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    var currentPage = getCurrentPages()[getCurrentPages().length - 1].route
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/login/login?page=' + currentPage,
      })
    }else{
      api.getValidEquipment(function (res) {
        if (res.data.error) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        } else {
          self.setData({
            devices: res.data.data
          })
          console.log(res.data.data)
        }
      }, function (err) {
        wx.showToast({
          title: '获取失败下拉刷新',
          icon: 'none'
        })
      })
    }
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
    this.setData({
      type: app.globalData.type
    })
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
    var self = this
    var currentPage = getCurrentPages()[getCurrentPages().length - 1].route
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/login/login?page=' + currentPage,
      })
    } else {
      api.getValidEquipment(function (res) {
        if (res.data.error) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        } else {
          self.setData({
            devices: res.data.data
          })
          console.log(res.data.data)
        }
      }, function (err) {
        wx.showToast({
          title: '获取失败下拉刷新',
          icon: 'none'
        })
      })
    }
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