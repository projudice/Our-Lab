// pages/info/info.js
const api = require('../../utils/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labInfo: {},                             //实验室信息
    peopleIntroduction: {},                  //人员信息
    notice: [],                              //公告
    info: {},                                //上述信息的具体信息
    display: 'none',
    photos: [],
    url: api.serverDomain                    //用于拼接图片src
  },

  /**
   * 点击查看各信息的具体信息
   */
  viewDetails: function(e) {
    this.setData({
      info: e.currentTarget.dataset.value,
      display: 'block'
    })
  },

  /**
   * 关闭具体信息
   */
  closeEvent: function(e) {
    this.setData({
      display: e.detail.display
    })
  },

  /**
   * 打开设备信息文件
   */
  viewDevices: function () {
    wx.showLoading({
      title: '文件加载中',
    })
    var self = this
    wx.downloadFile({
      url: api.serverDomain + self.data.labInfo.fileSrc,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          fileType: 'docx' || 'pdf' || 'doc',
          success: function (res) {
            wx.hideLoading()
          },fail(){
            wx.hideLoading()
            wx.showToast({
              title: '文件打开失败',
              icon: 'none'
            })
          }
        })
      },fail(){
        wx.hideLoading()
        wx.showToast({
          title: '文件加载失败',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    api.getPhotos(function(res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        self.setData({
          photos: res.data.data
        })
        console.log('图片', res.data)
      }
    }, function(err) {
      wx.showToast({
        title: '获取图片失败刷新重试',
        icon: 'none'
      })
    })
    api.getValidNotice(function(res) {
      if (res.data.error) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        self.setData({
          notice: res.data.data
        })
        console.log('通知', res.data)
      }
    }, function(err) {
      wx.showToast({
        title: '获取公告失败刷新重试',
        icon: 'none'
      })
    })
    api.getInfo(function(res) {
      if (res.data.error) {
        self.setData({
          introduction: '无介绍'
        })
      } else {
        self.setData({
          labInfo: res.data.data
        })
        console.log('实验室信息', res.data)
      }
    }, function(err) {
      self.setData({
        introduction: '获取信息失败，请下拉刷新'
      })
    })
    api.getPeopleIntroduction(function(res) {
      self.setData({
        peopleIntroduction: res.data.data
      })
      console.log('人员介绍', res.data)
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