'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');

  function createPicturesDOM(image) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = image.url;
    picture.querySelector('.picture__comments').textContent = image.comments.length;
    picture.querySelector('.picture__likes').textContent = image.likes;

    return picture;
  }

  function render(photos) {
    var fragment = document.createDocumentFragment();
    var picture = null;

    photos.forEach(function (item) {
      picture = createPicturesDOM(item);
      fragment.appendChild(picture);
      picture.addEventListener('click', function () {
        window.bigPicture.show(item);
      });
    });

    picturesElement.appendChild(fragment);
  }

  window.gallery = {
    render: render
  };
})();
