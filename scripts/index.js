/*
  Файл index.js является точкой входа в наше приложение
  и только он должен содержать логику инициализации нашего приложения
  используя при этом импорты из других файлов

  Из index.js не допускается что то экспортировать
*/

import { currentUserId } from "./initialData.js";
import { openContextMenu } from "./special.js";
import { createPostElement, likePost, showMoreText, scrollTrack, changeLikesCount, isPostLiked } from "./components/post.js";
import { openModalWindow, setCloseModalWindowEventListeners } from "./components/modal.js";
import {
    getUsers, getUser, getUserByUsername,
    updateUser, updateAvatar, getPosts, createPost,
    deletePostOnServer, likePostOnServer, getUserPosts, checkUsername
} from './api.js';

// DOM узлы
const mainSideBarProfileBtn = document.getElementById('currentUser__profile-Button');
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


























// EventListeners
removePostForm.addEventListener("submit", handleRemovePostFormSubmit);









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

Promise.all([getPosts(), getUsers()])
    .then(([posts, users]) => {

        // создаём Map для быстрого доступа к пользователям
        const usersMap = new Map(users.map(user => [user.id, user]));
        
        // рендер постов
        posts.forEach(post => {
            const author = usersMap.get(post.userId);
            // защита от ошибки
            if (!author) return;

            const postWithAuthor = {
                ...post,
                author: {
                    name: author.name,
                    avatar: author.avatar
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
                    author.user_name
                )
            );
        });

    })
    .catch((err) => {
        console.log(err);
    });