

const min = 1;
const max = 25;
const minLikes = 1;
const maxLikes = 25;
const minComments = 0;
const maxComments = 30;
const randomDescription = ['На отдыхе', 'На даче', 'Рыбалка', 'Соревнования'];
const message = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const nameComments = ['Антон', 'Егор', 'Иван', 'Аня', 'Ева'];

const commentsDescription = function () {
  const comments = [];
  const commentsCount = Math.round(Math.random() * (maxComments - minComments + 1)) + minComments;
  for (let i = 0; i < commentsCount; i++) {
    comments.push({
      id: i + 1,
      avatar: `img/avatar-${ Math.round(Math.random() * (max - min + 1)) + min }.jpg`,
      message: message[Math.floor(Math.random() * message.length)],
      name: nameComments[Math.floor(Math.random() * nameComments.length)],
    });
  }

  return comments;
};

const object = function () {
  const objectFoto = [];
  const objectFotoCount = 25;
  for (let i = 0; i < objectFotoCount; i++) {
    objectFoto.push({
      id: Math.round(Math.random() * (max - min + 1)) + min,
      url: `photos/${ Math.round(Math.random() * (max - min + 1)) + min }.jpg`,
      description: randomDescription[Math.floor(Math.random() * randomDescription.length)],
      likes: Math.round(Math.random() * (maxLikes - minLikes + 1)) + minLikes,
      comments: commentsDescription ()
    });
  }

  return objectFoto;
};


console.log(object());


