'use strict';
(function () {
  var uploadInputElement = document.querySelector('#upload-file');

  uploadInputElement.addEventListener('change', function () {
    window.popupSetup.init();
  });

  window.addPictures.render();

  // window.backend.load();
})();
