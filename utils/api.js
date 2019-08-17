const app = getApp()
var api = {
  serverDomain: 'https://www.onlinemeet.cn/lab',
  requestNum: 0,
  requestSeq: 0, // 请求id
  requestTask: [], // 请求task

/**
   * [request 封装request请求]
   * @param {options}
   *   url: 请求接口url
   *   data: 请求参数
   *   success: 成功回调
   *   fail: 失败回调
   *   complete: 完成回调
   */
request: function(options) {
  var self = this;
  self.requestNum++;
  var req = wx.request({
    url: self.serverDomain + options.url,
    data: options.data,
    method: options.method,
    header: options.header,
    // dataType: 'json',
    success: function (res) {
      if (res.data.code) {
        console.error('服务器请求失败' + ', url=' + options.url + ', params = ' + (options.data ? JSON.stringify(options.data) : '') + ', 错误信息=' + JSON.stringify(res));
        options.fail && options.fail({
          errCode: res.data.code,
          errMsg: res.data.message
        })
        return;
      }
      options.success && options.success(res);
    },
    fail: function (res) {
      console.error('请求失败' + ', url=' + options.url + ', 错误信息=' + JSON.stringify(res));
      options.fail && options.fail(res);
    },
    complete: options.complete || function () {
      self.requestNum--;
      // console.log('complete requestNum: ',requestNum);
    }
  });
  self.requestTask[self.requestSeq++] = req;
  return req;
},

////////////////////
//获取实验室基本信息//
////////////////////
  getInfo: function (success, fail) {
    this.request({
      url: '/information/lab/',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  ////////登录////////
  ////////////////////
  login: function (number, password, success, fail) {
    this.request({
      url: '/user/login',
      method: 'POST',
      data: {
        student_number: number,
        password: password,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  ////////选课////////
  ////////////////////
  chooseClasses: function (id, success, fail) {
    this.request({
      url: '/report/new',
      method: 'POST',
      data: {
        experiment_id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },
}

module.exports = api