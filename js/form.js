'use strict';

(function () {
  var uploadPhotoCommentElement = document.querySelector('.text__description');
  var textHashtagsElement = document.querySelector('.text__hashtags');
  var form = document.querySelector('.img-upload__form');

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

  function setFormDefault() {
    uploadPhotoCommentElement.value = '';
    textHashtagsElement.value = '';
  }

  function onLoad() {
    window.popupSetup.close();
    showSuccessMessage();
  }

  function onError(message) {
    window.popupSetup.close();
    showErrorMessage(message);
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onLoad, onError);
  }

  function init() {
    form.addEventListener('submit', onFormSubmit);
  }

  function destroy() {
    form.removeEventListener('submit', onFormSubmit);
  }

  window.form = {
    default: setFormDefault,
    init: init,
    destroy: destroy
  };
})();
