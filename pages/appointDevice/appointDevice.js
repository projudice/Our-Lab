// pages/appointDevice/appointDevice.js
const api = require('../../utils/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warning: '',
    display: 'none',
    id: 0,
    appointments: [],
    dateIndex: 0,
    dateArray: [],
    morning: false,
    afternoon: false,
    evening: false,
    date: "",
    year: '2019-'
  },

  bindDateChange: function(e) {
    this.setData({
      dateIndex: e.detail.value
    })
  },

  //选定日期进行筛选
  filter: function() {
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
    console.log(appointSomeDay)
  },

  close: function() {
    this.setData({
      display: 'none'
    })
  },

  appoint: function(e) {
    var self = this
    var index = e.currentTarget.dataset.index - 0
    var obj = {
      equipmentId: self.data.id,
      userId: app.globalData.userInfo.id,
      reserveTime: self.data.date,
      reserveDuration: index
    }
    console.log(obj)
    api.appointDevice(obj, function(res){
      if(res.data.error){
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }else{
        wx.showToast({
          title: '预约成功',
          icon: 'none'
        })
        self.onLoad({
          alert:'null',
          id: self.data.id
        })
      }
    }, function(err){
      wx.showToast({
        title: '预约失败请退出重试',
        icon: 'none'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    if (options.alert !== 'null') {
      self.setData({
        warning: options.alert,
        display: 'block'
      })
    }
    self.setData({
      id: options.id - 0
    })
    api.getDeviceAppointed(options.id, function(res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        self.setData({
          appointments: res.data.data
        })
        self.filter()
        console.log('预约', res.data.data)
      }
    }, function(err) {
      wx.showToast({
        title: '获取失败请返回重试',
        icon: 'none'
      })
    })
    //计算筛选器里的日期
    var date = new Date()
    self.data.dateArray = []
    for (let i = 0; i < 3; i++) {
      if (i !== 0) {
        date.setDate(date.getDate() + 1)
      }
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
      year: date.getFullYear()+"-"
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
    api.getDeviceAppointed(this.data.id, function (res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        self.setData({
          appointments: res.data.data
        })
        console.log('预约', res.data.data)
      }
    }, function (err) {
      wx.showToast({
        title: '获取失败请返回重试',
        icon: 'none'
      })
    })
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