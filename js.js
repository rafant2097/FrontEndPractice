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
        endHour: '9:00',
        dateStart: 'Monday',
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

    var counter = getArrayDays(startHour, validEndHour);
  }

  function getArrayDays(startHour, validEndHour) {
    debugger
    var t = startHour.split(':');
    if (t[1] === "30") {
      t[1] = "50";
    }

    var y = t.join().replace(',', '');
    var counter = 1;

    while (y <= validEndHour) {
      y = +y + 50
      counter++ 
    }
    
    return counter;
  }

  function init() {
    const values = getValues();

    values.forEach(function(currentRoomObj) {

      getAllSpaces(currentRoomObj.startHour, currentRoomObj.endHour);
    })

  }

  function collectSelectors() {
  }

  function bindEvents() {
  }

  return {
    init: init
  }
});