'use strict';

(function () {

  var uploadFormELement = document.querySelector('.img-upload__overlay');
  var uploadInputElement = document.querySelector('#upload-file');
  var uploadFormCancelElement = document.querySelector('#upload-cancel');
  var uploadSubmitButtonElement = document.querySelector('.img-upload__submit');
  var uploadPhotoCommentElement = document.querySelector('.text__description');

  function onPopupEscKeydown(evt) {
    window.util.isEscEvent(evt, closePopup);
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

  // function openPopup() {
  //   uploadFormELement.classList.remove('hidden');
  //   document.addEventListener('keydown', onPopupEscKeydown);
  //   uploadSubmitButtonElement.addEventListener('click', onUploadSubmitButtonClick);
  //   uploadPhotoCommentElement.addEventListener('focus', onPhotoCommentFocus);
  //   uploadPhotoCommentElement.addEventListener('blur', onPhotoCommentBlur);
  //   window.changeFilterIntensity.addFilterIntensityEvent();
  //   window.changeFilterIntensity.setFilterDefault();
  //   window.changeSize.addSizeEvent();
  //   window.changeSize.setSizeDefault();
  // }

  function closePopup() {
    setFormInputResetState();
    uploadFormELement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscKeydown);
    uploadSubmitButtonElement.removeEventListener('click', onUploadSubmitButtonClick);
    uploadPhotoCommentElement.addEventListener('focus', onPhotoCommentFocus);
    uploadPhotoCommentElement.addEventListener('blur', onPhotoCommentBlur);
    window.changeFilterIntensity.resetFilterIntensityEvent();
    window.changeSize.resetSizeEvent();
    window.form.setFormDefault();
  }

  function setFormInputResetState() {
    uploadInputElement.value = '';
  }

  // uploadInputElement.addEventListener('change', function () {
  //   openPopup();
  // });

  uploadFormCancelElement.addEventListener('click', function () {
    closePopup();
  });

  window.popupSetup = {
    addSetupListeners: function () {
      uploadFormELement.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscKeydown);
      uploadSubmitButtonElement.addEventListener('click', onUploadSubmitButtonClick);
      uploadPhotoCommentElement.addEventListener('focus', onPhotoCommentFocus);
      uploadPhotoCommentElement.addEventListener('blur', onPhotoCommentBlur);
      window.changeFilterIntensity.addFilterIntensityEvent();
      window.changeFilterIntensity.setFilterDefault();
      window.changeSize.addSizeEvent();
      window.changeSize.setSizeDefault();
    }
  };
})();
