// pages/details/details.js
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  openDocument: function() {
    var self = this
    if(self.data.info.url){
      wx.downloadFile({
        url: api.serverDomain + self.data.info.url,
        success(res) {
          wx.openDocument({
            filePath: res.tempFilePath,
            fileType: 'docx' || 'pdf' || 'doc',
            fail: function () {
              wx.showToast({
                title: '打开失败',
                icon: 'none'
              })
            }
          })
        },
        fail(err) {
          wx.showToast({
            title: '下载失败',
            icon: 'none'
          })
        }
      })
    }else{
      wx.showToast({
        title: '教师尚未上传文件',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      info: JSON.parse(options.info)
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