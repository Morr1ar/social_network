const profileData = 
{
    name: 'Simon Petrikov',
    avatar: '/example_images/SnowKingAva.jpg', // Тут надо чтоб для каждой страницы своя фотка была
    user_name: '@SnowKing3000',
    bio: 'Гантер! Верни мне корону!',
    friends: [],
    subscriptions: [],
    country: 'Ice Kingdom',
    birth_date: '1204.01.01' // дата рождения надо доработать
};

// Функция для рендера профиля
function renderProfile(profile) {
    insertProfileHeader(profile);
}

// Функция заполнения шапки профиля
function insertProfileHeader(profile) {
    const profileHeader = document.querySelector('.profileHeader');
    const profileHeaderIn = profileHeader.querySelector('.profileHeader__in');

    profileHeaderIn.querySelector('.user-avatar').src = profile['avatar'];
    profileHeaderIn.querySelector('.user-avatar').loading = 'lazy';
    profileHeaderIn.querySelector('.profile-name').textContent = profile['name'];
    profileHeaderIn.querySelector('.profile-country').textContent = profile['country'];
    profileHeaderIn.querySelector('.profile-bio').textContent = profile['bio'];

    /* Кнопка контекстного меню */
    const contextMenu_btn = profileHeaderIn.querySelector('.context__menu-btn');
    const contextMenu = profileHeaderIn.querySelector('.context__menu');
    contextMenu_btn.addEventListener('click', function (evt) {
        // Останавливаем событие - оно не пойдет дальше к родителю
        evt.stopPropagation(); // ну... возможно это костыль а может и нет

        contextMenu.classList.add('active');

        contextMenu.addEventListener('mouseleave', function (evt) {
            contextMenu.classList.remove('active');
        });

        /* Закрытие контекстного меню при касании экрана вне меню */
        document.addEventListener('touchstart', function (evt) {
            if (!evt.target.closest('.context__menu')) {
                contextMenu.classList.remove('active');
            }
        });
    });

    /* Прослушки кнопок в контекстном меню */
    document.getElementById('moreBtn').addEventListener('click', function (evt) {
        document.getElementById('full__profileInfo').classList.add('active');
        insertProfileFullInfo(profile);
    });
};

// Функция заполнения подробной информации профиля профиля
function insertProfileFullInfo(profile) {
    const profileFullInfo = document.getElementById('full__profileInfo');
    const profileHeader = profileFullInfo.querySelector('.profileHeader');
    const profileHeaderIn = profileHeader.querySelector('.profileHeader__in');

    profileHeaderIn.querySelector('.user-avatar').src = profile['avatar'];
    profileHeaderIn.querySelector('.user-avatar').loading = 'lazy';
    profileHeaderIn.querySelector('.profile-name').textContent = profile['name'];
    profileHeaderIn.querySelector('.profile-user_name').textContent = profile['user_name'];
    profileHeaderIn.querySelector('.profile-bio').textContent = profile['bio'];
    profileHeaderIn.querySelector('.profile-country').textContent = profile['country'];
    profileHeaderIn.querySelector('.profile-birth').textContent = profile['birth_date'];
    profileHeaderIn.querySelector('.profile-friendsCnt').textContent = profile['friends'].length;
    profileHeaderIn.querySelector('.profile-subscriptionsCnt').textContent = profile['subscriptions'].length;

    /* Кнопка контекстного меню */
    const contextMenu_btn = profileHeaderIn.querySelector('.context__menu-btn');
    const contextMenu = profileHeaderIn.querySelector('.context__menu');
    contextMenu_btn.addEventListener('click', function (evt) {
        // Останавливаем событие - оно не пойдет дальше к родителю
        evt.stopPropagation(); // ну... возможно это костыль а может и нет

        contextMenu.classList.add('active');

        contextMenu.addEventListener('mouseleave', function (evt) {
            contextMenu.classList.remove('active');
        });

        /* Закрытие контекстного меню при касании экрана вне меню */
        document.addEventListener('touchstart', function (evt) {
            if (!evt.target.closest('.context__menu')) {
                contextMenu.classList.remove('active');
            }
        });


    });
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderProfile(profileData);
});