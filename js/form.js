'use strict';

(function () {
  var uploadPhotoCommentElement = document.querySelector('.text__description');
  var textHashtagsElement = document.querySelector('.text__hashtags');
  var form = document.querySelector('.img-upload__form');

  function setFormDefault() {
    uploadPhotoCommentElement.value = '';
    textHashtagsElement.value = '';
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), window.setup.close, window.errorMessage.create);
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
