'use strict';
(function () {
  var uploadInputElement = document.querySelector('#upload-file');
  var photos = [];

  function loadHandler(data) {
    photos = data;
    window.gallery.render(photos);
    window.filter.show();
    window.filter.init(photos);
  }

  uploadInputElement.addEventListener('change', window.popupSetup.open);
  window.backend.load(loadHandler, window.errorMessage.show);

})();
