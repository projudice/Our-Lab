// pages/device/device.js
const api = require('../../utils/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: app.globalData.type,
    warning: '',                        //安全警示的内容
    display: 'none',                    //控制是否显示安全警示
    appointments: [],                   //从api获取所有预约情况
    dateIndex: 0,
    dateArray: [],
    deviceIndex: 0,
    deviceArray: [],
    morning: false,                     //控制上午块的样式选择
    afternoon: false,                   //控制下午块的样式选择
    evening: false,                     //控制晚上块的样式选择
    date: "",
    year: '2019-'                       //计算年份拼接在日期前作为api参数
  },

  /**
   * 监听日期改变
   */
  bindDateChange: function(e) {
    this.setData({
      dateIndex: e.detail.value
    })
  },

  /**
   * 监听设备改变
   */
  bindDeviceChange: function(e) {
    this.setData({
      deviceIndex: e.detail.value
    })
  },

  /**
   * 在获取到某个设备预约情况后再做日期筛选
   */
  beforeFilter: function() {
    var self = this
    var appointSomeDay = []
    self.data.date = this.data.year + this.data.dateArray[this.data.dateIndex]
    appointSomeDay = this.data.appointments.filter((item) => item.reservedDate.indexOf(this.data.dateArray[this.data.dateIndex]) !== -1)
    self.data.morning = false
    self.data.afternoon = false
    self.data.evening = false
    appointSomeDay.forEach((item) => {
      if (item.reservedDuration >= 4) {
        self.data.morning = true
      }
      if (item.reservedDuration % 2 === 1) {
        self.data.evening = true
      }
      if ((item.reservedDuration / 2) % 2 === 1) {
        self.data.afternoon = true
      }
    })
    this.setData({
      morning: self.data.morning,
      afternoon: self.data.afternoon,
      evening: self.data.evening
    })
    console.log('今天预约', appointSomeDay)
  },

  /**
   * 基于日期设备筛选
   */
  filter: function() {
    var self = this
    api.getDeviceAppointed(self.data.deviceArray[self.data.deviceIndex].id, function(res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
        self.data.appointments = []
        self.beforeFilter()
      } else {
        self.data.appointments = res.data.data
        console.log('已预约', res.data.data)
        self.beforeFilter()
      }
    }, function(err) {
      wx.showToast({
        title: '获取失败请下拉刷新',
        icon: 'none'
      })
    })
  },

  /**
   * 点击已阅关闭安全警示
   */
  close: function() {
    this.setData({
      display: 'none'
    })
  },

  appoint: function(e) {
    var self = this
    var index = e.currentTarget.dataset.index - 0
    var obj = {
      equipmentId: self.data.deviceArray[self.data.deviceIndex].id,
      userId: app.globalData.userInfo.id,
      reserveTime: self.data.date,
      reserveDuration: index
    }
    if (self.data.deviceArray[self.data.deviceIndex].dangerous) {
      self.setData({
        display: 'block',
        warning: self.data.deviceArray[self.data.deviceIndex].alert
      })
    }
    api.appointDevice(obj, function(res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '预约成功',
          icon: 'none'
        })
        self.onLoad()
      }
    }, function(err) {
      wx.showToast({
        title: '预约失败请刷新重试',
        icon: 'none'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    var currentPage = getCurrentPages()[getCurrentPages().length - 1].route
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/login/login?page=' + currentPage,
      })
    } else {
      api.getValidEquipment(function(res) {
        if (res.data.error) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        } else {
          self.setData({
            deviceArray: res.data.data
          })
          console.log('设备', res.data.data)
          self.filter()
        }
      }, function(err) {
        wx.showToast({
          title: '获取失败下拉刷新',
          icon: 'none'
        })
      })
    }
    //计算筛选器里的日期
    var date = new Date()
    self.data.dateArray = []
    for (let i = 0; i < 3; i++) {
      date.setDate(date.getDate() + 1)
      let str = ''
      if ((date.getMonth() + 1) > 9) {
        str += (date.getMonth() + 1)
        str += '-'
      } else {
        str += '0'
        str += (date.getMonth() + 1)
        str += '-'
      }
      if (date.getDate() > 9) {
        str += date.getDate()
      } else {
        str += '0'
        str += date.getDate()
      }
      self.data.dateArray.push(str)
    }
    self.setData({
      dateArray: self.data.dateArray,
      year: date.getFullYear() + "-"
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
    this.setData({
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
    var self = this
    var currentPage = getCurrentPages()[getCurrentPages().length - 1].route
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/login/login?page=' + currentPage,
      })
    } else {
      api.getValidEquipment(function(res) {
        if (res.data.error) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        } else {
          self.setData({
            deviceArray: res.data.data
          })
          console.log('设备', res.data.data)
          self.filter()
        }
      }, function(err) {
        wx.showToast({
          title: '获取失败下拉刷新',
          icon: 'none'
        })
      })
    }
    this.filter()
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