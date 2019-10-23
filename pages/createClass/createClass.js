// pages/createClass/createClass.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherName: '',
    dateFrom: '',                       //日期picker的开始日期
    dateTo: '',                         //日期picker的结束日期
    date: '',                           //上课日期
    dateStop: '',                       //选课截止日期
    array: ['第1,2节', '第3,4节', '第5,6节', '第7,8节', '第9,10节', '第11,12节'],
    arrBegin:['第1,2节', '第3,4节', '第5,6节', '第7,8节', '第9,10节', '第11,12节'],
    arrStop: ['第1,2节', '第3,4节', '第5,6节', '第7,8节', '第9,10节', '第11,12节'],
    arrRoom: [],
    indexBegin: 0,
    indexStop: 0,
    indexRoom: 0,
  },

  /**
   * 监听上课日期改变
   */
  bindDateChange: function(e){
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 监听教室改变
   */
  bindRoomChange: function (e) {
    this.setData({
      indexRoom: e.detail.value
    })
  },

  /**
   * 监听截止日期改变
   */
  bindStopDateChange: function (e) {
    this.setData({
      dateStop: e.detail.value
    })
  },

  /**
   * 监听课的开始时间改变
   */
  bindBeginChange: function (e) {
    this.setData({
      indexBegin: e.detail.value,
      indexStop: 0,
      arrStop: this.data.array.slice(e.detail.value)
    })
  },

  /**
   * 监听课的结束时间改变
   */
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
              success: function () {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
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
    var obj = JSON.parse(options.info)
    this.setData({
      dateFrom: this.data.dateFrom,
      dateTo: this.data.dateTo,
      date: obj.date,
      dateStop: obj.date,
      arrRoom: this.data.arrRoom,
      indexBegin: obj.beginIndex,
      arrStop: this.data.array.slice(obj.beginIndex),
      indexRoom: obj.roomIndex,
      teacherName: app.globalData.userInfo.name
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