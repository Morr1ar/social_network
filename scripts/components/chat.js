export const toggleChat = (chatsContainer, chatWindowDetails, chatWindow, chatInputArea) => {
    chatsContainer.classList.toggle('not_visible');
    chatWindowDetails.classList.toggle('not_visible');
    chatWindow.classList.toggle('not_visible');
    chatInputArea.classList.toggle('not_visible');
};

const getChatTemplate = () => {
    return document
        .getElementById("chat-template")
        .content.querySelector(".chat__item")
        .cloneNode(true);
};

export const createChatElement = (
    chat,
    { onOpenChat, onOpenMenu, onDeleteChat }
) => {
    const chatElement = getChatTemplate();
    const chatInfo = chatElement.querySelector('.chat-info');
    
    const contextMenuButton = chatElement.querySelector(".context__menu-btn");
    const contextMenu = chatElement.querySelector('.context__menu');
    const deleteButton = contextMenu.querySelector(".deleteChatBtn");

    chatInfo.querySelector('.partner-avatar').src = chat.partner.avatar;
    chatInfo.querySelector('.partner-avatar').loading = 'lazy';
    chatInfo.querySelector('.partner-avatar').alt = chat.partner.name;
    chatInfo.querySelector('.partner-name').textContent = chat.partner.name;
    chatInfo.querySelector('.lastMessage').textContent = chat.lastMessage;

    chatElement.addEventListener('click', (evt) => {
        if (!evt.target.closest('.contextMenuWrapper')) {
            onOpenChat(chat);
        } else {
            if (onOpenMenu) {
                contextMenuButton.addEventListener("click", () => onOpenMenu(contextMenuButton, contextMenu));
            }
        }
    });

    /* Прослушки кнопок в контекстном меню */
    if (onDeleteChat) {
        deleteButton.addEventListener('click', () => onDeleteChat(chatElement, chat.id));
    }
    
    return chatElement;
};

export const insertChatWindowDetails = (
    chat,
    chatWindowDetails
) => {
    const chatInfo = chatWindowDetails.querySelector('.chat-info');

    chatInfo.querySelector('.partner-avatar').src = chat.partner.avatar;
    chatInfo.querySelector('.partner-avatar').loading = 'lazy';
    chatInfo.querySelector('.partner-avatar').alt = chat.partner.name;
    chatInfo.querySelector('.partner-name').textContent = chat.partner.name;
    chatInfo.href = `profile.html?user_name=${chat.partner.user_name}`;
};

const getMessageTemplate = () => {
    return document
        .getElementById("message-template")
        .content.querySelector(".message__item")
        .cloneNode(true);
};

export const createMessageElement = (
    message,
    userId
) => {
    const messageElement = getMessageTemplate();
    const messageInfo = messageElement.querySelector('.message');

    messageInfo.querySelector('.message__text').textContent = message.text;

    if (userId === message.senderId) {
        messageInfo.classList.add('sender');
    } else {
        messageInfo.classList.add('partner');
    }

    return messageElement;
};