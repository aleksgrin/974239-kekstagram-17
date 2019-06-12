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

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var picturesElement = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

function getRandomIntegerFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateObjects() {
  var photos = [];
  photos[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomIntegerFromInterval(15, 200),
    comments: generateComments(getRandomIntegerFromInterval(1, 5))
  };

  return photos;
}

function generateComments(commentsQuantity) {
  var comments = [];
  for (var i = 0; i < commentsQuantity; i++) {
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
  picture.querySelector('.picture__img').src = image[i].url;
  picture.querySelector('.picture__comments').textContent = image[i].comments.length;
  picture.querySelector('.picture__likes').textContent = image[i].likes;

  return picture;
}

for (var i = 0; i < AMOUNT; i++) {
  fragment.appendChild(createPicturesDOM(generateObjects()));
}

picturesElement.appendChild(fragment);
