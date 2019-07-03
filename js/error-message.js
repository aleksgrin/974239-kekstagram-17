'use strict';
(function () {
  function createErrorMessageDOMElement(message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; padding: 5px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.top = 0;
    node.style.fontSize = '15px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.errorMessage = {
    show: createErrorMessageDOMElement
  };
})();
