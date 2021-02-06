function cellClickEvent(){
  determineYMD();
  determineYM();
  determineY();
}
cellClickEvent();

/*星期及日期页面的点击时间,yyyy-mm-dd*/
function determineYMD(){
  let dayArr = document.getElementsByClassName('day');
  for(let i = 0;i<dayArr.length;i++){
    dayArr[i].addEventListener('click',function(e){
      let value = e.target.attributes["cell-data"].nodeValue;
      alert("选择时间:"+value);
      cellClickEvent();
    });
  }
}

/*选择月份，根据月份跳转日期页面*/
function determineYM(){
  let dayArr = document.getElementsByClassName('month');
  for(let i = 0;i<dayArr.length;i++){
    dayArr[i].addEventListener('click',function(e){
      let value = e.target.attributes["cell-data"].nodeValue;
      let newTime =new Date(value);
      let title = document.getElementById('calendarYear');
      title.setAttribute("title-data", value);
      title.innerText = newTime.getFullYear()+'年'+(newTime.getMonth()+1)+'月';
      switchHeadHiddenClass('cell-weeks');
      let cellWeeks = document.getElementsByClassName('cell-days');
      removeClass(cellWeeks[0],'hidden');
      drawCalendarDays(); 
      determineYMD();  
    });
  }
}
/*选择年份，根据年份跳转月份范围页面*/
function determineY(){
  let dayArr = document.getElementsByClassName('year');
  for(let i = 0;i<dayArr.length;i++){
    dayArr[i].addEventListener('click',function(e){
      let value = e.target.attributes["cell-data"].nodeValue;
      let newTime =new Date(value);
      let title = document.getElementById('calendarYear');
      title.setAttribute("title-data", value);
      title.innerText = newTime.getFullYear()+'年';
      switchHeadHiddenClass('cell-months');
      drawCalendarMonths(value); 
      determineYM();
    });
  }
}