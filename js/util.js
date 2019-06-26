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

  window.util = {
    isEsc: isEscEvent,
    isEnter: isEnterEvent
  };
})();
