// ФАЙЛ API РАЗДЕЛЕН НА 2 ТАК КАК В ИСПОЛЬЗУЮЩЕЙСЯ БЕСПЛАТНОЙ ВЕРСИИ API ВОЗМОЖНО СОЗДАТЬ ТОЛЬКО 2 СУЩНОСТИ, ПОЭТОМУ БЫЛО ИСПОЛЬЗОВАННО 2 АККАУНТА ПО 2 СУЩНОСТИ

const config = {
  baseUrl: "https://6a00845c2b7ab34960306478.mockapi.io/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

// ==================== CHATS ====================

// получить все чаты
const getChats = () => {
  return fetch(`${config.baseUrl}/chats`, {
    headers: config.headers,
  }).then(getResponseData);
};

// получить один чат
export const getChat = (chatId) => {
  return fetch(`${config.baseUrl}/chats/${chatId}`, {
    headers: config.headers,
  }).then(getResponseData);
};

// найти чат между двумя пользователями
export const findChatBetweenUsers = async (userId1, userId2) => {
  const chats = await getChats();
  return chats.find(chat => 
    chat.participants.includes(userId1) && 
    chat.participants.includes(userId2)
  );
};

// получить все чаты пользователя
export const getUserChats = async (userId) => {
  const chats = await getChats();
  return chats.filter(chat => chat.participants.includes(userId));
};

// создать чат
export const createChat = (participants) => {
  return fetch(`${config.baseUrl}/chats`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      participants,
      lastMessageId: null,
      unreadCount: 0,
    }),
  }).then(getResponseData);
};

// создать или получить существующий чат
export const getOrCreateChat = async (userId1, userId2) => {
  const existingChat = await findChatBetweenUsers(userId1, userId2);
  if (existingChat) {
    return existingChat;
  }
  return createChat([userId1, userId2]);
};

// удалить чат
export const deleteChat = (chatId) => {
  return fetch(`${config.baseUrl}/chats/${chatId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};

// обновить чат
export const updateChat = (chatId, data) => {
  return fetch(`${config.baseUrl}/chats/${chatId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(getResponseData);
};

// обновить количество непрочитанных сообщений
export const updateUnreadCount = (chatId, unreadCount) => {
  return fetch(`${config.baseUrl}/chats/${chatId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify({ unreadCount }),
  }).then(getResponseData);
};

// обновить последнее сообщение в чате
export const updateLastMessageId = (chatId, messageId) => {
  return fetch(`${config.baseUrl}/chats/${chatId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify({ lastMessageId: messageId }),
  }).then(getResponseData);
};

// получить последнее сообщение чата с полными данными
export const getLastMessageData = async (chatId) => {
  const chat = await getChat(chatId);
  if (!chat.lastMessageId) {
    return null;
  }
  return getMessage(chat.lastMessageId);
};

// получить все чаты с данными последнего сообщения
export const getChatsWithLastMessage = async (userId) => {
  const chats = await getUserChats(userId);
  
  const chatsWithLastMessage = await Promise.all(
    chats.map(async (chat) => {
      let lastMessageData = null;
      if (chat.lastMessageId) {
        try {
          lastMessageData = await getMessage(chat.lastMessageId);
        } catch (error) {
          console.error(`Failed to fetch message ${chat.lastMessageId}:`, error);
        }
      }
      return {
        ...chat,
        lastMessageData
      };
    })
  );
  
  return chatsWithLastMessage.sort((a, b) => {
    if (!a.lastMessageData) return 1;
    if (!b.lastMessageData) return -1;
    return new Date(b.lastMessageData.sentAt) - new Date(a.lastMessageData.sentAt);
  });
};

// удалить чат и все его сообщения
export const deleteChatWithMessages = async (chatId) => {
  const messages = await getChatMessages(chatId);
  const deletePromises = messages.map(msg => deleteMessage(msg.id));
  await Promise.all(deletePromises);
  await deleteChat(chatId);
  return true;
};

// ==================== MESSAGES ====================

// получить все сообщения
export const getMessages = () => {
  return fetch(`${config.baseUrl}/messages`, {
    headers: config.headers,
  }).then(getResponseData);
};

// получить одно сообщение
export const getMessage = (messageId) => {
  return fetch(`${config.baseUrl}/messages/${messageId}`, {
    headers: config.headers,
  }).then(getResponseData);
};

// получить все сообщения чата (без сортировки на сервере)
export const getChatMessages = (chatId) => {
  return fetch(`${config.baseUrl}/messages?chatId=${chatId}`, {
    headers: config.headers,
  })
    .then(getResponseData)
    .then((messages) => {
      // сортируем на клиенте по времени от старых к новым
      return messages.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));
    });
};

// получить последние N сообщений чата (сортировка на клиенте)
export const getRecentChatMessages = (chatId, limit = 50) => {
  return fetch(`${config.baseUrl}/messages?chatId=${chatId}`, {
    headers: config.headers,
  })
    .then(getResponseData)
    .then((messages) => {
      // сортируем от новых к старым и берем последние N
      const sorted = messages.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
      return sorted.slice(0, limit);
    });
};

// создать сообщение
export const createMessage = ({ chatId, senderId, text, status = "sent" }) => {
  return fetch(`${config.baseUrl}/messages`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      chatId,
      senderId,
      text,
      sentAt: new Date().toISOString(),
      status,
    }),
  }).then(getResponseData);
};

// удалить сообщение
export const deleteMessage = (messageId) => {
  return fetch(`${config.baseUrl}/messages/${messageId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};

// обновить статус сообщения
export const updateMessageStatus = (messageId, status) => {
  return fetch(`${config.baseUrl}/messages/${messageId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify({ status }),
  }).then(getResponseData);
};

// обновить текст сообщения
export const updateMessageText = (messageId, text) => {
  return fetch(`${config.baseUrl}/messages/${messageId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify({ text }),
  }).then(getResponseData);
};

// отправить сообщение и обновить чат
export const sendMessageOnServer = async (chatId, senderId, text) => {
  const newMessage = await createMessage({ chatId, senderId, text, status: "sent" });
  const chat = await getChat(chatId);
  const otherParticipants = chat.participants.filter(id => id !== senderId);
  
  await updateChat(chatId, {
    lastMessageId: newMessage.id,
    unreadCount: chat.unreadCount + otherParticipants.length
  });
  
  return newMessage;
};

// отметить сообщения как прочитанные в чате
export const markMessagesAsRead = async (chatId, userId) => {
  const messages = await getChatMessages(chatId);
  
  const unreadMessages = messages.filter(
    msg => msg.senderId !== userId && msg.status !== "read"
  );
  
  const updatePromises = unreadMessages.map(msg => 
    updateMessageStatus(msg.id, "read")
  );
  
  await Promise.all(updatePromises);
  
  const chat = await getChat(chatId);
  if (chat.unreadCount > 0) {
    await updateUnreadCount(chatId, 0);
  }
  
  return unreadMessages.length;
};

// получить общее количество непрочитанных сообщений пользователя
export const getUnreadMessagesCount = async (userId) => {
  const userChats = await getUserChats(userId);
  let totalUnread = 0;
  
  for (const chat of userChats) {
    const messages = await getChatMessages(chat.id);
    const unreadInChat = messages.filter(
      msg => msg.senderId !== userId && msg.status !== "read"
    ).length;
    totalUnread += unreadInChat;
  }
  
  return totalUnread;
};