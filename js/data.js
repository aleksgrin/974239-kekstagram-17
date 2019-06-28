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
  var AMOUNT = 25;
  var photos = [];

  function getCommentsArray(amount) {
    var comments = [];
    for (var i = 0; i < amount; i++) {
      comments[i] = {
        avatar: 'img/avatar-' + window.util.getRandom(1, 6) + '.svg',
        message: COMMENTS[window.util.getRandom(0, COMMENTS.length - 1)],
        name: NAMES[window.util.getRandom(0, NAMES.length)]
      };
    }

    return comments;
  }

  function getPhotosArray(number) {
    var photo;
    photo = {
      url: 'photos/' + (number + 1) + '.jpg',
      likes: window.util.getRandom(15, 200),
      comments: getCommentsArray(window.util.getRandom(1, 5))
    };

    return photo;
  }

  for (var i = 0; i < AMOUNT; i++) {
    photos[i] = getPhotosArray(i);
  }

  window.data = {
    get: photos
  };
})();
