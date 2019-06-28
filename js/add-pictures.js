'use strict';
(function () {
  var AMOUNT = 25;

  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  function createPicturesDOM(image) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = image.url;
    picture.querySelector('.picture__comments').textContent = image.comments.length;
    picture.querySelector('.picture__likes').textContent = image.likes;

    return picture;
  }

  function insertFragment() {
    picturesElement.appendChild(fragment);
  }

  for (var i = 0; i < AMOUNT; i++) {
    fragment.appendChild(createPicturesDOM(window.data.get[i]));
  }

  window.addPictures = {
    render: insertFragment
  };
})();
