'use strict';
(function () {

  function getRandomIntegerFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  window.randomNumber = {
    get: getRandomIntegerFromInterval
  };
})();
