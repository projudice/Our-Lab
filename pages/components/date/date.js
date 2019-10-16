// pages/components/date/date.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    days: {
      type: Number,
      value: 5
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    time: [],
    index: 0,
    styleList: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseDate: function(e){
      var self = this
      var idx = e.currentTarget.dataset.index
      Object.keys(self.data.styleList).forEach(function (key) {
        self.data.styleList[key] = false;
      })
      self.data.styleList[idx] = true;
      this.setData({
        styleList: self.data.styleList
      })
      var myEventDetail = {
        day: this.data.time[idx].mmdd
      }
      this.triggerEvent('myevent', myEventDetail)
    }
  },

  attached: function(){
    var date = new Date()
    for(var i = 0; i < this.properties.days; i++){
      if(i !== 0){
        date.setDate(date.getDate() + 1)
      }
      let str = ''
      if ((date.getMonth() + 1) > 9){
        str += (date.getMonth() + 1)
        str += '-'
      }else{
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
      let obj = {
        md: `${date.getMonth() + 1}月${date.getDate()}日`,
        mmdd: str
      }
      this.data.time.push(obj)
    }
    this.setData({
      time: this.data.time
    })
  }
})
