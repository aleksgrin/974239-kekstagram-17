'use strict';

var COMENTS_VARIANTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Саша', 'Петя', 'Даша', 'Ростислав', 'Августина', 'Любомир', 'Евдокия', 'Стеша', 'fox777', 'Настя'];
var OBJECTS_AMOUNT = 25;
function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateObjects() {
  var photos = [];
  for (var i = 0; i < OBJECTS_AMOUNT; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: generateRandom(15, 200),
      comments: generateComments()
    };
  }
  return photos;
}

function generateComments() {
  var comments = [];
  for (var i = 0; i < generateRandom(1, 5); i++) {
    comments[i] = {
      avatar: 'img/avatar-' + generateRandom(1, 6) + '.svg',
      message: COMENTS_VARIANTS[generateRandom(0, COMENTS_VARIANTS.length - 1)],
      name: NAMES[generateRandom(0, NAMES.length)]
    };
  }

  return comments;
}

function createPicturesDOM(image) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = image.url;
  picture.querySelector('.picture__comments').textContent = image.comments.length;
  picture.querySelector('.picture__likes').textContent = image.likes;
}

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
