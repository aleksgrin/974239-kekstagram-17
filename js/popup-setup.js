'use strict';
(function () {
  var uploadFormELement = document.querySelector('.img-upload__overlay');
  var uploadInputElement = document.querySelector('#upload-file');
  var uploadFormCancelElement = document.querySelector('#upload-cancel');
  var uploadSubmitButtonElement = document.querySelector('.img-upload__submit');
  var uploadPhotoCommentElement = document.querySelector('.text__description');

  function onPopupEscKeydown(evt) {
    if (window.util.isEsc(evt)) {
      closePopup();
    }
  }

  function onUploadSubmitButtonClick(evt) {
    evt.preventDefault();
    closePopup();
  }

  function onPhotoCommentFocus() {
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  function onPhotoCommentBlur() {
    document.addEventListener('keydown', onPopupEscKeydown);
  }

  function closePopup() {
    setFormInputResetState();
    uploadFormELement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscKeydown);
    uploadSubmitButtonElement.removeEventListener('click', onUploadSubmitButtonClick);
    uploadPhotoCommentElement.addEventListener('focus', onPhotoCommentFocus);
    uploadPhotoCommentElement.addEventListener('blur', onPhotoCommentBlur);
    window.preview.destroy();
  }

  function setFormInputResetState() {
    uploadInputElement.value = '';
  }

  function open() {
    uploadFormELement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscKeydown);
    uploadSubmitButtonElement.addEventListener('click', onUploadSubmitButtonClick);
    uploadPhotoCommentElement.addEventListener('focus', onPhotoCommentFocus);
    uploadPhotoCommentElement.addEventListener('blur', onPhotoCommentBlur);
    window.preview.init();
    window.preview.default();
  }

  uploadFormCancelElement.addEventListener('click', function () {
    closePopup();
  });

  window.popupSetup = {
    open: open
  };
})();
