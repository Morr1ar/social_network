const postsData = [
    {
        id: 1,
        images: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'
        ],
        text: 'Красивый закат сегодня! 🌅 Мастер Йода — один из самых могущественных, мудрых и старых гранд-мастеров Ордена джедаев во вселенной «Звёздных войн». Это миниатюрное зеленое существо неизвестной расы, прожившее около 900 лет, которое обучало джедаев на протяжении 8 веков, включая таких героев, как Люк Скайуокер, и славится уникальной манерой речи. Мастер Йода — один из самых могущественных, мудрых и старых гранд-мастеров Ордена джедаев во вселенной «Звёздных войн». Это миниатюрное зеленое существо неизвестной расы, прожившее около 900 лет, которое обучало джедаев на протяжении 8 веков, включая таких героев, как Люк Скайуокер, и славится уникальной манерой речи. Мастер Йода — один из самых могущественных, мудрых и старых гранд-мастеров Ордена джедаев во вселенной «Звёздных войн». Это миниатюрное зеленое существо неизвестной расы, прожившее около 900 лет, которое обучало джедаев на протяжении 8 веков, включая таких героев, как Люк Скайуокер, и славится уникальной манерой речи. Мастер Йода — один из самых могущественных, мудрых и старых гранд-мастеров Ордена джедаев во вселенной «Звёздных войн». Это миниатюрное зеленое существо неизвестной расы, прожившее около 900 лет, которое обучало джедаев на протяжении 8 веков, включая таких героев, как Люк Скайуокер, и славится уникальной манерой речи. ',
        likes: 128,
        createdAt: '2024-01-15T18:30:00Z',
        author: {
            name: 'Simon Petrikov',
            avatar: 'https://example.com/avatar.jpg'
        }
    },
    {
        id: 2,
        images: [
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad'
        ],
        text: 'Пляжный отдых ☀️',
        likes: 256,
        createdAt: '2024-01-14T12:15:00Z',
        author: {
            name: 'Morriar Gol D',
            avatar: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0'
        }
    },
    {
        id: 3,
        images: [
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad'
        ],
        text: 'Жить или не жить? Вот в чем вопрос.',
        likes: 256,
        createdAt: '2024-01-14T12:15:00Z',
        author: {
            name: 'MIMRIK',
            avatar: 'https://example.com/avatar.jpg'
        }
    },
    {
        id: 4,
        images: [
        ],
        text: "Пять Великих Грешников Каэнри'ах — это элитная группа ученых и лидеров падшего королевства, которые обрели силу Бездны, превышающую мощь Архонтов, и стали виновниками катастрофы 500 лет назад. В их число входят Ведрфёльнир («Провидец»), Рэйндоттир («Золото»), Сурталоги («Рыцарь Скверны»), Хрофтатюр («Мудрец») и Рери («Лунный Мститель»). Изначально они стремились защитить королевство, но их действия привели к созданию монстров и разрушению мира.",
        likes: 256,
        createdAt: '2024-01-14T12:15:00Z',
        author: {
            name: 'Ведрфёльнир',
            avatar: 'https://example.com/avatar.jpg'
        }
    }
];

// Функция для рендера всех постов
function renderPosts(posts) {
    const postsContainer = document.querySelector('.posts-container');
    postsContainer.innerHTML = ''; // Очищаем контейнер
    
    posts.forEach(post => {
        const postElement = createPost(post);
        postsContainer.append(postElement);
    });
}

// Функция создания поста
function createPost(post) {
    const postTemplate = document.querySelector('#post-template').content;
    const postElement = postTemplate.querySelector('.post').cloneNode(true);
    const profile = postElement.querySelector('.author-profile__link');
    const gallerytrack = postElement.querySelector('.galleryTrack');
    const circleTrack = postElement.querySelector('.gallery-circleTrack');
    const textElement = postElement.querySelector('.text-content');
    const likeContent = postElement.querySelector('.like__content');

    profile.querySelector('.author-avatar').src = post['author']['avatar'];
    profile.querySelector('.author-avatar').loading = 'lazy';
    profile.querySelector('.author-avatar').alt = post['author']['name'];
    profile.querySelector('.author-name').textContent = post['author']['name'];

    postElement.querySelector('.post-context__menu-btn').addEventListener('click', function (evt) {
        // Останавливаем событие - оно не пойдет дальше к родителю
        evt.stopPropagation(); // ну... возможно это костыль а может и нет

        postElement.querySelector('.post-context__menu').classList.add('active');

        postElement.querySelector('.post-context__menu').addEventListener('mouseleave', function (evt) {
            postElement.querySelector('.post-context__menu').classList.remove('active');
        });

        document.addEventListener('touchstart', function (evt) {
            if (!evt.target.closest('.post-context__menu')) {
                postElement.querySelector('.post-context__menu').classList.remove('active');
            }
        });
    });

    post.images.forEach((imageUrl, index) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Изображение ${index + 1} к посту`;
        img.loading = 'lazy';
        li.append(img);
        gallerytrack.append(li);

        circleTrack.append(document.createElement('li'));
    });
    /*circleTrack.querySelector('li').classList.add('active'); // первому элементу списка добавляем класс active
    gallerytrack.currentIndex = 0; // инициализация переменной нужной для функции прокрутки кружочков над фотками
    gallerytrack.scrollIndex = 0; // инициализация переменной нужной для сравнения текущей фотки с текущим кружком*/

    textElement.textContent = post.text;

    /* прослушку клика на текст чтобы разворачивать его если он скрыт */
    const showMoreBtn = textElement.closest('.text-container').querySelector('.showMoreBtn');
    // setTimeout пришлось использовать. без него if не срабатывал
    // Используем setTimeout или requestAnimationFrame, чтобы дождаться рендеринга
    setTimeout(() => {
        // Проверяем, есть ли переполнение
        if (textElement.scrollHeight > textElement.clientHeight) {
            showMoreBtn.style.display = 'block';
        }
    }, 0);

    showMoreBtn.addEventListener('click', function (evt) {
        textElement.classList.toggle('active');
        evt.target.textContent = textElement.classList.contains('text__overflow') ? 'подробнее' : 'скрыть';
    });

    /* прослушку клика на лайк */
    likeContent.querySelector('.like-icon').addEventListener('click', function (evt) {
        evt.currentTarget.classList.toggle('is-liked');

        if (evt.currentTarget.classList.contains('is-liked')) {
            post['likes']++
        } else {
            post['likes']--
        }

        likeContent.querySelector('.likesCount').textContent = post['likes'];
    });
    
    likeContent.querySelector('.likesCount').textContent = post['likes'];

    return postElement
}


function scrollGallery(element, direction) {
    const gallerytrack = element.closest('.post__images').querySelector('.galleryTrack');
    const itemWidth = gallerytrack.querySelector('.galleryTrack li').offsetWidth;
    // Скроллим на ширину элемента
    gallerytrack.scrollBy({
        left: direction * (itemWidth),
        behavior: 'smooth'
    });
/*
    const circleTrackList = element.closest('.post__images').querySelectorAll('.gallery-circleTrack li');
    
    gallerytrack.currentIndex += direction;
    if (gallerytrack.currentIndex > circleTrackList.length - 1) {
        gallerytrack.currentIndex--;
        return;
    } else if (gallerytrack.currentIndex < 0) {
        gallerytrack.currentIndex++;
        return;
    }

    circleTrackList.forEach(circle => circle.classList.remove('active'));
    circleTrackList[gallerytrack.currentIndex].classList.add('active');*/
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderPosts(postsData);
});
