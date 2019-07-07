'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
  var bigPictureLikesCountElement = bigPictureElement.querySelector('.likes-count');
  var bigPictureCommentsCountElement = bigPictureElement.querySelector('.comments-count');
  var bigPictureSocialCaptionElement = bigPictureElement.querySelector('.social__caption');
  var bigPictureSocialCommentsElement = bigPictureElement.querySelector('.social__comments');
  var bigPictureSocialCommentsCountElement = bigPictureElement.querySelector('.social__comment-count');
  var bigPictureCommentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
  var picturesElement = document.querySelector('.pictures');

  function renderCommentElement(comment) {
    var li = document.createElement('li');
    var img = document.createElement('img');
    var p = document.createElement('p');

    li.classList.add('social__comment');
    img.classList.add('social__picture');
    p.classList.add('social__text');

    img.width = '35';
    img.height = '35';
    img.alt = '' + comment.name;
    img.src = '' + comment.avatar;

    p.textContent = '' + comment.message;

    li.appendChild(img);
    li.appendChild(p);

    return li;
  }

  function insertCommetsElements(element) {
    for (var i = 0; i < element.comments.length; i++) {
      bigPictureSocialCommentsElement.appendChild(renderCommentElement(element.comments[i]));
    }
  }

  function renderInfo(element) {
    bigPictureImgElement.src = element.url;
    bigPictureLikesCountElement.textContent = element.likes;
    bigPictureCommentsCountElement.textContent = element.comments.length;
    bigPictureSocialCaptionElement.textContent = element.description;
  }

  function init(photos) {
    function openPopup() {
      bigPictureElement.classList.remove('hidden');
      renderInfo(photos[0]);
      insertCommetsElements(photos[0]);
    }

    picturesElement.addEventListener('click', openPopup);
  }

  bigPictureSocialCommentsCountElement.classList.add('visually-hidden');
  bigPictureCommentsLoaderElement.classList.add('visually-hidden');

  window.bigPicture = {
    init: init
  };
})();
