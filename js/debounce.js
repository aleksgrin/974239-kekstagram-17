'use strict';

(function () {
  var DELAY = 500;

  var lastTimeout;
  function setDebounce(action) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action, DELAY);
  }

  window.debounce = {
    set: setDebounce
  };

})();
