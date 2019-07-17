'use strict';

(function () {
  var BASE_COMMETS_AMOUNT = 5;
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
  var bigPictureLikesCountElement = bigPictureElement.querySelector('.likes-count');
  var bigPictureCommentsCountElement = bigPictureElement.querySelector('.comments-count');
  var bigPictureSocialCaptionElement = bigPictureElement.querySelector('.social__caption');
  var bigPictureSocialCommentsElement = bigPictureElement.querySelector('.social__comments');
  var bigPictureSocialCommentsCountElement = bigPictureElement.querySelector('.social__comment-count');
  var bigPictureCommentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
  var body = document.querySelector('body');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

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
    for (var i = 0; i < BASE_COMMETS_AMOUNT; i++) {
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

  function closePopup() {
    bigPictureElement.classList.add('hidden');
    bigPictureCancel.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', onPopupEscKeydown);
    body.classList.remove('modal-open');
    bigPictureSocialCommentsElement.innerHTML = '';
  }

  function onPopupEscKeydown(evt) {
    if (window.util.isEsc(evt)) {
      closePopup();
    }
  }

  function show(photo) {
    bigPictureElement.classList.remove('hidden');
    bigPictureCancel.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscKeydown);
    body.classList.add('modal-open');
    renderInfo(photo);
    insertCommetsElements(photo);
    bigPictureCommentsLoaderElement.addEventListener('click');
  }

  bigPictureSocialCommentsCountElement.classList.add('visually-hidden');
  // bigPictureCommentsLoaderElement.classList.add('visually-hidden');

  window.bigPicture = {
    show: show
  };
})();
