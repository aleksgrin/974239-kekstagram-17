'use strict';
(function () {
  var uploadInputElement = document.querySelector('#upload-file');
  var picturesElement = document.querySelector('.pictures');
  var photos = [];

  function loadHandler(data) {
    photos = data;
    window.gallery.render(photos);
    window.filter.show();
    window.filter.init(photos);

    picturesElement.addEventListener('click', onPhotoClick);

    function onPhotoClick(evt) {
      var vr;
      vr = photos.find(function (element) {
        return evt.target.src.endsWith(element.url);
      });
      window.bigPicture.show();
      window.bigPicture.render(vr);
      for (var i = 0; i < vr.comments.length; i++) {
        window.bigPicture.insert(vr.comments[i]);
      }
    }
  }

  uploadInputElement.addEventListener('change', window.popupSetup.open);
  window.backend.load(loadHandler, window.errorMessage.show);

})();
