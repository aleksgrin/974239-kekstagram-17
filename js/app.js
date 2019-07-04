'use strict';
(function () {
  var uploadInputElement = document.querySelector('#upload-file');

  uploadInputElement.addEventListener('change', window.popupSetup.open);

  window.backend.load(window.gallery.render, window.errorMessage.show);
})();
