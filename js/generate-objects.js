'use strict';

(function () {

  window.generateObject = {
    getPhotosArray: function (number) {
      var photo;
      photo = {
        url: 'photos/' + (number + 1) + '.jpg',
        likes: window.getRandom.getRandomIntegerFromInterval(15, 200),
        comments: window.generateComments.getCommentsArray(window.getRandom.getRandomIntegerFromInterval(1, 5))
      };

      return photo;
    }
  };


})();
