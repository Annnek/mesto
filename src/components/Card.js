// // Функции создания из массива, удаления, лайка карточек
export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    userId,
    like,
    dislike,
    deleteCard
  ) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._like = like;
    this._dislike = dislike;
    this._deleteCard = deleteCard;
    this._likes = data.likes;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
  }

  like() {
    this._likeButton.classList.add("card__like-icon_active");
  }

  dislike() {
    this._likeButton.classList.remove("card__like-icon_active");
  }

  _userLiked() {
    this._likes.forEach((elementId) => {
      if (elementId._id === this._userId) {
        this.like();
      } else {
        this.dislike();
      }
    });
  }

  likesCount(res) {
    this._likesCount.textContent = `${res.likes.length}`;
  }

  remove() {
    this._cardElement.remove();
  }

  generateCard = () => {
    const template = document.querySelector(this._templateSelector);
    if (template) {
      const element = template.content.querySelector(".card__item");
      if (element) {
        this._cardElement = element.cloneNode(true);
      } else console.log("В классе Card не найден .card__item!");
    } else
      console.log("В классе Card не найден " + this._templateSelector + "!");

    this._likeButton = this._cardElement.querySelector(".card__like-icon");

    // Устанавливаю счетчик для подсчета лайков
    this._likesCount = this._cardElement.querySelector(".card__like-counter");
    this._likesCount.textContent = this._likes.length;
    this._deleteButtonTrash = this._cardElement.querySelector(".card__trash");
    if (this._ownerId !== this._userId) {
      this._deleteButtonTrash.remove();
    }

    this._imageElementMask = this._cardElement.querySelector(".card__image");
    this._imageElementMask.src = this._link;
    this._imageElementMask.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    this._userLiked();

    return this._cardElement;
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("card__like-icon_active")) {
        this._dislike();
      } else {
        this._like();
      }
    });
    this._deleteButtonTrash.addEventListener("click", () => {
      this._deleteCard(this._id);
    });
    this._imageElementMask.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

// // // Функции создания из массива, удаления, лайка карточек
// export default class Card {
//   constructor(
//     data,
//     templateSelector,
//     handleCardClick,
//     userId,
//     like,
//     dislike,
//     deleteCard
//   ) {
//     this._name = data.name;
//     this._link = data.link;
//     this._templateSelector = templateSelector;
//     this._handleCardClick = handleCardClick;
//     this._userId = userId;
//     this._ownerId = data.owner._id;
//     this._like = like;
//     this._dislike = dislike;
//     this._likes = data.likes;
//     this._deleteCard = deleteCard;
//     this._likes = data.likes;
//   }

//   generateCard = () => {
//     this._cardElement = document
//       .querySelector(this._templateSelector)
//       .content.querySelector(".card__item")
//       .cloneNode(true);
//     this._title = this._cardElement.querySelector(".card__title");
//     this._image = this._cardElement.querySelector(".card__image");
//     this._trash = this._cardElement.querySelector(".card__trash");
//     if (this._ownerId !== this._userId) {
//       this._trash.remove();
//     }

//     // Устанавливаю счетчик для подсчета лайков
//     this._likeButton = this._cardElement.querySelector(".card__like-icon");
//     this._likesCount = this._cardElement.querySelector(".card__like-counter");
//     this._likesCount.textContent = this._likes.length;

//     // this._fillCard();
//     this._setEventHandlers();
//     this._userLiked();

//     return this._cardElement;
//   };

//   remove = () => {
//     this._cardElement.remove();
//     this._cardElement = null; //Лучше всего при удалении карточки очистить ссылку на DOM-элемент
//   };

//   // _toggleCardLike = () => {
//   //   this._like.classList.toggle("card__like-icon_active");
//   // };

//   like() {
//     this._likeButton.classList.add("card__like-icon_active");
//   }

//   dislike() {
//     this._likeButton.classList.remove("card__like-icon_active");
//   }

//   _userLiked() {
//     this._likes.forEach((elementId) => {
//       if (elementId._id === this._userId) {
//         this.like();
//       } else {
//         this.dislike();
//       }
//     });
//   }

//   likesCount(res) {
//     this._likesCount.textContent = `${res.likes.length}`;
//   }

//   __setEventListeners = () => {
//     this._image.addEventListener("click", () =>
//       this._handleCardClick(this._name, this._link)
//     );
//     this._likeButton.addEventListener("click", () => {
//       if (this._likeButton.classList.contains("card__like-icon_active")) {
//         this._dislike();
//       } else {
//         this._like();
//       }
//     });
//     this._trash.addEventListener("click", () => this._deleteCard(this._id));
//   };

//   // _fillCard = () => {
//   //   this._image.src = this._link;
//   //   this._image.alt = this._name;
//   //   this._title.textContent = this._name;
//   // };
// }
