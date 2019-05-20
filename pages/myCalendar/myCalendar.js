const app = getApp();
Page({
  data: {
    getMyPlanListUrl:'/calendar/getplanlist',
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    //全部计划数组
    planList: [{
      planId: 1,
      userId: 1,
      planName: 'test1',
      groupName: 'guomz',
      planDetail: 'plan1',
      planDate: '2019-4-10',
      planTime: '9:00'
    },
    {
      planId: 2,
      userId: 1,
      planName: 'test2',
      groupName: 'guomz',
      planDetail: 'plan2',
      planDate: '2019-4-12',
      planTime: '9:00'
    },
    {
      planId: 3,
      userId: 1,
      planName: 'test3',
      groupName: 'guomz',
      planDetail: 'plan3',
      planDate: '2019-4-15',
      planTime: '9:00'
    }

    ],
    todayPlanList:[],
    hasPlan: false,
    userId:null
  },
  onLoad: function () {
    this.setData({
      userId:app.globalData.userId
    });
  },

  onShow: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + this.data.getMyPlanListUrl,
      data: {
        userId: this.data.userId
      },
      success: function (res) {
        if (res.data.success) {
          if (res.data.planList) {
            that.setData({
              planList: res.data.planList
            });
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            that.dateInit();
            that.setData({
              year: year,
              month: month,
              isToday: '' + year + '-' + month + '-' + now.getDate()
            });

            //将今日变为选中状态
            var dateArr = that.data.dateArr;
            for (var i = 0; i < dateArr.length; i++) {
              if (dateArr[i].isToday == that.data.isToday) {
                dateArr[i].isTap = true;
              }
            }
            //判断今日是否有计划
            for (var i = 0; i < that.data.planList.length; i++) {
              if (that.data.planList[i].planDate == that.data.isToday) {
                that.setData({
                  hasPlan: true
                });
                var todayPlanList = [];
                for (var j = i; j < that.data.planList.length; j++) {
                  if (that.data.planList[j].planDate == that.data.isToday) {
                    todayPlanList.push(that.data.planList[j]);
                  }
                }
                that.setData({
                  todayPlanList: todayPlanList
                });
                break;
              }
              else {
                that.setData({
                  hasPlan: false
                });
              }
            }
            that.setData({
              dateArr: dateArr
            });
          }
        }
      }
    });
  },


  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    //对比计划数组
    arrLen = startWeek + dayNums;
    var planList = this.data.planList;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + '-' + (month + 1) + '-' + num,
          dateNum: num,
          weight: 5,
          isTap: false,
          hasPlan: false
        };
        for (var j = 0; j < planList.length; j++) {
          if (obj.isToday == planList[j].planDate) {
            obj.hasPlan = true;
          }
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  /**
   * 点击上一个月箭头
   */
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  /**
   * 点击下一个月箭头
   */
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },

  /**
   * 当用户选中某一日期时触发点击事件
   */
  onTap: function (e) {
    //消除之前的选中状态
    var dateArr = this.data.dateArr;
    for (var i = 0; i < dateArr.length; i++) {
      dateArr[i].isTap = false;
    }
    //消除计划状态
    this.setData({
      hasPlan: false
    });
    //为选中的日期添加状态
    for (var i = 0; i < dateArr.length; i++) {
      if (dateArr[i].isToday == e.currentTarget.dataset.date) {
        dateArr[i].isTap = true;
      }
    }
    //更改当前日期
    this.setData({
      isToday: e.currentTarget.dataset.date
    });
    //检查选中的日期是否有计划
    for (var i = 0; i < this.data.planList.length; i++) {
      if (e.currentTarget.dataset.date == this.data.planList[i].planDate) {
        this.setData({
          hasPlan: true
        });
        var todayPlanList = [];
        for (var j = i; j < this.data.planList.length; j++) {
          if (this.data.planList[j].planDate == e.currentTarget.dataset.date) {
            todayPlanList.push(this.data.planList[j]);
          }
        }
        this.setData({
          todayPlanList: todayPlanList
        });
        break;
      }
    }
    this.setData({
      dateArr: dateArr
    });
  }
})