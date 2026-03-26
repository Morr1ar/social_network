const profileData = 
{
    name: 'Simon Petrikov',
    avatar: 'https://example.com/avatar.jpg', // Тут надо чтоб для каждой страницы своя фотка была
    user_name: '@SnowKing3000',
    bio: 'Гантер! Верни мне корону!',
    friends: [],
    subscriptions: [],
    country: 'Ice Kingdom',
    birth_date: '' // дата рождения
};

// Функция для рендера профиля
function renderProfile(profile) {
    insertProfileHeader(profile);
}

// Функция создания шапки профиля
function insertProfileHeader(profile) {
    const profileHeader = document.querySelector('.profileHeader');
    const profileHeaderIn = profileHeader.querySelector('.profileHeader__in');

    profileHeaderIn.querySelector('.profile-avatar').src = profile['avatar'];
    profileHeaderIn.querySelector('.profile-avatar').loading = 'lazy';
    profileHeaderIn.querySelector('.profile-name').textContent = profile['name'];
    document.getElementById('prifile-country').textContent = profile['country']
    document.getElementById('prifile-bio').textContent = profile['bio']
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderProfile(profileData);
});