// pages/selfClasses/selfClasses.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classes: [],
    isSigned: '已签到',
    isNotSigned: '签 到',
    index: 0
  },

  /**
   * 退课
   */
  dropClass: function(e) {
    var self = this
    var index = e.currentTarget.dataset.index
    api.dropClass(self.data.classes[index].id, function(res){
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '退课成功',
          icon: 'none'
        })
        self.onLoad()
      }
    }, function (err) {
      wx.showToast({
        title: '退课失败',
        icon: 'none'
      })
    })
  },

  /**
   * 签到
   */
  signIn: function (e) {
    wx.showLoading({
      title: '签到中',
    })
    var self = this
    var index = e.currentTarget.dataset.index
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res.longitude, res.latitude)
        api.signIn(self.data.classes[index].id, res.longitude, res.latitude, function (suc) {
          if (suc.data.error) {
            wx.hideLoading()
            wx.showToast({
              title: suc.data.message,
              icon: 'none'
            })
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '签到成功',
              icon: 'success'
            })
            self.onLoad()
          }
        }, function (err) {
          wx.hideLoading()
          wx.showToast({
            title: '签到失败',
            icon: 'none'
          })
        })
      },
      fail(err) {
        wx.hideLoading()
        wx.showToast({
          title: '获取不到位置',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    api.getSelfClasses(function(res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        self.setData({
          classes: res.data.data
        })
        console.log(res.data.data)
      }
    }, function(err) {
      wx.showToast({
        title: '获取失败,下拉刷新',
        icon: 'none'
      })
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
    api.getSelfClasses(function(res) {
      if (res.data.error) {
        wx.showToast({
          title: '获取失败,下拉刷新',
          icon: 'none'
        })
      } else {
        self.setData({
          classes: res.data.data
        })
      }
    }, function(err) {
      wx.showToast({
        title: '获取失败,下拉刷新',
        icon: 'none'
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