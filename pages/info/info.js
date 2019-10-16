// pages/info/info.js
const api = require('../../utils/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labInfo: {},
    peopleIntroduction: {},
    notice: [],
    info: {},
    display: 'none',
    photos: [],
    url: api.serverDomain
  },

  viewDetails: function(e) {
    this.setData({
      info: e.currentTarget.dataset.value,
      display: 'block'
    })
  },

  closeEvent: function(e) {
    this.setData({
      display: e.detail.display
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    api.getPhotos(function(res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        self.setData({
          photos: res.data.data
        })
        console.log('图片', res.data)
      }
    }, function(err) {
      wx.showToast({
        title: '获取图片失败刷新重试',
        icon: 'none'
      })
    })
    api.getValidNotice(function(res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        self.setData({
          notice: res.data.data
        })
        console.log('通知', res.data)
      }
    }, function(err) {
      wx.showToast({
        title: '获取公告失败刷新重试',
        icon: 'none'
      })
    })
    api.getInfo(function(res) {
      if (res.data.error) {
        self.setData({
          introduction: '无介绍'
        })
      } else {
        self.setData({
          labInfo: res.data.data
        })
        console.log('实验室信息', res.data)
      }
    }, function(err) {
      self.setData({
        introduction: '获取信息失败，请下拉刷新'
      })
    })
    api.getPeopleIntroduction(function(res) {
      self.setData({
        peopleIntroduction: res.data.data
      })
      console.log('人员介绍', res.data)
    })
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
    var self = this
    api.getInfo(function(res) {
      if (res.error) {
        self.setData({
          introduction: '无介绍'
        })
      } else {
        self.setData({
          name: res.data.data.name,
          introduction: res.data.data.introduction
        })
      }
    }, function(err) {
      self.setData({
        introduction: '获取信息失败，请下拉刷新'
      })
    })
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