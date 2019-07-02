'use strict';
(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  function isEscEvent(evt) {
    return evt.keyCode === KeyCode.ESC;
  }

  function isEnterEvent(evt) {
    return evt.keyCode === KeyCode.ENTER;
  }

  function getRandomIntegerFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  window.util = {
    isEsc: isEscEvent,
    isEnter: isEnterEvent,
    getRandom: getRandomIntegerFromInterval
  };
})();
