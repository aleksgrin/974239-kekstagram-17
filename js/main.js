'use strict';

var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Саша', 'Петя', 'Даша', 'Ростислав', 'Августина', 'Любомир', 'Евдокия', 'Стеша', 'fox777', 'Настя'];
var AMOUNT = 25;
var ESC_KEYCODE = 27;
var Scale = {
  STEP: 25,
  MAX: 100,
  MIN: 0
};
var SLIDER_WIDTH; // Это значение надо будет посчитать в следующем задании
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
var EFFECT_BASIC = 100;

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var picturesElement = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var uploadInputElement = document.querySelector('#upload-file');
var uploadFormELement = document.querySelector('.img-upload__overlay');
var uploadFormCancelElement = document.querySelector('#upload-cancel');
var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
var scaleControlValueElement = document.querySelector('.scale__control--value');
var imgPreviewElement = document.querySelector('.img-upload__preview');
var effectsList = document.querySelector('.effects__list');
var effectLevelElement = document.querySelector('.effect-level__pin');
var effectLevelInputElement = document.querySelector('.effect-level__value');
var imgUploadSliderElement = document.querySelector('.img-upload__effect-level');
var scaleValue = 100;
var EffectsInterval = {
  chrome: ChromeEffect.MAX - ChromeEffect.MIN,
  sepia: SepiaEffect.MAX - SepiaEffect.MIN,
  marvin: MarvinEffect.MAX - MarvinEffect.MIN,
  phobos: FhobosEffect.MAX - FhobosEffect.MIN,
  heat: HeatEffect.MAX - HeatEffect.MIN
};

function onPopupEscKeydown(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

function onScaleBiggerClick() {
  scaleValue = getBiggerScaleStep(scaleValue);
  scaleControlValueElement.value = scaleValue + '%';
  imgPreviewElement.style = 'transform: scale(' + scaleValue / Scale.MAX + ');';
}
function onScaleSmallerClick() {
  scaleValue = getSmallerScaleStep(scaleValue);
  scaleControlValueElement.value = scaleValue + '%';
  imgPreviewElement.style = 'transform: scale(' + scaleValue / Scale.MAX + ');';
}

function onEffectsListChange(evt) {
  if (evt.target.id === 'effect-chrome') {
    setPhotoFilter('effects__preview--chrome', onChromePinMouseup);
  }
  if (evt.target.id === 'effect-sepia') {
    setPhotoFilter('effects__preview--sepia', onSepiaPinMouseup);
  }
  if (evt.target.id === 'effect-marvin') {
    setPhotoFilter('effects__preview--marvin', onMarvinPinMouseup);
  }
  if (evt.target.id === 'effect-phobos') {
    setPhotoFilter('effects__preview--phobos', onPhobosPinMouseup);
  }
  if (evt.target.id === 'effect-heat') {
    setPhotoFilter('effects__preview--heat', onHeatPinMouseup);
  }
  if (evt.target.id === 'effect-none') {
    setResetPhotoState();
    imgUploadSliderElement.classList.add('hidden');
  }
}

function onChromePinMouseup() {
  setEffect('grayscale', EffectsInterval.chrome);
}

function onSepiaPinMouseup() {
  setEffect('sepia', EffectsInterval.sepia);
}

function onMarvinPinMouseup() {
  setEffect('invert', EffectsInterval.marvin);
}

function onPhobosPinMouseup() {
  setEffect('blur', EffectsInterval.phobos);
}

function onHeatPinMouseup() {
  setEffect('brightness', EffectsInterval.heat);
}

function openPopup() {
  uploadFormELement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
  scaleControlBiggerElement.addEventListener('click', onScaleBiggerClick);
  scaleControlSmallerElement.addEventListener('click', onScaleSmallerClick);
  effectsList.addEventListener('change', onEffectsListChange);
}

function closePopup() {
  uploadFormELement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  scaleControlBiggerElement.removeEventListener('click', onScaleBiggerClick);
  scaleControlSmallerElement.removeEventListener('click', onScaleSmallerClick);
  effectsList.removeEventListener('change', onEffectsListChange);
}

function getBiggerScaleStep(value) {
  value += Scale.STEP;
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

function setEffect(filterName, interval) {
  var deltaPin; // Значение будет высчитываться как разность положений ползунка
  var level = setEffectIntensity(deltaPin, SLIDER_WIDTH, interval);
  effectLevelInputElement.value = level;
  imgPreviewElement.style = 'filter: ' + filterName + '(' + level + ')';
}

function setEffectIntensity(deltaPin, sliderWidth, effectInterval) {
  var effectValue = deltaPin / sliderWidth * effectInterval;
  return effectValue;
}

function setResetPhotoState() {
  // Потом сюда добавится еще начальное положение ползунка
  effectLevelInputElement.value = EFFECT_BASIC;
  imgPreviewElement.className = 'img-upload__preview';
}

function setPhotoFilter(className, handler) {
  setResetPhotoState();
  imgPreviewElement.classList.add(className);
  effectLevelElement.addEventListener('mouseup', handler);
  imgUploadSliderElement.classList.remove('hidden');
}

function getRandomIntegerFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateObject(number) {
  var photo;
  photo = {
    url: 'photos/' + (number + 1) + '.jpg',
    likes: getRandomIntegerFromInterval(15, 200),
    comments: generateComments(getRandomIntegerFromInterval(1, 5))
  };

  return photo;
}

function generateComments(amount) {
  var comments = [];
  for (var i = 0; i < amount; i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomIntegerFromInterval(1, 6) + '.svg',
      message: COMMENTS[getRandomIntegerFromInterval(0, COMMENTS.length - 1)],
      name: NAMES[getRandomIntegerFromInterval(0, NAMES.length)]
    };
  }

  return comments;
}

function createPicturesDOM(image) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = image.url;
  picture.querySelector('.picture__comments').textContent = image.comments.length;
  picture.querySelector('.picture__likes').textContent = image.likes;

  return picture;
}

uploadInputElement.addEventListener('change', function () {
  openPopup();
});

uploadFormCancelElement.addEventListener('click', function () {
  closePopup();
});

scaleControlValueElement.value = scaleValue + '%';

for (var i = 0; i < AMOUNT; i++) {
  fragment.appendChild(createPicturesDOM(generateObject(i)));
}

picturesElement.appendChild(fragment);
