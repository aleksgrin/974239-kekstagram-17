'use strict';
(function () {
  var uploadInputElement = document.querySelector('#upload-file');

  uploadInputElement.addEventListener('change', window.popupSetup.open);

  window.addPictures.render();
})();
