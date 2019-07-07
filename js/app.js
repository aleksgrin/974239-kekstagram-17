'use strict';
(function () {
  var uploadInputElement = document.querySelector('#upload-file');
  var photos = [];

  function loadHandler(data) {
    photos = data;
    window.gallery.render(photos);
    window.filter.show();
    window.filter.init(photos);
    window.bigPicture.show();
    window.bigPicture.render(photos[0]);

    for (var i = 0; i < photos[0].comments.length; i++) {
      window.bigPicture.insert(photos[0].comments[i]);
    }
  }

  uploadInputElement.addEventListener('change', window.popupSetup.open);
  window.backend.load(loadHandler, window.errorMessage.show);

})();
