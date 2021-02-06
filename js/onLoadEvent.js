function addLoadEvent(func) {
  let oldonload = window.onload;
  //如果还没有绑定任何函数，就像平时那样把函数添加给它
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    //否则在后面追加它
    window.onload = function () {
      oldonload();
      func();
    }
  }
}

function isPCScreen() {
  let result = window.innerWidth;
  if (result < 500) {
    let target = document.getElementById("mainContain");
    removeClass(target, "mainContainCss");
  }
}

function NowDateFormate(date, type) {
  let nowdate = new Date(date);
  let ret;
  const opt = {
    "Y+": nowdate.getFullYear().toString(),        // 年
    "m+": (nowdate.getMonth() + 1).toString(),     // 月
    "d+": nowdate.getDate().toString(),            // 日
    "H+": nowdate.getHours().toString(),           // 时
    "M+": nowdate.getMinutes().toString(),         // 分
    "S+": nowdate.getSeconds().toString()          // 秒
  };
  for (let k in opt) {
    ret = new RegExp(k).exec(type);
    if (ret) {
      type = type.replace(ret[0], (ret[0].length == 1 ? opt[k] : opt[k].padStart(ret[0].length, "0")));
    }
  }
  return type;
  console.log("时间格式化:", type);
}

//判断闰年
function isLeapYear(date) {
  let year = date.getFullYear();
  let a = year % 4;//0：能被4整除
  let b = year % 100;// 0：能被100整除
  let c = year % 400;//0：能被400整除
  if ((!a && b) || !c) {
    return true;
  } else {
    return false;
  }
}

//确定月的天数
function determineDaysOfMonth(date) {
  let month = date.getMonth();
  let arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(date)) {
    arr[1] = 29;
  }
  return arr[month];
}

var nowdate = (new Date()).getTime();
addLoadEvent(isPCScreen);
drawCalendarHeadYear(nowdate);

function hhmmss(){
  let date = new Date();
  let current = NowDateFormate(date,'HH:MM:SS');
  let calFootRight = document.getElementsByClassName('cal-foot-right');
  let children = calFootRight[0].children;
  children[0].innerText = '时间：'+current;
  setTimeout(hhmmss,1000);
}

//画出日历表格头部的年份
function drawCalendarHeadYear(date) {
  let year = (new Date(date)).getFullYear();
  let month = (new Date(date)).getMonth() + 1;
  let current = NowDateFormate(date,'YYYY-mm-dd');
  let calFootLeft = document.getElementsByClassName('cal-foot-left');
  let children = calFootLeft[0].children;
  children[0].innerText = '今天：'+current;
  //时分秒电子表
  hhmmss(); 
  let calendarYear = document.getElementById('calendarYear');
  calendarYear.setAttribute('title-data', year + "-" + month + "-1")
  let txt = document.createTextNode(year + '年' + month + "月");
  calendarYear.appendChild(txt);
  drawCalendarMonths(nowdate);
  drawCalendarWeeks();
  drawCalendarDays();
}
//画出日历表格年份范围
function drawCalendarYears() {
  let para = document.getElementById('calendarYear');
  let yearRangeArr = (para.innerText).split('~');
  let beginYear = parseInt(yearRangeArr[0]);
  let arr = [beginYear - 3, beginYear - 2, beginYear - 1, beginYear];
  for (let i = 1; i <= 12; i++) {
    arr[i + 3] = beginYear + i;
  }
  let dbody = document.getElementsByClassName('cell-years');
  let years = dbody[0].children;
  let length = years.length;
  if (length > 0) {
    dbody[0].innerHTML = "";
  }
  for (let w = 0; w < 16; w++) {
    let para = document.createElement('div');;
    if (w < 3) {
      para.setAttribute('class', 'year cell-year-prev');
    } else if (w > 13) {
      para.setAttribute('class', 'year cell-year-next');
    } else {
      para.setAttribute('class', 'year');
    }
    //判断是否为当前年
    let curYear = new Date().getFullYear();
    if (curYear == arr[w]) {
      para.setAttribute('class', 'year cell-year-current');
    }
    let ss = document.createElement('span');
    ss.setAttribute('cell-data', arr[w] + '-1-1');
    ss.innerText = arr[w];
    para.appendChild(ss);
    dbody[0].appendChild(para);
  }
}
//画出年下月份
function drawCalendarMonths(date) {
  let year = (new Date(date)).getFullYear();
  let arr = initailYearMonthArr(year);
  let brr = initailMonthArr(year);
  let dbody = document.getElementsByClassName('cell-months');
  let months = dbody[0].children;
  let length = months.length;
  if (length > 0) {
    dbody[0].innerHTML = "";
  }
  for (let i = 0; i < 16; i++) {
    let para = document.createElement('div');
    if (i == 0 || i == 1) {
      para.setAttribute('class', 'month cell-month-prev');
    } else if (i == 14 || i == 15) {
      para.setAttribute('class', 'month cell-month-next');
    } else {
      para.setAttribute('class', 'month');
    }
    //判断是否为当前年月
    let curYear = new Date().getFullYear();
    if (curYear == year) {
      let month = (new Date(date)).getMonth() + 1;
      if ((i - 1) == month) {
        para.setAttribute('class', 'month cell-month-current');
      }
    }
    let ss = document.createElement('span');
    ss.setAttribute('cell-data', arr[i]);
    ss.innerText = brr[i];
    para.appendChild(ss);
    dbody[0].appendChild(para);
  }
}
//画出月下日期表头
function drawCalendarWeeks() {
  let weeks = new Array("星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日");
  let dbody = document.getElementsByClassName('cell-weeks');
  let weekendFlag = 0;
  for (let m = 0; m < weeks.length; m++, weekendFlag++) {
    let para = document.createElement('div');
    para.setAttribute('class', 'week');
    let ss = document.createElement('span');
    ss.innerText = weeks[m];
    para.appendChild(ss);
    dbody[0].appendChild(para);
  }

}
//画出日期
function drawCalendarDays() {
  let para = document.getElementById('calendarYear').getAttribute("title-data");
  let dateTime = new Date(para);
  let days = determineDaysOfMonth(dateTime);
  //这个月一号是星期几
  let yy = dateTime.getFullYear();
  let mm = dateTime.getMonth() + 1;
  let beginDay;
  if (dateTime.getDay()) {
    beginDay = dateTime.getDay()
  } else {
    beginDay = 7;
  }
  let prevDays = [];
  let prevMonthDays = determineDaysOfMonth(new Date(yy + "-" + mm - 1 + "-" + "1"));
  for (let i = beginDay - 1, j = 0; i > 0; i--, j++) {
    prevDays[j] = prevMonthDays - j;
  }
  let nextDays = [];
  let nextLength = 42 - (prevDays.length + days);
  for (let l = 0; l < nextLength; l++) {
    nextDays[l] = l + 1;
  }
  let dbody = document.getElementsByClassName('cell-days');
  let weekendFlag = 0;
  let dayArr = dbody[0].children;
  let length = dayArr.length;
  if (length > 0) {
    dbody[0].innerHTML = "";
  }
  for (let m = prevDays.length -1 ; m >= 0  ; m--, weekendFlag++) {
    let para = document.createElement('div');
    para.setAttribute('class', 'day cell-day-prev');
    let ss = document.createElement('span');
    ss.setAttribute('cell-data', yy + "-" + mm + "-" + prevDays[m]);
    ss.innerText = prevDays[m];
    if (weekendFlag % 7 == 5 || weekendFlag % 7 == 6)
      para.setAttribute('class', 'day cell-day-weekends cell-day-prev');
    para.appendChild(ss);
    dbody[0].appendChild(para);
  }
  for (let m = 1; m <= days; m++, weekendFlag++) {
    let para = document.createElement('div');
    para.setAttribute('class', 'day');
    let ss = document.createElement('span');
    ss.setAttribute('cell-data', yy + "-" + mm + "-" + m);
    ss.innerText = m;
    if (weekendFlag % 7 == 5 || weekendFlag % 7 == 6)
      para.setAttribute('class', 'day cell-day-weekends');
    para.appendChild(ss);
    dbody[0].appendChild(para);
  }
  for (let m = 0; m < nextDays.length; m++, weekendFlag++) {
    let para = document.createElement('div');
    para.setAttribute('class', 'day cell-day-next');
    let ss = document.createElement('span');
    if (mm == 12) {
      ss.setAttribute('cell-data', (yy + 1) + "-1-" + nextDays[m]);
    } else {
      ss.setAttribute('cell-data', yy + "-" + (mm + 1) + "-" + nextDays[m]);
    }

    ss.innerText = nextDays[m];
    if (weekendFlag % 7 == 5 || weekendFlag % 7 == 6)
      para.setAttribute('class', 'day cell-day-weekends cell-day-next');
    para.appendChild(ss);
    dbody[0].appendChild(para);
  }
}
//初始化年月日数组
function initailYearMonthArr(year) {
  let arr = [(year - 1).toString() + "-11-1", (year - 1).toString() + "-12-1"];
  for (let i = 1; i <= 12; i++) {
    arr[i + 1] = year + "-" + i + "-1";
  }
  arr[14] = (year + 1).toString() + "-1-1";
  arr[15] = (year + 1).toString() + "-2-1";
  return arr;
}
function initailMonthArr(year) {
  let brr = ["11", "12"];
  for (let i = 1; i <= 12; i++) {
    brr[i + 1] = year + "-" + i
  }
  brr[14] = "1";
  brr[15] = "2";
  return brr;
}

