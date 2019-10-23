// pages/viewStudents/viewStudents.js
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    isSigned: '已签到',
    isNotSigned: '签 到',
    id: 0
  },

  /**
   * 教师辅助签到
   */
  signIn: function(e) {
    var self = this
    var index = e.currentTarget.dataset.index
    api.helpSignIn(self.data.info[index].id, function (suc) {
      if (suc.data.error) {
        wx.showToast({
          title: suc.data.message,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '签到成功',
          icon: 'success'
        })
        self.onLoad({id: self.data.id})
      }
    }, function (err) {
      wx.showToast({
        title: '签到失败',
        icon: 'none'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    self.data.id = options.id
    api.viewStudents(options.id, function(res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        self.setData({
          info: res.data.data
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
    this.onLoad()
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