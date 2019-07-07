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

  function show() {
    bigPictureElement.classList.remove('hidden');
  }

  function insertCommentElement(comment) {
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

    bigPictureSocialCommentsElement.appendChild(li);
  }

  function renderInfo(element) {
    bigPictureImgElement.src = element.url;
    bigPictureLikesCountElement.textContent = element.likes;
    bigPictureCommentsCountElement.textContent = element.comments.length;
    bigPictureSocialCaptionElement.textContent = element.description;
  }

  bigPictureSocialCommentsElement.innerHTML = '';
  bigPictureSocialCommentsCountElement.classList.add('visually-hidden');
  bigPictureCommentsLoaderElement.classList.add('visually-hidden');

  window.bigPicture = {
    show: show,
    render: renderInfo,
    insert: insertCommentElement,
  };
})();
