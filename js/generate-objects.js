'use strict';
(function () {

  function getPhotosArray(number) {
    var photo;
    photo = {
      url: 'photos/' + (number + 1) + '.jpg',
      likes: window.util.getRandom(15, 200),
      comments: window.commentsArray.get(window.util.getRandom(1, 5))
    };

    return photo;
  }

  window.generateObjects = {
    get: getPhotosArray
  };
})();
