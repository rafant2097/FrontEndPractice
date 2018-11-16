$(document).ready(function() {
  var ttt = new myPattern();
  ttt.init();
}); 

var myPattern = (function() {
  const mySelectors = {};
  const myEv = {};

  function getValues() {
    return [{
        startHour: '7:30',
        endHour: '11:30',
        dateStart: 'Saturday',
        id: 'id01'
      } 
    ];
  }

  function parseDate(currentDate) {
    switch(currentDate) {
      case 'Monday':
        return 1;

      case 'Tuesday':
        return 2;

      case 'Wednesday':
        return 3;

      case 'Thursday':
        return 4;

      case 'Friday':
        return 5;

      case 'Saturday':
        return 6;
    }
  }

  function parseStartHour(currentHour) {
    return currentHour.replace(':', '');
  }

  function parseEndHour(currentHour) {
    var t = currentHour.split(':');

    if(t[1]==="00"){
      t[1] = +t[1] + 30;
      t[0] = t[0] - 1;
    }
    else
      t[1]=="00"
    return t.join().replace(',', '');
  }

  function getAllSpaces(startHour, endHour) {
    var validStartHour = parseStartHour(startHour);
    var validEndHour = parseEndHour(endHour);

    var temporalStartHour = startHour.split(':');
    var temporalEndHour = endHour.split(':');
    var counter;
    //debugger
    if(+temporalStartHour[0]<+temporalEndHour[0])
      counter = getTotalHours(startHour, endHour);
    else
      counter = getTotalHours(endHour, startHour);
    return getArrHours(counter, validStartHour, startHour, validEndHour);
  }

  function getArrHours(counter, validStartHour, startHour, validEndHour) {
    var arr = [];
    var flag = false;
    counter = counter - 2;
    //debugger
    var startHourValidUnparsed = startHour.split(':');
    validEndHour = validEndHour.replace(':','');

    if (startHourValidUnparsed[1] === "30") {
      flag = true;
    }

    arr.push(validStartHour);

    while (counter > 0) {
      
      if (flag) {
        arr.push((+arr[arr.length-1] + 70).toString());
      } else {
        arr.push((+arr[arr.length-1] + 30).toString());
      }

      flag = !flag;

      counter--;
    }

    arr.push(validEndHour)

    //debugger
    if(validEndHour[validEndHour.length-2]=="3"){
      counter--;
      arr.pop();
    }

    return arr;
  }

  function getTotalHours(startHour, validEndHour) {
    var startHourValidUnparsed = startHour.split(':');

    if (startHourValidUnparsed[1] === "30") {
      startHourValidUnparsed[1] = "50";
    }
    validEndHour = validEndHour.replace(':','');

    var startHourValid = startHourValidUnparsed.join().replace(',', '');
    var counter = 1;
    //debugger
    while (+startHourValid < +validEndHour) {
      startHourValid = +startHourValid + 50
      counter++ 
    }
    
    return counter;
  }

  function init() {
    const values = getValues();

    values.forEach(function(currentRoomObj) {
      var arr = getAllSpaces(currentRoomObj.startHour, currentRoomObj.endHour);
      var parsedDat = parseDate(currentRoomObj.dateStart);
      addNewReservation(arr, parsedDat, currentRoomObj.id);
    })

  }

  function addNewReservation(arrHours, selectedDay, nameRoom) {
    arrHours.forEach(function(currentHour) {
      // debugger
      $('[data-hour="' + currentHour + '"]').find('li').eq(selectedDay).addClass('space-busy')
    });
  }

  function collectSelectors() {
  }

  function bindEvents() {
  }

  return {
    init: init
  }
});

  function isEven(startHour, validEndHour){


   var counter = getArrayDays(startHour, validEndHour);

   if(counter%2==0){

      return true;

   }

   return false;

  }