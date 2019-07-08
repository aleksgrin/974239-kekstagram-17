'use strict';
(function () {
  var uploadFormELement = document.querySelector('.img-upload__overlay');
  var uploadInputElement = document.querySelector('#upload-file');
  var uploadFormCancelElement = document.querySelector('#upload-cancel');
  var uploadPhotoCommentElement = document.querySelector('.text__description');
  var form = document.querySelector('.img-upload__form');

  function onPopupEscKeydown(evt) {
    if (window.util.isEsc(evt)) {
      closePopup();
    }
  }

  function showSuccessMessage() {
    var successTemplateElement = document.querySelector('#success')
    .content
    .querySelector('.success')
    .cloneNode(true);
    var mainElement = document.querySelector('main');
    var successButton = successTemplateElement.querySelector('.success__button');

    function closeSuccessPopup() {
      mainElement.removeChild(successTemplateElement);
      successButton.removeEventListener('click', onSuccessButtonClick);
      document.removeEventListener('keydown', onSuccessEscKeydown);
      document.removeEventListener('click', onSuccessDocumentClick);
    }

    function onSuccessButtonClick() {
      closeSuccessPopup();
    }

    function onSuccessEscKeydown(evt) {
      if (window.util.isEsc(evt)) {
        closeSuccessPopup();
      }
    }

    function onSuccessDocumentClick(evt) {
      if (evt.target === successTemplateElement) {
        closeSuccessPopup();
      }
    }

    mainElement.appendChild(successTemplateElement);
    successButton.addEventListener('click', onSuccessButtonClick);
    document.addEventListener('keydown', onSuccessEscKeydown);
    document.addEventListener('click', onSuccessDocumentClick);
  }

  function showErrorMessage(message) {
    var errorTemplateElement = document.querySelector('#error')
      .content
      .querySelector('.error')
      .cloneNode(true);
    var mainElement = document.querySelector('main');
    var errorButtons = errorTemplateElement.querySelector('.error__buttons');
    var errorTitle = errorTemplateElement.querySelector('.error__title');

    function closeErrorPopup() {
      mainElement.removeChild(errorTemplateElement);
      errorButtons.removeEventListener('click', onErrorButtonClick);
      document.removeEventListener('keydown', onErrorEscKeydown);
      document.removeEventListener('click', onErrorDocumentClick);
    }

    function onErrorButtonClick() {
      closeErrorPopup();
    }

    function onErrorEscKeydown(evt) {
      if (window.util.isEsc(evt)) {
        closeErrorPopup();
      }
    }

    function onErrorDocumentClick(evt) {
      if (evt.target === errorTemplateElement) {
        closeErrorPopup();
      }
    }

    errorTitle.textContent = message;
    mainElement.appendChild(errorTemplateElement);
    errorButtons.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorEscKeydown);
    document.addEventListener('click', onErrorDocumentClick);
  }

  function successHandler() {
    showSuccessMessage();
    closePopup();
  }

  function errorHandler(message) {
    showErrorMessage(message);
    closePopup();
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), successHandler, errorHandler);
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

    form.removeEventListener('submit', onFormSubmit);
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
    window.form.default();

    form.addEventListener('submit', onFormSubmit);
  }

  uploadFormCancelElement.addEventListener('click', function () {
    closePopup();
  });

  window.popupSetup = {
    open: open
  };
})();
