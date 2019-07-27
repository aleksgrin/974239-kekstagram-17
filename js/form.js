'use strict';

(function () {
  var MAX_TAGS_AMOUNT = 5;
  var MAX_TAG_LENGTH = 20;
  var OUTLINE = 'outline: 3px solid #D30000';

  var uploadPhotoCommentElement = document.querySelector('.text__description');
  var textHashtagsElement = document.querySelector('.text__hashtags');
  var formElement = document.querySelector('.img-upload__form');

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

  function isTagWithoutHash(array) {
    return array.some(function (tag) {
      return tag[0] !== '#';
    });
  }

  function isNoSpaceBetween(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].indexOf('#', 1) !== -1) {
        return true;
      }
    }

    return false;
  }

  function isOnlyHash(array) {
    return array.some(function (tag) {
      return tag[0] === '#' && tag.length === 1;
    });
  }

  function isLongerThan(array, max) {
    return array.some(function (tag) {
      return tag.length > max;
    });
  }

  function isSameHash(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var lastElement = array[i];
      if (array.indexOf(lastElement) !== i) {
        return true;
      }
    }

    return false;
  }

  function formCheck() {
    var tagsArray = textHashtagsElement.value.toLowerCase().split(' ');
    textHashtagsElement.setCustomValidity('');
    textHashtagsElement.style = '';

    if (textHashtagsElement.value.trim() === '') {
      textHashtagsElement.setCustomValidity('');
      textHashtagsElement.style = '';
    }

    if (tagsArray.length > 5) {
      textHashtagsElement.setCustomValidity('Количество комментариев не должно быть больше ' + MAX_TAGS_AMOUNT);
      textHashtagsElement.style = OUTLINE;
    }

    if (isTagWithoutHash(tagsArray)) {
      textHashtagsElement.setCustomValidity('Каждый хештег должен начинаться с решетки');
      textHashtagsElement.style = OUTLINE;
    }

    if (isOnlyHash(tagsArray)) {
      textHashtagsElement.setCustomValidity('Хештег не может состоять только из одной решетки');
      textHashtagsElement.style = OUTLINE;
    }

    if (isNoSpaceBetween(tagsArray)) {
      textHashtagsElement.setCustomValidity('Каждый хештег должен разделяться пробелом');
      textHashtagsElement.style = OUTLINE;
    }

    if (isLongerThan(tagsArray, MAX_TAG_LENGTH)) {
      textHashtagsElement.setCustomValidity('Длина тега не может быть больше ' + MAX_TAG_LENGTH + ' символов, включая решетку');
      textHashtagsElement.style = OUTLINE;
    }

    if (isSameHash(tagsArray)) {
      textHashtagsElement.setCustomValidity('Нельзя использовать несколько одинаковых хештегов');
      textHashtagsElement.style = OUTLINE;
    }

  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), onLoad, onError);
  }

  function onInputFocus() {
    window.util.destroyEsc();
  }

  function onInputBlur() {
    window.util.initEsc();
  }

  function init() {
    formElement.addEventListener('submit', onFormSubmit);
    uploadPhotoCommentElement.addEventListener('focus', onInputFocus);
    uploadPhotoCommentElement.addEventListener('blur', onInputBlur);
    textHashtagsElement.addEventListener('focus', onInputFocus);
    textHashtagsElement.addEventListener('blur', onInputBlur);
  }

  function destroy() {
    formElement.removeEventListener('submit', onFormSubmit);
    uploadPhotoCommentElement.removeEventListener('focus', onInputFocus);
    uploadPhotoCommentElement.removeEventListener('blur', onInputBlur);
    textHashtagsElement.removeEventListener('focus', onInputFocus);
    textHashtagsElement.removeEventListener('blur', onInputBlur);
  }

  textHashtagsElement.addEventListener('change', formCheck);


  window.form = {
    default: setFormDefault,
    init: init,
    destroy: destroy
  };
})();
