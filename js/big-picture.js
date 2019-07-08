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

  function renderCommentElement(comment) {
    var IMG_WIDTH = 35;
    var IMG_HEIGHT = 35;
    var li = document.createElement('li');
    var img = document.createElement('img');
    var p = document.createElement('p');

    li.classList.add('social__comment');
    img.classList.add('social__picture');
    p.classList.add('social__text');

    img.width = '' + IMG_WIDTH;
    img.height = '' + IMG_HEIGHT;
    img.alt = '' + comment.name;
    img.src = '' + comment.avatar;

    p.textContent = '' + comment.message;

    li.appendChild(img);
    li.appendChild(p);

    return li;
  }

  function insertCommetsElements(element) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < element.comments.length; i++) {
      fragment.appendChild(renderCommentElement(element.comments[i]));
    }
    bigPictureSocialCommentsElement.appendChild(fragment);
  }

  function renderInfo(element) {
    bigPictureImgElement.src = element.url;
    bigPictureLikesCountElement.textContent = element.likes;
    bigPictureCommentsCountElement.textContent = element.comments.length;
    bigPictureSocialCaptionElement.textContent = element.description;
  }

  function init(photos) {
    bigPictureElement.classList.remove('hidden');
    bigPictureSocialCommentsElement.innerHTML = '';
    renderInfo(photos[0]);
    insertCommetsElements(photos[0]);
  }

  bigPictureSocialCommentsCountElement.classList.add('visually-hidden');
  bigPictureCommentsLoaderElement.classList.add('visually-hidden');

  window.bigPicture = {
    init: init
  };
})();
