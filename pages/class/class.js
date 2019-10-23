// pages/class/class.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classes: [],                        //从api获取的所有课的信息
    index: 0,
    classesSomeDay: [],                 //某一天的课
    type: app.globalData.type,
    dateIndex: 0,                       //用于日期picker
    dateArray: [],                      //用于日期picker
    year: [],                           //与每个日期相对应的年份
    roomIndex: 0,                       //用于教室picker
    roomArray: [],                      //用于教室picker
    rooms: [],                          //从api获取的所有教室的信息
  },

  /**
   * 监听日期picker改变
   */
  bindDateChange: function(e) {
    this.setData({
      dateIndex: e.detail.value
    })
  },

  /**
   * 监听教室picker改变
   */
  bindRoomChange: function(e) {
    this.setData({
      roomIndex: e.detail.value
    })
  },

  /**
   * 基于日期教室对课过滤
   */
  filter: function() {
    this.data.classesSomeDay = this.data.classes.filter((item) => item.reportUntil.indexOf(this.data.dateArray[this.data.dateIndex]) !== -1 && item.room.id === this.data.rooms[this.data.roomIndex].id)
    this.setData({
      classesSomeDay: this.data.classesSomeDay
    })
    console.log(this.data.classesSomeDay)
  },

  //监听date组件事件（未使用该组件）
  // onMyEvent: function(e) {
  //   this.data.classesSomeDay = this.data.classes.filter((item) => item.reportUntil.indexOf(e.detail.day) !== -1)
  //   console.log(this.data.classesSomeDay)
  //   this.setData({
  //     classesSomeDay: this.data.classesSomeDay
  //   })
  // },

  appoint: function(e) {
    var self = this
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '确定预约此实验课？',
      content: `${self.data.classesSomeDay[index].name}-${self.data.classesSomeDay[index].teacherName}`,
      success(res) {
        if (res.confirm) {
          api.chooseClasses(self.data.classesSomeDay[index].id, function(res) {
            if (res.data.error) {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            }else{
              wx.showToast({
                title: '选课成功',
                icon: 'none'
              })
            }
            console.log(res.data)
          }, function(err) {
            wx.showToast({
              title: '选课失败请刷新重试',
              icon: 'none'
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 点击详细信息进入详情页面
   */
  details: function(e) {
    var self = this
    var index = e.currentTarget.dataset.index
    var temp = {
      name: self.data.classesSomeDay[index].name,
      teacherName: self.data.classesSomeDay[index].teacherName,
      instruction: self.data.classesSomeDay[index].instruction,
      url: self.data.classesSomeDay[index].guideBook
    }
    wx.navigateTo({
      url: '../details/details?info=' + JSON.stringify(temp),
    })
  },

  /**
   * 点击开课进入开课页面
   */
  createClass: function(e) {
    var self = this
    var temp = {
      beginIndex: +e.currentTarget.dataset.index,
      roomIndex: self.data.roomIndex,
      date: self.data.year[self.data.dateIndex] + self.data.dateArray[self.data.dateIndex]
    }
    wx.navigateTo({
      url: '/pages/createClass/createClass?info=' + JSON.stringify(temp),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    //计算筛选器里的日期
    var date = new Date()
    self.data.dateArray = []
    for (let i = 0; i < 7; i++) {
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
      self.data.year.push(date.getFullYear() + '-')
    }
    self.setData({
      dateArray: self.data.dateArray,
      year: self.data.year
    })
    api.getRooms(function(res) {
      if (res.data.error) {
        wx.showToast({
          title: '获取教室失败下拉刷新',
          icon: 'none'
        })
      } else {
        var temp = res.data.data
        self.data.roomArray = []
        temp.forEach((item) => {
          self.data.roomArray.push(item.name + item.location)
        })
        self.setData({
          rooms: temp,
          roomArray: self.data.roomArray
        })
        app.globalData.rooms = temp
        console.log('教室', res.data)
      }
    })
    //判断是否登录
    var currentPage = getCurrentPages()[getCurrentPages().length - 1].route
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/login/login?page=' + currentPage
      })
    } else {
      api.getClasses(function (res) {
        if (res.data.error) {
          wx.showToast({
            title: '获取失败下拉刷新',
            icon: 'none'
          })
        } else {
          self.setData({
            classes: res.data.data
          })
          self.data.classesSomeDay = self.data.classes.filter((item) => item.reportUntil.indexOf(self.data.dateArray[self.data.dateIndex]) !== -1 && item.room.id === self.data.rooms[self.data.roomIndex].id)
          self.setData({
            classesSomeDay: self.data.classesSomeDay
          })
          console.log(res.data)
        }
      }, function (err) {
        wx.showToast({
          title: '获取失败下拉刷新',
          icon: 'none'
        })
      })
    }
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
    api.getRooms(function (res) {
      if (res.data.error) {
        wx.showToast({
          title: '获取教室失败下拉刷新',
          icon: 'none'
        })
      } else {
        self.data.roomArray = []
        res.data.data.forEach((item) => {
          self.data.roomArray.push(item.name + item.location)
        })
        self.setData({
          rooms: res.data.data,
          roomArray: self.data.roomArray
        })
        console.log('教室', res.data)
      }
    })
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/login/login?page=' + currentPage
      })
    } else {
      api.getClasses(function (res) {
        if (res.data.error) {
          wx.showToast({
            title: '获取失败下拉刷新',
            icon: 'none'
          })
        } else {
          self.setData({
            classes: res.data.data
          })
          self.data.classesSomeDay = self.data.classes.filter((item) => item.reportUntil.indexOf(self.data.dateArray[self.data.dateIndex]) !== -1 && item.room.id === self.data.rooms[self.data.roomIndex].id)
          self.setData({
            classesSomeDay: self.data.classesSomeDay
          })
          console.log(res.data)
        }
      }, function (err) {
        wx.showToast({
          title: '获取失败下拉刷新',
          icon: 'none'
        })
      })
    }
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