// pages/login/login.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginAnimation: {},
    logonAnimation: {},
    loginZIndex: 10,
    logonZIndex: 9,
    page: '/pages/info/info',
    disabled: false
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
        disabled: self.data.loginZIndex == 10 ? true : false,
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
        disabled: self.data.loginZIndex == 10 ? true : false,
        loginZIndex: self.data.loginZIndex == 10 ? 9 : 10,
        logonZIndex: self.data.logonZIndex == 10 ? 9 : 10
      })
    }, 300)
  },

  loginSubmit: function (e) {
    var self = this
    var id = e.detail.value.id
    var password = e.detail.value.password
    if(id === '' || password === ''){
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none'
      })
    }else{
      wx.showLoading({
        title: '登录中',
      })
      api.login(id, password, function(res){
        wx.hideLoading()
        if(res.data.error){
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }else{
          app.globalData.token = res.data.data.token
          app.globalData.userInfo = res.data.data.user
          app.globalData.type = res.data.data.user.type
          if(res.data.data.user.type === 3){
            app.globalData.userInfo.identify = '管理员'
          } else if (res.data.data.user.type === 2){
            app.globalData.userInfo.identify = '老师'
          } else {
            app.globalData.userInfo.identify = '学生'
          }
          wx.showToast({
            title: '登录成功',
            icon: 'none'
          })
          wx.switchTab({
            url: '/' + self.data.page,
            success: function(){
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }
      }, function(err){
        wx.hideLoading()
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      })
    }
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