/*
  Файл index.js является точкой входа в наше приложение
  и только он должен содержать логику инициализации нашего приложения
  используя при этом импорты из других файлов

  Из index.js не допускается что то экспортировать
*/

import { currentUserId, getTrackedUserName } from "./initialData.js";
import { openContextMenu } from "./special.js";
import { insertProfileHeader, insertProfileFullInfo } from "./components/profile_element.js";
import {
    createPostElement, likePost, showMoreText,
    scrollTrack, isPostLiked, changeLikesCount, deletePost
} from "./components/post.js";
import { openModalWindow, closeModalWindow, setCloseModalWindowEventListeners } from "./components/modal.js";
import { enableValidation, clearValidation, disableSubmitButton, showInputError, hideInputError } from "./components/validation.js";
import {
    getUsers, getUser, getUserByUsername,
    updateUser, updateAvatar, getPosts, createPost,
    deletePostOnServer, likePostOnServer, getUserPosts, checkUsername
} from './api.js';

// DOM узлы
let trackedUserId = null;
const mainSideBarProfileBtn = document.getElementById('currentUser__profile-Button');

const postFormModalWindow = document.querySelector(".popup_type_new-post");
const postForm = postFormModalWindow.querySelector(".popup__form");
const postTextInput = postForm.querySelector(".popup__input_type_post-text");

const openPostFormButton = document.querySelector(".post__add-button");
const addImageBtn = document.getElementById('add-image-btn');
const imagesContainer = document.getElementById('images-container');

const openChatButton = document.querySelector(".message__write-button");

const profileName = document.querySelector(".profile-name");
const profileBio = document.querySelector(".profile-bio");
const profileAvatar = document.querySelector(".user-avatar");
const profileCountry = document.querySelector(".profile-country");

const fullProfileModalWindow = document.querySelector(".popup_type_profile");
const fullProfileHeaderIn = fullProfileModalWindow.querySelector('.profileHeader__in');

const profileFormModalWindow = document.querySelector(".popup_type_edit");
const profileForm = profileFormModalWindow.querySelector('.popup__form');
const profileAvatarInput = profileForm.querySelector(".popup__input_type_avatar");
const profileNameInput = profileForm.querySelector(".popup__input_type_name");
const profileUserNameInput = profileForm.querySelector(".popup__input_type_userName");
const profileBioInput = profileForm.querySelector(".popup__input_type_bio");
const profileCountryInput = profileForm.querySelector(".popup__input_type_country");
const profileBirthdayInput = profileForm.querySelector(".popup__input_type_birthday");

// fffffffffffffffffffffffffffffffffffffffffffffffffffff
const postsContainer = document.querySelector('.postsContainer');

const imageModalWindow = document.querySelector(".popup_type_image");
const imageElement = imageModalWindow.querySelector(".popup__image");



const removePostModalWindow = document.querySelector(".popup_type_remove-post");
const removePostForm = removePostModalWindow.querySelector(".popup__form");

let deletePostElement = null;
let deletePostId = null;

const renderLoading = (submitButton, defaultText, isLoading) => {
    const processedText = defaultText.trim();
    if (isLoading) {
        submitButton.textContent =
            processedText === "Создать" ? "Создание..." : processedText === "Да" ? "Удаление..." : "Сохранение...";
    } else {
        submitButton.textContent = processedText;
    }
}


const handlePreviewPicture = ({ name, link }) => {
    imageElement.src = link;
    imageElement.alt = name;
    openModalWindow(imageModalWindow);
};

const handleFullProfileInfo = () => {
    getUser(trackedUserId)
        .then((trackedUser) => {
            insertProfileFullInfo(trackedUser, fullProfileHeaderIn);
            openModalWindow(fullProfileModalWindow);
        })
        .catch((err) => {
            console.log(err);
        })
};

const openEditProfileForm = () => {
    getUser(trackedUserId)
        .then((trackedUser) => {
            profileAvatarInput.value = trackedUser.avatar;
            profileNameInput.value = trackedUser.name;
            profileUserNameInput.value = trackedUser.user_name;
            profileBioInput.value = trackedUser.bio;
            profileCountryInput.value = trackedUser.country;
            profileBirthdayInput.value = trackedUser.birth_date;

            profileUserNameInput.addEventListener('blur', async function () {
                try {
                    const users = await checkUsername(profileUserNameInput.value);
                    const isTaken = users.some(user => user.id !== currentUserId);
                    if (isTaken) {
                        showInputError(profileUserNameInput, 'Этот никнэйм уже занят', validationSettings);
                        disableSubmitButton(profileForm.querySelector(validationSettings.submitButtonSelector), validationSettings);
                    } else {
                        hideInputError(profileUserNameInput, validationSettings);
                    }
                } catch {
                    showInputError(profileUserNameInput, 'Ошибка проверки username', validationSettings); // возможно лучше в alert
                }
            });

            clearValidation(profileForm, validationSettings);
            openModalWindow(profileFormModalWindow);
        })
        .catch((err) => {
            console.log(err);
        })

}

const handleRemovePostFormSubmit = (evt) => {
    evt.preventDefault();
    const submitButton = removePostForm.querySelector(".popup__button");
    const defaultText = submitButton.textContent;
    renderLoading(submitButton, defaultText, true);
    deletePostOnServer(deletePostId)
        .then(() => {
            deletePost(deletePostElement);
            deletePostElement = null;
            deletePostId = null;
            closeModalWindow(removePostModalWindow);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(submitButton, defaultText, false);
        });
};

const handleDeletePostButton = (postElement, postId) => {
    deletePostElement = postElement;
    deletePostId = postId;
    openModalWindow(removePostModalWindow);
};

const handleLikePostButton = (likeButton, post, likesCountElement) => {
    const isLiked = isPostLiked(likeButton);

    likePostOnServer(post, isLiked, currentUserId)
        .then((updatedPost) => {
            post.likes = updatedPost.likes;

            likePost(likeButton);
            changeLikesCount(likesCountElement, updatedPost.likes.length);
        })
        .catch((err) => {
            console.log(err);
        });
};


const handlePostFormSubmit = (evt) => {
    evt.preventDefault();
    const submitButton = postForm.querySelector(".popup__button");
    const defaultText = submitButton.textContent;
    const imageInputs = postForm.querySelectorAll(".popup__input_type_url");
    const images = Array.from(imageInputs)
        .map(input => input.value)
        .filter(Boolean);

    renderLoading(submitButton, defaultText, true);
    Promise.all([createPost({
        text: postTextInput.value,
        images: images,
        userId: currentUserId,
    }), getUser(currentUserId)])
        .then(([postData, currentUser]) => {
            const postWithAuthor = {
                ...postData,
                author: {
                    name: currentUser.name,
                    avatar: currentUser.avatar
                }
            };

            postsContainer.prepend(
                createPostElement(
                    postWithAuthor,
                    {
                        onPreviewPicture: handlePreviewPicture,
                        onLikeIcon: handleLikePostButton,
                        onOpenMenu: openContextMenu,
                        onShowMoreText: showMoreText,
                        onScrollGallery: scrollTrack,
                        onDeletePost: handleDeletePostButton,
                        setLikesCount: changeLikesCount,
                    },
                    currentUserId
                )
            );
            closeModalWindow(postFormModalWindow);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(submitButton, defaultText, false);
        });
};

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    const submitButton = profileForm.querySelector(".popup__button");
    const defaultText = submitButton.textContent;
    renderLoading(submitButton, defaultText, true);
    updateUser(
        currentUserId,
        {
            name: profileNameInput.value,
            avatar: profileAvatarInput.value,
            user_name: profileUserNameInput.value,
            bio: profileBioInput.value,
            country: profileCountryInput.value,
            birth_date: profileBirthdayInput.value,
        })
        .then((userData) => {
            // Код отвечающий за обновление данных на странице
            profileAvatar.src = userData.avatar;
            profileName.textContent = userData.name;
            profileBio.textContent = userData.bio;
            profileCountry.textContent = userData.country;
            closeModalWindow(profileFormModalWindow);
            handleFullProfileInfo();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(submitButton, defaultText, false);
        });
};







// EventListeners
profileForm.addEventListener("submit", handleProfileFormSubmit);
postForm.addEventListener("submit", handlePostFormSubmit);
removePostForm.addEventListener("submit", handleRemovePostFormSubmit);



openPostFormButton.addEventListener("click", () => {
    postForm.reset();

    const addedFields = postForm.querySelectorAll('.added-li'); 
    addedFields.forEach(field => field.remove());


    const inputs = postForm.querySelectorAll('.popup__input');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            // Проверяем, заполнен ли хоть один из инпутов
            const isAnyFilled = Array.from(inputs).some(i => i.value.trim() !== '');

            // Если заполнен, удаляем required у всех, чтобы форма отправилась.
            // Если пустые — возвращаем required обратно
            inputs.forEach(i => {
                if (isAnyFilled) {
                    i.removeAttribute('required');
                } else {
                    i.setAttribute('required', 'required');
                }
            });
        });
    });

    clearValidation(postForm, validationSettings);
    openModalWindow(postFormModalWindow);
});

addImageBtn.addEventListener('click', () => {
    // label
    const label = document.createElement('label');
    label.classList.add('popup__label');

    // input
    const input = document.createElement('input');
    input.type = 'url';
    input.name = 'post-link';
    input.placeholder = 'Ссылка на картинку';
    input.required = true;
    input.classList.add('popup__input', 'popup__input_type_url');

    // span ошибки
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('popup__error');

    // собираем
    label.appendChild(input);
    label.appendChild(errorSpan);

    const li = document.createElement('li');
    li.classList.add('added-li');
    li.appendChild(label);

    input.addEventListener('input', () => {
        // Проверяем, заполнен ли хоть один из инпутов
        const isAnyFilled = Array.from(inputs).some(i => i.value.trim() !== '');

        // Если заполнен, удаляем required у всех, чтобы форма отправилась.
        // Если пустые — возвращаем required обратно
        inputs.forEach(i => {
            if (isAnyFilled) {
                i.removeAttribute('required');
            } else {
                i.setAttribute('required', 'required');
            }
        });
    });

    imagesContainer.appendChild(li);
});






//настраиваем обработчики закрытия попапов
const allPopups = document.querySelectorAll(".popup");
allPopups.forEach((popup) => {
    setCloseModalWindowEventListeners(popup);
});

getUser(currentUserId)
    .then((currentUser) => mainSideBarProfileBtn.href = `profile.html?user_name=${currentUser.user_name}`)
    .catch((err) => {
        console.log(err);
    });

// Создание объекта с настройками валидации
const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button_submit",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationSettings);

getUserByUsername(getTrackedUserName())
    .then((user) => {
        trackedUserId = user.id;

        if (currentUserId !== trackedUserId) {
            openPostFormButton.remove();
            openChatButton.href = `messenger.html?user_id=${trackedUserId}`;
        } else {
            openChatButton.remove();
        }

        return getUserPosts(user.id)
            .then((posts) => {
                return [user, posts];
            })
    })
    .then(([trackedUser, posts]) => {
        // рендер профиля
        insertProfileHeader(
            trackedUser, currentUserId,
            {
                onOpenMenu: openContextMenu,
                onOpenFullInfo: handleFullProfileInfo,
                onOpenEditForm: openEditProfileForm
            }
        );

        // рендер постов
        posts.forEach(post => {
            const postWithAuthor = {
                ...post,
                author: {
                    name: trackedUser.name,
                    avatar: trackedUser.avatar
                }
            };

            postsContainer.prepend(
                createPostElement(
                    postWithAuthor,
                    {
                        onPreviewPicture: handlePreviewPicture,
                        onLikeIcon: handleLikePostButton,
                        onOpenMenu: openContextMenu,
                        onShowMoreText: showMoreText,
                        onScrollGallery: scrollTrack,
                        onDeletePost: handleDeletePostButton,
                        setLikesCount: changeLikesCount,
                    },
                    currentUserId,
                    trackedUser.user_name
                )
            );
        });

    })
    .catch((err) => {
        console.log(err);
    });