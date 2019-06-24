'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KeyCode.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KeyCode.ENTER) {
        action();
      }
    }
  };
})();
