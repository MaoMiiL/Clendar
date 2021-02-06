checkAll();
function checkAll() {
  headLeftTitleClickEvent();
  headBackOffClickEvent();
  headForwardClickEvent();
}

/*1:2021年--5
  2:2021年2月 --7~8
  3:2020-2029年
*/
function headLeftTitleClickEvent() {
  let para = document.getElementById('calendarYear');
  para.onclick = function () {
    let txt = para.innerText;
    if (txt.length == 5) {
      let year = parseInt(txt.substring(0, 4));
      let begin = (Math.floor(year / 10)) * 10;
      let end = (Math.ceil(year / 10)) * 10;
      para.innerText = begin + " ~ " + end;
      switchHeadHiddenClass('cell-years');
      drawCalendarYears();
    } else if (txt.length >= 7 && txt.length <= 8) {
      //2021年2月
      let newTitle = txt.substring(0, 4) + "年";
      para.innerText = newTitle;
      switchHeadHiddenClass('cell-months');
      let titleData = para.getAttribute("title-data");
      let dateTime = new Date(titleData);
      drawCalendarMonths(dateTime);
    } else {
      return false;
    }
    cellClickEvent();
  }
}

function headBackOffClickEvent() {
  let para = document.getElementsByClassName("icon-back-off");
  para[0].onclick = function () {
    let title = document.getElementById('calendarYear');
    let txt = title.innerText;
    if (txt.length == 5) {
      //年份减少
      let year = parseInt(txt.substring(0, 4)) - 1;
      title.innerText = year + '年';
      title.setAttribute("title-data", year + "-1-1");
      drawCalendarMonths(year + "-1-1");
    } else if (txt.length >= 7 && txt.length <= 8) {
      //2021年  2月月份减少
      let titleData = title.getAttribute("title-data");
      let dateTime = new Date(titleData);
      let year = dateTime.getFullYear();
      let month = dateTime.getMonth();
      let newTime = '';
      if (!month) {
        title.innerText = (year - 1) + "年" + "12月"
        title.setAttribute("title-data", year - 1 + "-12-1");
        newTime = year - 1 + "-12-1";
      } else {
        title.innerText = year + "年" + month + "月";
        title.setAttribute("title-data", year + "-" + month + "-1");
        newTime = year + "-" + month + "-1";
      }
      drawCalendarDays(newTime);
    } else {
      //年份范围减少
      let yearsArr = txt.split('~')
      let begin = parseInt(yearsArr[0]) - 10;
      let end = parseInt(yearsArr[1]) - 10;
      title.innerText = begin + ' ~ ' + end;
      drawCalendarYears();
    }
    cellClickEvent();
  };
}

function headForwardClickEvent() {
  let para = document.getElementsByClassName("icon-forward");
  para[0].onclick = function () {
    let title = document.getElementById('calendarYear');
    let txt = title.innerText;
    if (txt.length == 5) {
      let year = parseInt(txt.substring(0, 4)) + 1;
      title.innerText = year + '年';
      title.setAttribute("title-data", year + "-1-1");
      drawCalendarMonths(year + "-1-1");
    } else if (txt.length >= 7 && txt.length <= 8) {
      let dateTime = new Date(title.getAttribute("title-data"));
      let year = dateTime.getFullYear();
      let month = dateTime.getMonth() + 1;
      let newTime = '';
      if (month == 12) {
        year++;
        title.innerText = year + "年" + "1月"
        title.setAttribute("title-data", year + "-1-1");
        newTime = year + "-1-1";
      } else {
        month++;
        title.innerText = year + "年" + month + "月";
        title.setAttribute("title-data", year + "-" + month + "-1");
        newTime = year + "-" + month + "-1";
      }
      drawCalendarDays(newTime);
    } else {
      let yearsArr = txt.split('~')
      let begin = parseInt(yearsArr[0]) + 10;
      let end = parseInt(yearsArr[1]) + 10;
      title.innerText = begin + ' ~ ' + end;
      drawCalendarYears();
    }  
    cellClickEvent();
  };
}