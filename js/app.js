'use strict';
(function () {
  var uploadInputElement = document.querySelector('#upload-file');
  var photos = [];

  uploadInputElement.addEventListener('change', window.popupSetup.open);

  function loadHandler(data) {
    photos = data;
    window.gallery.render(photos);
    window.filter.init(photos);
  }

  window.backend.load(loadHandler, window.errorMessage.show);
})();
