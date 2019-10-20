// pages/selfDevices/selfDevices.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devices: [],
    index: 0,
  },

  cancelAppoint: function (e) {
    var self = this
    var index = e.currentTarget.dataset.index
    api.cancelAppoint(self.data.devices[index].recordId, app.globalData.userInfo.id, function (res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '取消成功',
          icon: 'none'
        })
        self.onLoad()
      }
    }, function (err) {
      wx.showToast({
        title: '取消失败',
        icon: 'none'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    api.getSelfDevices(app.globalData.userInfo.id, function (res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        self.data.devices = res.data.data
        self.data.devices.forEach((item)=>{
          var time = ''
          if (item.reserveDuration >= 4) {
            time += '上午'
          }
          if ((item.reserveDuration / 2) % 2 === 1) {
            time += '下午'
          }
          if (item.reserveDuration % 2 === 1) {
            time += '晚上'
          }
          item.time = time
        })
        self.setData({
          devices: self.data.devices,
        })
        console.log(res.data.data)
      }
    }, function (err) {
      wx.showToast({
        title: '获取失败,下拉刷新',
        icon: 'none'
      })
    })
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
    this.onLoad()
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