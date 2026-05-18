export const initialProfile =
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

export const initialPosts = [
  {
    "id": "1",
    "images": [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
    ],
    "text": "Мастер Йода — один из самых могущественных, мудрых и старых гранд-мастеров Ордена джедаев во вселенной «Звёздных войн». Это миниатюрное зеленое существо неизвестной расы, прожившее около 900 лет, которое обучало джедаев на протяжении 8 веков, включая таких героев, как Люк Скайуокер, и славится уникальной манерой речи.",
    "likes": [
      "1",
      "2",
      "3",
      "4"
    ],
    "createdAt": "2024-01-15T18:30:00Z",
    "userId": "1"
  },
  {
    "id": "2",
    "images": [
      "/example_images/FirstCoin.png"
    ],
    "text": "Нашел монету, хватит на газировку)",
    "likes": [
      "1",
      "2",
      "3",
      "4"
    ],
    "createdAt": "2024-01-14T12:15:00Z",
    "userId": "2"
  },
  {
    "id": "3",
    "images": [
      "/example_images/dino.jpeg",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad"
    ],
    "text": "Жить или не жить? Вот в чем вопрос.",
    "likes": [
      "1",
      "2",
      "3",
      "4"
    ],
    "createdAt": "2024-01-14T12:15:00Z",
    "userId": "3"
  },
  {
    "id": "4",
    "images": [],
    "text": "Пять Великих Грешников Каэнри'ах — это элитная группа ученых и лидеров падшего королевства, которые обрели силу Бездны, превышающую мощь Архонтов, и стали виновниками катастрофы 500 лет назад. В их число входят Ведрфёльнир («Провидец»), Рэйндоттир («Золото»), Сурталоги («Рыцарь Скверны»), Хрофтатюр («Мудрец») и Рери («Лунный Мститель»). Изначально они стремились защитить королевство, но их действия привели к созданию монстров и разрушению мира.",
    "likes": [
      "1",
      "2",
      "3",
      "4"
    ],
    "createdAt": "2024-01-14T12:15:00Z",
    "userId": "4"
  }
];

export let examplePost = {
    images: [

    ],
    text: '',
    likes: 128,
    createdAt: '2024-01-15T18:30:00Z',
    author: {
        name: 'Simon Petrikov',
        avatar: '/example_images/SnowKingAva.jpg'
    }
};

export const currentUserId = "1";

export const getTrackedUserName = () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("user_name");
    
    return username;
};

export const getTrackedUserId = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("user_id");
    
    return userId;
};

// Функция для обновления URL без перезагрузки страницы
export const setChatPartnerId = (userId) => {
    const url = new URL(window.location);
    url.searchParams.set('user_id', userId);
    // или user_id для собеседника, но тогда конфликт с текущим user_id
    window.history.pushState({}, '', url);
};

export const initialChats = [
  {
    "id": "1",
    "participants": [
      "1",
      "2"
    ],
    "lastMessageId": "1",
    "unreadCount": "1"
  },
  {
    "chatId": "1",
    "senderId": "2",
    "text": "Sun lights my way today",
    "sentAt": "2026-05-16T20:54:29.352Z",
    "status": "sent",
    "id": "2"
  }
];

// статус сообщения (sent, delivered, read)
export const initialMessages = [
  {
    "id": "1",
    "chatId": "1",
    "senderId": "1",
    "text": "Луна прекрасна, но не сегодня",
    "sentAt": "2024-01-15T18:30:00Z",
    "status": "delivered"
  }
];