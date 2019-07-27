'use strict';
(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  function onPopupEscKeydown(evt) {
    if (window.util.isEsc(evt)) {
      window.popupSetup.close();
    }
  }

  function init() {
    document.addEventListener('keydown', onPopupEscKeydown);
  }

  function destroy() {
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

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
    initEsc: init,
    destroyEsc: destroy,
    isEsc: isEscEvent,
    isEnter: isEnterEvent,
    getRandom: getRandomIntegerFromInterval
  };
})();
