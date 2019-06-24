'use strict';

(function () {

  var uploadPhotoCommentElement = document.querySelector('.text__description');
  var textHashtagsElement = document.querySelector('.text__hashtags');

  window.form = {
    setFormDefault: function () {
      uploadPhotoCommentElement.value = '';
      textHashtagsElement.value = '';
    }
  };
})();
