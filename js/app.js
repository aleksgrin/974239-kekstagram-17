'use strict';
(function () {
  var GALLERY_PHOTO_COUNT = 25;

  var uploadInputElement = document.querySelector('#upload-file');
  var photos = window.data.get(GALLERY_PHOTO_COUNT);

  uploadInputElement.addEventListener('change', window.popupSetup.open);

  // window.addPictures.render();

  // window.backend.load();
  window.gallery.render(photos);
})();
