// pages/components/detail/detail.js
const api = require('../../../utils/api.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: api.serverDomain
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close: function() {
      this.triggerEvent('close', {
        display: 'none'
      }, {})
    }
  }
})