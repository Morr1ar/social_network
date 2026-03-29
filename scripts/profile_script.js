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

// Функция создания шапки профиля
function insertProfileHeader(profile) {
    const profileHeader = document.querySelector('.profileHeader');
    const profileHeaderIn = profileHeader.querySelector('.profileHeader__in');

    profileHeaderIn.querySelector('.user-avatar').src = profile['avatar'];
    profileHeaderIn.querySelector('.user-avatar').loading = 'lazy';
    profileHeaderIn.querySelector('.profile-name').textContent = profile['name'];
    document.getElementById('profile-country').textContent = profile['country'];
    document.getElementById('profile-bio').textContent = profile['bio'];

    profileHeaderIn.querySelector('.context__menu-btn').addEventListener('click', function (evt) {
        // Останавливаем событие - оно не пойдет дальше к родителю
        evt.stopPropagation(); // ну... возможно это костыль а может и нет

        profileHeaderIn.querySelector('.context__menu').classList.add('active');

        profileHeaderIn.querySelector('.context__menu').addEventListener('mouseleave', function (evt) {
            profileHeaderIn.querySelector('.context__menu').classList.remove('active');
        });

        document.addEventListener('touchstart', function (evt) {
            if (!evt.target.closest('.context__menu')) {
                profileHeaderIn.querySelector('.context__menu').classList.remove('active');
            }
        });
    });
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderProfile(profileData);
});