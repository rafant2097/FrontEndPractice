$(document).ready(function() {
  var ttt = new myPattern();
  ttt.init();
}); 

var myPattern = (function() {
  const mySelectors = {};
  const myEv = {};

  function getValues() {
    return [{
        startHour: '8:00',
        endHour: '11:00',
        dateStart: 'Friday',
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

    t[0] = t[0] - 1;
    t[1] = +t[1] + 30;
    return t.join().replace(',', '');
  }

  function getAllSpaces(startHour, endHour) {
    var validStartHour = parseStartHour(startHour);
    var validEndHour = parseEndHour(endHour);

    var counter = getTotalHours(startHour, validEndHour);
    return getArrHours(counter, validStartHour, startHour, validEndHour);
  }

  function getArrHours(counter, validStartHour, startHour, validEndHour) {
    var arr = [];
    var flag = false;
    counter = counter - 2;

    var startHourValidUnparsed = startHour.split(':');

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

    return arr;
  }

  function getTotalHours(startHour, validEndHour) {
    var startHourValidUnparsed = startHour.split(':');

    if (startHourValidUnparsed[1] === "30") {
      startHourValidUnparsed[1] = "50";
    }

    var startHourValid = startHourValidUnparsed.join().replace(',', '');
    var counter = 1;

    while (startHourValid <= validEndHour) {
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