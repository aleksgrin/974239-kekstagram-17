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
var ENTER_KEYCODE = 13;
var SCALE_STEP = 25;
var SCALE_MAX = 100;
var SCALE_MIN = 0;

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
var EffectLevelElement = document.querySelector('.effect-level__pin');
var scaleValue = 100;

EffectLevelElement.addEventListener('mouseup', function (evt) {
  console.log(evt);
});

function onEffectsListChange(evt) {
  imgPreviewElement.className = 'img-upload__preview';
  if (evt.target.id === 'effect-chrome') {
    imgPreviewElement.classList.add('effects__preview--chrome');
  } else if (evt.target.id === 'effect-sepia') {
    imgPreviewElement.classList.add('effects__preview--sepia');
  } else if (evt.target.id === 'effect-marvin') {
    imgPreviewElement.classList.add('effects__preview--marvin');
  } else if (evt.target.id === 'effect-phobos') {
    imgPreviewElement.classList.add('effects__preview--phobos');
  } else if (evt.target.id === 'effect-heat') {
    imgPreviewElement.classList.add('effects__preview--heat');
  }
}
scaleControlValueElement.value = scaleValue + '%';

function getBiggerScaleStep(value) {
  value += SCALE_STEP;
  if (value > SCALE_MAX) {
    value = SCALE_MAX;
  }
  return value;
}

function getSmallerScaleStep(value) {
  value -= SCALE_STEP;
  if (value < SCALE_MIN) {
    value = SCALE_MIN;
  }
  return value;
}

function onScaleSmallerClick() {
  scaleValue = getSmallerScaleStep(scaleValue);
  scaleControlValueElement.value = scaleValue + '%';
  imgPreviewElement.style = 'transform: scale(' + scaleValue / SCALE_MAX + ');';
}
function onScaleBiggerClick() {
  scaleValue = getBiggerScaleStep(scaleValue);
  scaleControlValueElement.value = scaleValue + '%';
  imgPreviewElement.style = 'transform: scale(' + scaleValue / SCALE_MAX + ');';
}
uploadInputElement.addEventListener('change', function () {
  openPopup();
});

uploadFormCancelElement.addEventListener('click', function () {
  closePopup();
});

function onPopupEscKeydown(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
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

for (var i = 0; i < AMOUNT; i++) {
  fragment.appendChild(createPicturesDOM(generateObject(i)));
}

picturesElement.appendChild(fragment);
