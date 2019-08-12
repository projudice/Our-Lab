// pages/class/class.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classes: [{
      id: '1',
      className: '水温测量纷飞的空军第九',
      teacherName: '刘德华',
      time: '8:00-9:00',
      url: 'https://www.onlinemeet.cn/backend/download_instruction'
    }, {
      id: '2',
      className: '风力测量',
      teacherName: '周杰伦',
      time: '9:15-10:15',
      url: 'https://www.onlinemeet.cn/backend/download_instruction'
    }, {
      id: '3',
      className: '水温测量',
      teacherName: '刘德华',
      time: '8:00-9:00',
      url: 'https://www.onlinemeet.cn/backend/download_instruction'
    }, {
      id: '4',
      className: '水温测量',
      teacherName: '刘德华',
      time: '8:00-9:00',
      url: 'https://www.onlinemeet.cn/backend/download_instruction'
    }, {
      id: '5',
      className: '水温测量',
      teacherName: '刘德华',
      time: '8:00-9:00',
      url: 'https://www.onlinemeet.cn/backend/download_instruction'
    }],
    index: 0,

  },

  appoint: function(e) {
    var self = this
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '确定预约此实验课？',
      content: `${self.data.classes[index].className}-${self.data.classes[index].teacherName}  ${self.data.classes[index].time}`,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  details: function(e) {
    var self = this
    var index = e.currentTarget.dataset.index
    console.log('detail', index)
    // wx.showLoading({
    //   title: '正在打开',
    // })
    // wx.downloadFile({
    //   url: self.data.classes[index].url,
    //   success(res) {
    //     console.log('success')
    //     wx.openDocument({
    //       filePath: res.tempFilePath,
    //       fileType: 'pdf',
    //       success: function() {
    //         wx.hideLoading()
    //       }
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var currentPage = getCurrentPages()[getCurrentPages().length - 1].route
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/login/login?page=' + currentPage,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
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