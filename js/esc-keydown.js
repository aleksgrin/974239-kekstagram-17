'use strict';

(function () {
  function onPopupEscKeydown(evt) {
    if (window.util.isEsc(evt)) {
      window.popupSetup.close();
    }
  }

  function init() {
    document.addEventListener('keydown', onPopupEscKeydown);
  }

  function destroy() {
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  window.escKeydown = {
    init: init,
    destroy: destroy
  };
})();
