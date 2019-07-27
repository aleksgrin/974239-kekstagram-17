'use strict';
(function () {
  var uploadFormELement = document.querySelector('.img-upload__overlay');
  var uploadInputElement = document.querySelector('#upload-file');
  var uploadFormCancelElement = document.querySelector('#upload-cancel');

  function closePopup() {
    setFormInputResetState();
    uploadFormELement.classList.add('hidden');
    window.util.destroyEsc();
    window.preview.destroy();
    window.form.destroy();
    window.form.default();
  }

  function setFormInputResetState() {
    uploadInputElement.value = '';
  }

  function open() {
    uploadFormELement.classList.remove('hidden');
    window.util.initEsc();
    window.preview.init();
    window.preview.default();
    window.form.init();
  }

  uploadFormCancelElement.addEventListener('click', function () {
    closePopup();
  });

  window.popupSetup = {
    open: open,
    close: closePopup
  };
})();
