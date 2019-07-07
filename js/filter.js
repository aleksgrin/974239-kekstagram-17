'use strict';

(function () {
  var NEW_PHOTOS_AMOUNT = 10;

  var filterElement = document.querySelector('.img-filters');
  var filterButtonsElement = document.querySelectorAll('.img-filters__button');
  var picturesElement = document.querySelector('.pictures');
  var photosLength = null;

  function removeChildren(container, amount) {
    for (var i = 0; i < amount; i++) {
      container.removeChild(container.lastChild);
    }
  }

  function getRandomIntegerFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function choseNewRandomElementsFromArray(arr, amount) {
    var arrOut = [];
    for (var i = 0; i < amount; i++) {
      var random = getRandomIntegerFromInterval(0, arr.length - 1);
      arrOut[i] = arr[random];
      arr = arr.slice(0, random).concat(arr.slice(random + 1, arr.length));
    }
    return arrOut;
  }

  function sortFunction(left, right) {
    return right.comments.length - left.comments.length;
  }

  function showFilter() {
    filterElement.classList.remove('img-filters--inactive');
  }

  function init(array) {
    function setFilterAction(condition) {
      removeChildren(picturesElement, photosLength);
      switch (condition) {
        case ('filter-popular'):
          photosLength = array.length;
          window.gallery.render(array);
          break;
        case ('filter-new'):
          photosLength = NEW_PHOTOS_AMOUNT;
          window.gallery.render(choseNewRandomElementsFromArray(array, NEW_PHOTOS_AMOUNT));
          break;
        case ('filter-discussed'):
          photosLength = array.length;
          window.gallery.render(array.slice().sort(sortFunction));
          break;
      }
    }

    function onFilterButtonClick(evt) {
      if (evt.target.type.toLowerCase() === 'button') {
        for (var i = 0; i < filterButtonsElement.length; i++) {
          filterButtonsElement[i].classList.remove('img-filters__button--active');
        }
        evt.target.classList.add('img-filters__button--active');
        window.debounce.set(function () {
          setFilterAction(evt.target.id);
        });
      }
    }

    photosLength = array.length;
    filterElement.addEventListener('click', onFilterButtonClick);
  }

  window.filter = {
    show: showFilter,
    init: init
  };
})();
