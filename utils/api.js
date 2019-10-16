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

  ////////////////////
  ///获取全部有效设备//
  ////////////////////
  getValidEquipment: function (success, fail) {
    this.request({
      url: '/information/equipment/all/valid',
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
  //查看自己的选课信息//
  ////////////////////
  getSelfClasses: function (success, fail) {
    this.request({
      url: '/report/self',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  ////////登出////////
  ////////////////////
  logout: function (success, fail) {
    this.request({
      url: '/user/logout',
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  ///获取全部有效通知//
  ////////////////////
  getValidNotice: function (success, fail) {
    this.request({
      url: '/information/notice/all/valid',
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
  ///查看全部可选实验///
  ////////////////////
  getClasses: function (success, fail) {
    this.request({
      url: '/experiment/accessible',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  //查看自己开设的实验//
  ////////////////////
  getClassesTeacher: function (success, fail) {
    this.request({
      url: '/experiment/self',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  //////开始签到///////
  ////////////////////
  startSignIn: function (id, longitude, latitude, success, fail) {
    this.request({
      url: '/experiment/start/' + id,
      method: 'PUT',
      data: {
        longitude: longitude,
        latitude: latitude
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  //////新建实验///////
  ////////////////////
  createClass: function (info, success, fail) {
    this.request({
      url: '/experiment/new',
      method: 'POST',
      data: {
        name: info.name,
        instruction: info.instruction,
        teacher_name: info.teacherName,
        accessible_until: info.accessibleUntil,
        report_until: info.reportUntil,
        max_student_number: info.maxStudentNumber,
        begin_time: info.beginTime,
        stop_time: info.stopTime,
        room_id: info.roomId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  ////查看人员介绍/////
  ////////////////////
  getPeopleIntroduction: function (success, fail) {
    this.request({
      url: '/information/humanity/',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  //////查看图片///////
  ////////////////////
  getPhotos: function (success, fail) {
    this.request({
      url: '/information/photo/',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  //////查看教室///////
  ////////////////////
  getRooms: function (success, fail) {
    this.request({
      url: '/room/all',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  //查看设备预约情况///
  ////////////////////
  getDeviceAppointed: function (id, success, fail) {
    this.request({
      url: '/equipment/reservationRecord/equipment/' + id,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
      },
      success: success,
      fail: fail
    })
  },

  /////////////////////
  //查看自己设备预约情况/
  /////////////////////
  getSelfDevices: function (id, success, fail) {
    this.request({
      url: '/equipment/reservationRecord/' + id,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  //////预约设备//////
  ////////////////////
  appointDevice: function (obj,success, fail) {
    this.request({
      url: '/equipment/reservationRecord',
      method: 'post',
      data: {
        equipmentId: obj.equipmentId,
        userId: obj.userId,
        reverseTime: obj.reverseTime,
        reserveDuration: obj.reserveDuration
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  ////////退课////////
  ////////////////////
  dropClass: function (id, success, fail) {
    this.request({
      url: '/report/delete/' + id,
      method: 'DELETE',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  ///////签到/////////
  ////////////////////
  signIn: function (id, longitude, latitude, success, fail) {
    this.request({
      url: '/report/sign/' + id,
      method: 'PUT',
      data: {
        longitude: longitude,
        latitude: latitude
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  ///////取消开课/////
  ////////////////////
  cancelClass: function (id, success, fail) {
    this.request({
      url: '/experiment/delete/' + id,
      method: 'DELETE',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  ////取消预约设备/////
  ////////////////////
  cancelAppoint: function (recordId, userId, success, fail) {
    this.request({
      url: '/equipment/reservationRecord',
      method: 'DELETE',
      data: {
        recordId: recordId,
        userId: userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  //////修改密码///////
  ////////////////////
  changePassword: function (info, success, fail) {
    this.request({
      url: '/user/password',
      method: 'PUT',
      data: {
        old_password: info.oldPassword,
        new_password: info.newPassword
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },

  /////////////////////
  //查看某个实验选课信息/
  /////////////////////
  viewStudents: function (id, success, fail) {
    this.request({
      url: '/report/experiment/' + id,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },

  ////////////////////
  ////教师协助签到/////
  ////////////////////
  helpSignIn: function (id, success, fail) {
    this.request({
      url: '/report/help/sign/' + id,
      method: 'PUT',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      success: success,
      fail: fail
    })
  },
}

module.exports = api