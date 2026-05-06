



// Функция заполнения шапки профиля
export const insertProfileHeader = (
    profileOwner, userId,
    { onOpenMenu, onOpenFullInfo, onOpenEditForm }
) => {
    const profileHeaderIn = document.querySelector('.profileHeader__in');

    const contextMenuButton = profileHeaderIn.querySelector('.context__menu-btn');
    const contextMenu = profileHeaderIn.querySelector('.context__menu');
    const moreInfoBtn = contextMenu.querySelector('.moreInfoBtn');
    const editInfoBtn = contextMenu.querySelector('.editInfoBtn');

    profileHeaderIn.querySelector('.user-avatar').src = profileOwner['avatar'];
    profileHeaderIn.querySelector('.user-avatar').loading = 'lazy';
    profileHeaderIn.querySelector('.profile-name').textContent = profileOwner['name'];
    profileHeaderIn.querySelector('.profile-country').textContent = profileOwner['country'];
    profileHeaderIn.querySelector('.profile-bio').textContent = profileOwner['bio'];

    if (onOpenMenu) {
        contextMenuButton.addEventListener("click", () => onOpenMenu(contextMenuButton, contextMenu));
    }

    /* Прослушки кнопок в контекстном меню */
    if (onOpenFullInfo) {
        moreInfoBtn.addEventListener('click', () => onOpenFullInfo());
    }

    if (onOpenEditForm) {
        editInfoBtn.addEventListener('click', () => onOpenEditForm());
    }

    if (userId !== profileOwner.id) {
        editInfoBtn.remove();
    }
};

// Функция заполнения подробной информации профиля профиля
export const insertProfileFullInfo = (
    profile,
    fullProfileHeaderIn
) => {
    fullProfileHeaderIn.querySelector('.user-avatar').src = profile['avatar'];
    fullProfileHeaderIn.querySelector('.user-avatar').loading = 'lazy';
    fullProfileHeaderIn.querySelector('.profile-name').textContent = profile['name'];
    fullProfileHeaderIn.querySelector('.profile-user_name').textContent = profile['user_name'];
    fullProfileHeaderIn.querySelector('.profile-bio').textContent = profile['bio'];
    fullProfileHeaderIn.querySelector('.profile-country').textContent = profile['country'];
    fullProfileHeaderIn.querySelector('.profile-birth').textContent = profile['birth_date'];
    fullProfileHeaderIn.querySelector('.profile-friendsCnt').textContent = profile['friends'].length;
    fullProfileHeaderIn.querySelector('.profile-subscriptionsCnt').textContent = profile['subscriptions'].length;
};
