'use strict';

(function () {

  var ChromeEffect = {
    MIN: 0,
    MAX: 1
  };
  var SepiaEffect = {
    MIN: 0,
    MAX: 1
  };
  var MarvinEffect = {
    MIN: 0,
    MAX: 100
  };
  var FhobosEffect = {
    MIN: 0,
    MAX: 3
  };
  var HeatEffect = {
    MIN: 1,
    MAX: 3
  };
  var PIN_MAX = 100;
  var PIN_MIN = 0;

  var EffectsInterval = {
    chrome: ChromeEffect.MAX - ChromeEffect.MIN,
    sepia: SepiaEffect.MAX - SepiaEffect.MIN,
    marvin: MarvinEffect.MAX - MarvinEffect.MIN,
    phobos: FhobosEffect.MAX - FhobosEffect.MIN,
    heat: HeatEffect.MAX - HeatEffect.MIN
  };

  var FILTER_VALUE_DEFAULT = 100;

  var imgUploadSliderElement = document.querySelector('.img-upload__effect-level');
  var effectLevelLineElement = document.querySelector('.effect-level__line');
  var imgPreviewElement = document.querySelector('.img-upload__preview');
  var effectLevelInputElement = document.querySelector('.effect-level__value');
  var effectLevelLineDepthElement = document.querySelector('.effect-level__depth');
  var effectLevelElement = document.querySelector('.effect-level__pin');
  var effectsList = document.querySelector('.effects__list');

  function onFilterChange(evt) {
    setFilter(evt.target.value, FILTER_VALUE_DEFAULT);
  }

  function onPinMouseDown(downEvt) {
    var startCoordsX = downEvt.clientX;
    var pinOffset = effectLevelElement.offsetLeft;
    var checkedFilterType = effectsList.querySelector('input:checked').value;

    function onPinMouseMove(moveEvt) {
      var shiftX = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;
      pinOffset = effectLevelElement.offsetLeft;
      setFilterEffectStyle(checkedFilterType, getPinValue(pinOffset, shiftX));
    }
    function onPinMouseUp() {
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    }

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  }

  function setFilter(type, value) {
    toggleRangeElementVisibility(type);
    addFilterClassname(type);
    setFilterEffectStyle(type, value);
  }

  function toggleRangeElementVisibility(filterValue) {
    if (filterValue === 'none') {
      imgUploadSliderElement.classList.add('hidden');
    } else {
      imgUploadSliderElement.classList.remove('hidden');
    }
  }

  function getPinValue(pinLeft, pinDelta) {
    var pinValue = (pinLeft - pinDelta) / effectLevelLineElement.offsetWidth * 100;
    if (pinValue >= PIN_MAX) {
      pinValue = PIN_MAX;
    }
    if (pinValue <= PIN_MIN) {
      pinValue = PIN_MIN;
    }

    return pinValue;
  }

  function addFilterClassname(filterType) {
    imgPreviewElement.className = 'img-upload__preview';

    switch (filterType) {
      case 'chrome':
        imgPreviewElement.classList.add('effects__preview--chrome');
        break;
      case 'sepia':
        imgPreviewElement.classList.add('effects__preview--sepia');
        break;
      case 'marvin':
        imgPreviewElement.classList.add('effects__preview--blur');
        break;
      case 'phobos':
        imgPreviewElement.classList.add('effects__preview--phobos');
        break;
      case 'heat':
        imgPreviewElement.classList.add('effects__preview--heat');
        break;
    }
  }

  function setFilterEffectStyle(filterType, pinValue) {
    effectLevelInputElement.value = pinValue;
    effectLevelElement.style.left = pinValue + '%';
    effectLevelLineDepthElement.style.width = pinValue + '%';

    switch (filterType) {
      case 'chrome':
        imgPreviewElement.style = 'filter: grayscale(' + pinValue / FILTER_VALUE_DEFAULT * EffectsInterval.chrome + ')';
        break;
      case 'sepia':
        imgPreviewElement.style = 'filter: sepia(' + pinValue / FILTER_VALUE_DEFAULT * EffectsInterval.sepia + ')';
        break;
      case 'marvin':
        imgPreviewElement.style = 'filter: invert(' + pinValue / FILTER_VALUE_DEFAULT * EffectsInterval.marvin + '%)';
        break;
      case 'phobos':
        imgPreviewElement.style = 'filter: blur(' + pinValue / FILTER_VALUE_DEFAULT * EffectsInterval.phobos + 'px)';
        break;
      case 'heat':
        imgPreviewElement.style = 'filter: brightness(' + pinValue / FILTER_VALUE_DEFAULT * EffectsInterval.heat + ')';
        break;
      default:
        imgPreviewElement.style = '';
        break;
    }
  }

  window.changeFilterIntensity = {
    addFilterIntensityEvent: function () {
      effectsList.addEventListener('change', onFilterChange);
      effectLevelElement.addEventListener('mousedown', onPinMouseDown);
    },
    resetFilterIntensityEvent: function () {
      effectsList.removeEventListener('change', onFilterChange);
      effectLevelElement.removeEventListener('mousedown', onPinMouseDown);
    },
    setFilterDefault: function () {
      var checkedFilterType = effectsList.querySelector('input:checked').value;
      setFilter(checkedFilterType, FILTER_VALUE_DEFAULT);
    }
  };

})();
