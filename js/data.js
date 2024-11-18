const MIN = 1;
const MAX = 25;
const MIN_LIKES = 1;
const MAX_LIKES = 25;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const randomDescription = ['На отдыхе', 'На даче', 'Рыбалка', 'Соревнования', 'На море', 'Кот'];
const message = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const nameComments = ['Антон', 'Егор', 'Иван', 'Аня', 'Ева', 'Саша'];

const commentsDescription = function () {
  const comments = [];
  const commentsCount = Math.round(Math.random() * (MAX_COMMENTS - MIN_COMMENTS + 1)) + MIN_COMMENTS;
  for (let i = 0; i < commentsCount; i++) {
    comments.push({
      id: i + 1,
      avatar: `img/avatar-${Math.floor(Math.random() * 6) + 1}.svg`,
      message: message[Math.floor(Math.random() * message.length)],
      name: nameComments[Math.floor(Math.random() * nameComments.length)],
    });
  }
  return comments;
};

const dataGeneration = function () {
  const photoInformation = [];
  const OBJECT_FOTO_COUNT = 25;
  for (let i = 0; i < OBJECT_FOTO_COUNT; i++) {
    photoInformation.push({
      id: Math.round(Math.random() * (MAX - MIN + 1)) + MIN,
      url: `photos/${ Math.round(Math.random() * (MAX - MIN + 1)) + MIN }.jpg`,
      description: randomDescription[Math.floor(Math.random() * randomDescription.length)],
      likes: Math.round(Math.random() * (MAX_LIKES - MIN_LIKES + 1)) + MIN_LIKES,
      comments: commentsDescription ()
    });
  }

  return photoInformation;
};

export {commentsDescription};
export {dataGeneration};

