'use strict';
(function () {
  var COMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES = ['Саша', 'Петя', 'Даша', 'Ростислав', 'Августина', 'Любомир', 'Евдокия', 'Стеша', 'fox777', 'Настя'];
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 5;
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;

  function getCommentsArray(amount) {
    var comments = [];
    for (var i = 0; i < amount; i++) {
      comments[i] = {
        avatar: 'img/avatar-' + window.util.getRandom(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
        message: COMMENTS[window.util.getRandom(0, COMMENTS.length - 1)],
        name: NAMES[window.util.getRandom(0, NAMES.length)]
      };
    }

    return comments;
  }

  function generatePhotoObject(number) {
    var photo;
    photo = {
      url: 'photos/' + (number + 1) + '.jpg',
      likes: window.util.getRandom(MIN_LIKES, MAX_LIKES),
      comments: getCommentsArray(window.util.getRandom(MIN_COMMENTS, MAX_COMMENTS))
    };

    return photo;
  }

  function get(amount) {
    var photos = [];

    for (var i = 0; i < amount; i++) {
      photos[i] = generatePhotoObject(i);
    }

    return photos;
  }

  window.data = {
    get: get
  };
})();
