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

  function getCommentsArray(amount) {
    var comments = [];
    for (var i = 0; i < amount; i++) {
      comments[i] = {
        avatar: 'img/avatar-' + window.randomNumber.get(1, 6) + '.svg',
        message: COMMENTS[window.randomNumber.get(0, COMMENTS.length - 1)],
        name: NAMES[window.randomNumber.get(0, NAMES.length)]
      };
    }

    return comments;
  }
  window.commentsArray = {
    get: getCommentsArray
  };
})();
