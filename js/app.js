'use strict';
(function () {
  var GELLERY_PHOTO_COUNT = 25;
  var uploadInputElement = document.querySelector('#upload-file');

  var photos = window.data.get(GELLERY_PHOTO_COUNT);
  uploadInputElement.addEventListener('change', window.popupSetup.open);

  window.gallery.render(photos);
})();
