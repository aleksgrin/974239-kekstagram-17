'use strict';
(function () {

  function getPhotosArray(number) {
    var photo;
    photo = {
      url: 'photos/' + (number + 1) + '.jpg',
      likes: window.randomNumber.get(15, 200),
      comments: window.commentsArray.get(window.randomNumber.get(1, 5))
    };

    return photo;
  }

  window.generateObjects = {
    get: getPhotosArray
  };
})();
