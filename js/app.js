'use strict';
(function () {

  var uploadInputElement = document.querySelector('#upload-file');

  uploadInputElement.addEventListener('change', function () {
    window.popupSetup.addSetupListeners();
  });
  window.addPictures.add();
})();
