'use strict';
(function () {
  var uploadPhotoCommentElement = document.querySelector('.text__description');
  var textHashtagsElement = document.querySelector('.text__hashtags');

  function setFormDefault() {
    uploadPhotoCommentElement.value = '';
    textHashtagsElement.value = '';
  }

  window.form = {
    default: setFormDefault
  };
})();
