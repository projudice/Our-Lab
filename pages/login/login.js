// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginAnimation: {},
    logonAnimation: {},
    loginZIndex: 10,
    logonZIndex: 9,
    page: '/pages/info/info'
  },

  loginChange: function () {
    var self = this
    var distance = app.globalData.windowWidth * 0.6 - 25
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    animation.translateX(distance * -1).step()
    animation.translateX(-50).step()
    this.setData({
      loginAnimation: animation.export(),
    })
    setTimeout(function () {
      self.setData({
        loginZIndex: self.data.loginZIndex == 10 ? 9 : 10,
        logonZIndex: self.data.logonZIndex == 10 ? 9 : 10
      })
    }, 300)
  },

  logonChange: function () {
    var self = this
    var distance = app.globalData.windowWidth * 0.6 - 25
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    animation.translateX(distance).step()
    animation.translateX(50).step()
    this.setData({
      logonAnimation: animation.export(),
    })
    setTimeout(function () {
      self.setData({
        loginZIndex: self.data.loginZIndex == 10 ? 9 : 10,
        logonZIndex: self.data.logonZIndex == 10 ? 9 : 10
      })
    }, 300)
  },

  loginSubmit: function (e) {
    var self = this
    console.log('登录', e.detail.value)
    var token = {
      id: e.detail.value.id
    }
    app.globalData.token = token
    wx.switchTab({
      url: '/' + self.data.page,
    })
  },

  logonSubmit: function (e) {
    console.log('注册', e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.page = options.page
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

  }
})