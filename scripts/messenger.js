/*
  Файл index.js является точкой входа в наше приложение
  и только он должен содержать логику инициализации нашего приложения
  используя при этом импорты из других файлов

  Из index.js не допускается что то экспортировать
*/

import { currentUserId, getTrackedUserId, setChatPartnerId } from "./initialData.js";
import { openContextMenu } from "./special.js";
import { toggleChat, createChatElement, insertChatWindowDetails, createMessageElement } from "./components/chat.js";
import { openModalWindow, setCloseModalWindowEventListeners } from "./components/modal.js";
import {
    getUsers, getUser, getUserByUsername,
    updateUser, updateAvatar, getPosts, createPost,
    deletePostOnServer, likePostOnServer, getUserPosts, checkUsername
} from './api.js';
import {
    getUserChats, getMessage, getRecentChatMessages, /*getOrCreateChat,*/ findChatBetweenUsers, sendMessageOnServer, deleteChatWithMessages
} from './api2.js';

// DOM узлы
let trackedUserId = null;
let trackedChatId = null;

const mainSideBarProfileBtn = document.getElementById('currentUser__profile-Button');
// fffffffffffffffffffffffffffffffffffffffffffffffffffff
const chatsContainer = document.querySelector('.chatsContainer');
const chatWindowDetails = document.getElementById('chat__window-details');
const chatWindow = document.getElementById('chat__window');
const messagesContainer = document.querySelector('.messagesContainer');
const chatInputArea = document.querySelector('.chat-input-area');
const chatInput = document.getElementById('chat-input');
const sendMessageButton = document.getElementById('send-btn');

const removeChatModalWindow = document.querySelector(".popup_type_remove-chat");
const removeChatForm = removeChatModalWindow.querySelector(".popup__form");

let deleteChatElement = null;
let deleteChatId = null;

const renderLoading = (submitButton, defaultText, isLoading) => {
    const processedText = defaultText.trim();
    if (isLoading) {
        submitButton.textContent =
            processedText === "Создать" ? "Создание..." : processedText === "Да" ? "Удаление..." : "Сохранение...";
    } else {
        submitButton.textContent = processedText;
    }
}

const handleRemoveChatFormSubmit = (evt) => {
    evt.preventDefault();
    const submitButton = removeChatForm.querySelector(".popup__button");
    const defaultText = submitButton.textContent;
    renderLoading(submitButton, defaultText, true);
    deleteChatWithMessages(deleteChatId)
        .then(() => {
            deletePost(deleteChatElement);
            deleteChatElement = null;
            deleteChatId = null;
            closeModalWindow(removeChatModalWindow);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(submitButton, defaultText, false);
        });
};

const handleDeleteChatButton = (chatElement, chatId) => {
    deleteChatElement = chatElement;
    deleteChatId = chatId;
    openModalWindow(removeChatModalWindow);
};

const handleChat = async (chat) => {
    messagesContainer.innerHTML = '';
    trackedChatId = chat.id;

    insertChatWindowDetails(chat, chatWindowDetails);
    
    getRecentChatMessages(chat.id)
        .then((messages) => {
            messages.forEach((message) => {
                messagesContainer.prepend(
                    createMessageElement(
                        message,
                        currentUserId
                    )
                );
            });

            setChatPartnerId(chat.partner.id);
            toggleChat(chatsContainer, chatWindowDetails, chatWindow, chatInputArea);
        })
        .then(() => {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        })
        .catch((err) => {
            console.log(err);
        });
};

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        console.log("Отправлено:", message);
        // Здесь должен быть код для отправки сообщения на сервер (WebSocket или Fetch)
        sendMessageOnServer(trackedChatId, currentUserId, message)
            .then((newMessage) => {
                messagesContainer.append(
                    createMessageElement(
                        newMessage,
                        currentUserId
                    )
                );
            })
            .catch((err) => {
                console.log(err);
            });
        chatInput.value = ''; // Очистка поля
    }
}




// EventListeners
removeChatForm.addEventListener("submit", handleRemoveChatFormSubmit);

// Отправка по кнопке
sendMessageButton.addEventListener('click', sendMessage);

// Отправка по Enter, новая строка по Shift+Enter
chatInput.addEventListener('keydown', function(evt) {
    if (evt.key === 'Enter' && !evt.shiftKey) {
        evt.preventDefault();
        sendMessage();
    }
});

// Кнопка возвращения к списку чатов из окна чата
chatWindowDetails.querySelector('.backToChats-btn').addEventListener('click', () => {
    toggleChat(chatsContainer, chatWindowDetails, chatWindow, chatInputArea);
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

trackedUserId = getTrackedUserId();
if (trackedUserId) {
    Promise.all([getUser(trackedUserId), findChatBetweenUsers(currentUserId, trackedUserId)])
        .then(([partner, chat]) => handleChat(
            {
                ...chat,
                partner: {
                    id: partner.id,
                    name: partner.name,
                    avatar: partner.avatar,
                    user_name: partner.user_name
                }
            }
        ))
        .catch((err) => {
            console.log(err);
        });
}

getUserChats(currentUserId)
    .then((chats) => {
        // Для каждого чата получаем данные собеседника
        const chatsWithPartnerInfo = chats.map((chat) => {
            // Находим ID собеседника (не текущего пользователя)
            const partnerId = chat.participants.find(id => id !== currentUserId);
            const lastMessageId = chat.lastMessageId;
            
            // Получаем данные собеседника
            return Promise.all([getUser(partnerId), getMessage(lastMessageId)])
                .then(([partner, lastMessage]) => ({
                    ...chat,
                    partner: {
                        id: partner.id,
                        name: partner.name,
                        avatar: partner.avatar,
                        user_name: partner.user_name
                    },
                    lastMessage: lastMessage.text
                }));
        });

        // Ждем завершения всех запросов за данными собеседников
        return Promise.all(chatsWithPartnerInfo);
        
    })
    .then((chatsWithPartners) => {
        chatsWithPartners.forEach(chatWithPartner => {
            chatsContainer.prepend(
                createChatElement(
                    chatWithPartner,
                    {
                        onOpenChat: handleChat,
                        onOpenMenu: openContextMenu,
                        onDeleteChat: handleDeleteChatButton
                    }
                )
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });