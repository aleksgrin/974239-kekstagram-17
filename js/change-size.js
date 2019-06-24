'use strict';

(function () {

  var Scale = {
    STEP: 25,
    MAX: 100,
    MIN: 25
  };
  var SCALE_VALUE_DEFAULT = 100;
  var ZOOM_IN = 'zoomIn';
  var ZOOM_OUT = 'zoomOut';

  var imgPreviewElement = document.querySelector('.img-upload__preview');
  var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
  var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
  var scaleControlValueElement = document.querySelector('.scale__control--value');

  function onScaleBiggerClick() {
    setScaleValue(ZOOM_IN);
  }

  function onScaleSmallerClick() {
    setScaleValue(ZOOM_OUT);
  }

  function setScaleValue(flag) {
    var scaleValue = Number(scaleControlValueElement.value.substring(0, scaleControlValueElement.value.length - 1));
    if (flag === ZOOM_IN) {
      scaleValue = getBiggerScaleStep(scaleValue);
    } else if (flag === ZOOM_OUT) {
      scaleValue = getSmallerScaleStep(scaleValue);
    }

    setControlElementValue(scaleValue);
    imgPreviewElement.style = 'transform: scale(' + scaleValue / Scale.MAX + ');';
  }

  function setControlElementValue(value) {
    scaleControlValueElement.value = value + '%';
  }

  function getBiggerScaleStep(value) {
    value = value + Scale.STEP;
    if (value > Scale.MAX) {
      value = Scale.MAX;
    }
    return value;
  }

  function getSmallerScaleStep(value) {
    value -= Scale.STEP;
    if (value < Scale.MIN) {
      value = Scale.MIN;
    }
    return value;
  }

  window.changeSize = {
    addSizeEvent: function () {
      scaleControlBiggerElement.addEventListener('click', onScaleBiggerClick);
      scaleControlSmallerElement.addEventListener('click', onScaleSmallerClick);
    },
    resetSizeEvent: function () {
      scaleControlBiggerElement.removeEventListener('click', onScaleBiggerClick);
      scaleControlSmallerElement.removeEventListener('click', onScaleSmallerClick);
    },
    setSizeDefault: function () {
      setControlElementValue(SCALE_VALUE_DEFAULT);
    }
  };
})();
