'use strict';
(function () {
  var uploadFormELement = document.querySelector('.img-upload__overlay');
  var uploadInputElement = document.querySelector('#upload-file');
  var uploadFormCancelElement = document.querySelector('#upload-cancel');
  var uploadPhotoCommentElement = document.querySelector('.text__description');

  function onPopupEscKeydown(evt) {
    if (window.util.isEsc(evt)) {
      closePopup();
    }
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
    uploadPhotoCommentElement.addEventListener('focus', onPhotoCommentFocus);
    uploadPhotoCommentElement.addEventListener('blur', onPhotoCommentBlur);
    window.preview.destroy();
    window.form.destroy();
    window.form.default();
  }

  function setFormInputResetState() {
    uploadInputElement.value = '';
  }

  function open() {
    uploadFormELement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscKeydown);
    uploadPhotoCommentElement.addEventListener('focus', onPhotoCommentFocus);
    uploadPhotoCommentElement.addEventListener('blur', onPhotoCommentBlur);
    window.preview.init();
    window.preview.default();
    window.form.init();
  }

  uploadFormCancelElement.addEventListener('click', function () {
    closePopup();
  });

  window.popupSetup = {
    open: open,
    close: closePopup
  };
})();
