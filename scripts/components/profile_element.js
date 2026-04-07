// Функция заполнения шапки профиля
export const insertProfileHeader = (
    profile,
    { onOpenMenu, onOpenFullInfo }
) => {
    const profileHeaderIn = document.querySelector('.profileHeader__in');

    const contextMenuButton = profileHeaderIn.querySelector('.context__menu-btn');
    const contextMenu = profileHeaderIn.querySelector('.context__menu');
    const moreInfoBtn = contextMenu.querySelector('.moreInfoBtn');

    profileHeaderIn.querySelector('.user-avatar').src = profile['avatar'];
    profileHeaderIn.querySelector('.user-avatar').loading = 'lazy';
    profileHeaderIn.querySelector('.profile-name').textContent = profile['name'];
    profileHeaderIn.querySelector('.profile-country').textContent = profile['country'];
    profileHeaderIn.querySelector('.profile-bio').textContent = profile['bio'];

    if (onOpenMenu) {
        contextMenuButton.addEventListener("click", () => onOpenMenu(contextMenuButton, contextMenu));
    }

    /* Прослушки кнопок в контекстном меню */
    if (onOpenFullInfo) {
        moreInfoBtn.addEventListener('click', () => onOpenFullInfo(profile));
    }
};

// Функция заполнения подробной информации профиля профиля
export const insertProfileFullInfo = (
    profile,
    profileFullInfoElement
) => {
    const profileHeaderIn = profileFullInfoElement.querySelector('.profileHeader__in');

    profileHeaderIn.querySelector('.user-avatar').src = profile['avatar'];
    profileHeaderIn.querySelector('.user-avatar').loading = 'lazy';
    profileHeaderIn.querySelector('.profile-name').textContent = profile['name'];
    profileHeaderIn.querySelector('.profile-user_name').textContent = profile['user_name'];
    profileHeaderIn.querySelector('.profile-bio').textContent = profile['bio'];
    profileHeaderIn.querySelector('.profile-country').textContent = profile['country'];
    profileHeaderIn.querySelector('.profile-birth').textContent = profile['birth_date'];
    profileHeaderIn.querySelector('.profile-friendsCnt').textContent = profile['friends'].length;
    profileHeaderIn.querySelector('.profile-subscriptionsCnt').textContent = profile['subscriptions'].length;
};
