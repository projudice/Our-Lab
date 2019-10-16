// pages/createClass/createClass.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateFrom: '',
    dateTo: '',
    date: '',
    dateStop: '',
    array: ['第一节', '第二节', '第三节', '第四节', '第五节', '第六节'],
    arrBegin: ['第一节', '第二节', '第三节', '第四节', '第五节', '第六节'],
    arrStop: ['第一节', '第二节', '第三节', '第四节', '第五节', '第六节'],
    arrRoom: [],
    indexBegin: 0,
    indexStop: 0,
    indexRoom: 0,
  },

  bindDateChange: function(e){
    this.setData({
      date: e.detail.value
    })
  },

  bindRoomChange: function (e) {
    this.setData({
      indexRoom: e.detail.value
    })
  },

  bindStopDateChange: function (e) {
    this.setData({
      dateStop: e.detail.value
    })
  },

  bindBeginChange: function (e) {
    this.setData({
      indexBegin: e.detail.value,
      arrStop: this.data.array.slice(e.detail.value)
    })
  },

  bindStopChange: function (e) {
    this.setData({
      indexStop: e.detail.value,
    })
  },

  formSubmit: function (e) {
    let empty = 0
    let obj = e.detail.value
    Object.keys(obj).forEach(function(key){
      if(obj[key] === ''){
        empty = 1
      }
    })
    obj.maxStudentNumber -= 0
    obj.beginTime -= 0
    obj.stopTime -= 0
    obj.stopTime += obj.beginTime
    obj.roomId = this.data.arrRoom[this.data.indexRoom].id
    console.log(obj)
    if(empty){
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none'
      })
    }else{
      if(obj.reportUntil < obj.accessibleUntil){
        wx.showToast({
          title: '截止日期有误',
          icon: 'none'
        })
      }else{
        wx.showLoading({
          title: '开课中',
        })
        api.createClass(obj, function(res){
          wx.hideLoading()
          if(res.data.error){
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }else{
            console.log(res)
            wx.showToast({
              title: '开课成功',
              icon: 'none'
            })
            wx.switchTab({
              url: '/pages/class/class',
            })
          }
        }, function(err){
          wx.hideLoading()
          wx.showToast({
            title: '开课失败',
            icon: 'none'
          })
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var d = new Date()
    d.setDate(d.getDate() + 1)
    let str = d.getFullYear() + '-'
    if ((d.getMonth() + 1) > 9) {
      str += (d.getMonth() + 1)
      str += '-'
    } else {
      str += '0'
      str += (d.getMonth() + 1)
      str += '-'
    }
    if (d.getDate() > 9) {
      str += d.getDate()
    } else {
      str += '0'
      str += d.getDate()
    }
    this.data.dateFrom = str
    d.setDate(d.getDate() + 6)
    str = d.getFullYear() + '-'
    if ((d.getMonth() + 1) > 9) {
      str += (d.getMonth() + 1)
      str += '-'
    } else {
      str += '0'
      str += (d.getMonth() + 1)
      str += '-'
    }
    if (d.getDate() > 9) {
      str += d.getDate()
    } else {
      str += '0'
      str += d.getDate()
    }
    this.data.dateTo = str
    this.data.arrRoom = app.globalData.rooms
    this.data.arrRoom.forEach((item)=>{item.room = item.name + item.location})
    this.setData({
      dateFrom: this.data.dateFrom,
      dateTo: this.data.dateTo,
      date: str,
      dateStop: str,
      arrRoom: this.data.arrRoom,
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