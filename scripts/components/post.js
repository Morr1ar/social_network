export const likePost = (likeButton) => {
    //const likeIcon = likeButton.querySelector('.like-icon');

    //likeIcon.classList.toggle('is-liked');
    likeButton.classList.toggle('post__like-button_is-active')
};

export const isPostLiked = (likeButton) => {
  return likeButton.classList.contains("post__like-button_is-active");
};

export const changeLikesCount = (likesCountElement, likesCount) => {
    likesCountElement.textContent = likesCount;
};

export const showMoreText = (showMoreBtn, textElement) => {
    
    textElement.classList.toggle('text__overflow');

    showMoreBtn.textContent = textElement.classList.contains('text__overflow') ? 'подробнее' : 'скрыть';
};

export const deletePost = (postElement) => {
    postElement.remove();
};

export const scrollTrack = (track, direction) => {
    const itemWidth = track.querySelector('li').offsetWidth;
    // Скроллим на ширину элемента
    track.scrollBy({
        left: direction * (itemWidth),
        behavior: 'smooth'
    });
}

const getPostTemplate = () => {
    return document
        .getElementById("post-template")
        .content.querySelector(".post")
        .cloneNode(true);
};

export const createPostElement = (
    post,
    { onPreviewPicture, onLikeIcon, setLikesCount, onOpenMenu, onShowMoreText, onScrollGallery, onDeletePost },
    userId,
    author_userName
) => {
    const postElement = getPostTemplate();
    const profile = postElement.querySelector('.author-profile__link');
    const gallerytrack = postElement.querySelector('.galleryTrack');
    //const circleTrack = postElement.querySelector('.gallery-circleTrack');
    const textElement = postElement.querySelector('.text-content');

    const showMoreBtn = postElement.querySelector('.showMoreTextBtn');
    const likeButton = postElement.querySelector(".post__like-button");
    const likesCountElement = postElement.querySelector(".likesCount");
    const leftBtn = postElement.querySelector('.scroll-btn.left');
    const rightBtn = postElement.querySelector('.scroll-btn.right');
    
    const contextMenuButton = postElement.querySelector(".context__menu-btn");
    const contextMenu = postElement.querySelector('.context__menu');
    const deleteButton = contextMenu.querySelector(".deletePostBtn");
    //const cardImage = postElement.querySelector(".card__image");

    profile.querySelector('.author-avatar').src = post['author']['avatar'];
    profile.querySelector('.author-avatar').loading = 'lazy';
    profile.querySelector('.author-avatar').alt = post['author']['name'];
    profile.querySelector('.author-name').textContent = post['author']['name'];
    profile.href = `profile.html?user_name=${author_userName}`;

    post.images.forEach((imageUrl, index) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Изображение ${index + 1} к посту`;
        img.loading = 'lazy';
        li.append(img);
        gallerytrack.append(li);

        //circleTrack.append(document.createElement('li'));
    });

    textElement.textContent = post.text;
    // setTimeout пришлось использовать. без него if не срабатывал
    // Используем setTimeout или requestAnimationFrame, чтобы дождаться рендеринга
    setTimeout(() => {
        // Проверяем, есть ли переполнение
        if (textElement.scrollHeight > textElement.clientHeight) {
            showMoreBtn.style.display = 'block';
        }
    }, 0);

    const isLiked = post.likes.some((likedUserId) => likedUserId === userId);
    if (isLiked) {
        likeButton.classList.add("post__like-button_is-active");
    }
    setLikesCount(likesCountElement, post.likes.length);

    if (onLikeIcon) {
        likeButton.addEventListener("click", () => onLikeIcon(likeButton, post, likesCountElement));
    }

    if (onOpenMenu) {
        contextMenuButton.addEventListener("click", () => onOpenMenu(contextMenuButton, contextMenu));
    }

    if (onShowMoreText) {
        showMoreBtn.addEventListener("click", () => onShowMoreText(showMoreBtn, textElement));
    }

    /* Прослушки кнопок в контекстном меню */
    if (onDeletePost) {
        deleteButton.addEventListener('click', () => onDeletePost(postElement, post.id));
    }


    if (onPreviewPicture) {
        gallerytrack.addEventListener("click", (evt) => {
            if (evt.target.tagName === 'IMG') {
                onPreviewPicture({ name: evt.target.alt, link: evt.target.src });
            }
        });
    }

    if (onScrollGallery) {
        leftBtn.addEventListener('click', () => onScrollGallery(gallerytrack, -1));
        rightBtn.addEventListener('click', () => onScrollGallery(gallerytrack, 1));
    }

    if (userId !== post.userId) {
        deleteButton.remove();
    }

    return postElement;
};