'use strict';

(function () {
  var MAX_TAGS_AMOUNT = 5;
  var MAX_TAG_LENGTH = 20;

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

  function isHashFirst(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][0] !== '#') {
        return false;
      }
    }

    return true;
  }

  function isSpaceBetween(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].indexOf('#', 1) !== -1) {
        return false;
      }
    }

    return true;
  }

  function isOnlyHash(array) {
    for (var i = 0; i < array.length; i++) {
      // if (array[i].charAt(array[i].length - 1) === '#') {
      if (array[i][array[i].length - 1] === '#' && array[i][0] === '#') {
        return false;
      }
    }

    return true;
  }

  function isSameHash(array) {
    var current;
    while (array.length > 1) {
      current = array[0];
      array.shift();
      if (array.indexOf(current) !== -1) {
        return false;
      }
    }

    return true;
  }

  function isMoreElementsThan(array, max) {
    return array.length <= max;
  }

  function isLongerThan(array, max) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].length > max) {
        return false;
      }
    }

    return true;
  }

  function formCheck() {
    var tagsArray = textHashtagsElement.value.toLowerCase().split(' ');

    if (isHashFirst(tagsArray) === false) {
      textHashtagsElement.setCustomValidity('Каждый хештег должен начинаться с решетки');
      return false;
    }

    if (isOnlyHash(tagsArray) === false) {
      textHashtagsElement.setCustomValidity('Хештег не может состоять только из одной решетки');
      return false;
    }

    if (isSpaceBetween(tagsArray) === false) {
      textHashtagsElement.setCustomValidity('Каждый хештег должен разделяться пробелом');
      return false;
    }

    if (isSameHash(tagsArray) === false) {
      textHashtagsElement.setCustomValidity('Нельзя использовать несколько одинаковых хештегов');
      return false;
    }

    if (isMoreElementsThan(tagsArray, MAX_TAGS_AMOUNT) === false) {
      textHashtagsElement.setCustomValidity('Количество комментариев не должно быть больше ' + MAX_TAGS_AMOUNT);
      return false;
    }

    if (isLongerThan(tagsArray, MAX_TAG_LENGTH) === false) {
      textHashtagsElement.setCustomValidity('Длина тега не может быть больше ' + MAX_TAG_LENGTH + ' символов, включая решетку');
      return false;
    }
    return true;
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    if (formCheck()) {
      window.backend.save(new FormData(form), onLoad, onError);
    }
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
