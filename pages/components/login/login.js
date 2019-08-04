// pages/components/login/login.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    loginAnimation: {},
    logonAnimation: {},
    loginZIndex: 10,
    logonZIndex: 9,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loginChange: function() {
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
      setTimeout(function() {
        self.setData({
          loginZIndex: self.data.loginZIndex == 10 ? 9 : 10,
          logonZIndex: self.data.logonZIndex == 10 ? 9 : 10
        })
      }, 300)
    },

    logonChange: function() {
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
      setTimeout(function() {
        self.setData({
          loginZIndex: self.data.loginZIndex == 10 ? 9 : 10,
          logonZIndex: self.data.logonZIndex == 10 ? 9 : 10
        })
      }, 300)
    },

    loginSubmit: function(e) {
      console.log('登录', e.detail.value)
      var token = {
        id: e.detail.value.id
      }
      app.globalData.token = token
    },

    logonSubmit: function (e) {
      console.log('注册', e.detail.value)
    },
  }
})