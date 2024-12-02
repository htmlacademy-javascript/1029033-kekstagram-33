
const addingPhoto = function (data) {
  const container = document.querySelector('.pictures');
  const fotoTemplate = document.querySelector ('#picture').content.querySelector('.picture');

  data.forEach((foto) => {
    const elementPhoto = fotoTemplate.cloneNode(true);
    const fotoImage = elementPhoto.querySelector ('.picture__img');
    fotoImage.src = foto.url;
    fotoImage.alt = foto.description;

    const fotoLikes = elementPhoto.querySelector ('.picture__likes');
    fotoLikes.textContent = foto.likes;
    const fotoComments = elementPhoto.querySelector ('.picture__comments');
    fotoComments.textContent = foto.comments.length;

    container.appendChild(elementPhoto);
  });

};


export {addingPhoto};
