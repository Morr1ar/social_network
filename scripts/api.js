const config = {
  baseUrl: "https://69f353e4bd2396bf530fca0c.mockapi.io/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};



// ==================== USERS ====================

// получить всех пользователей
export const getUsers = () => {
  return fetch(`${config.baseUrl}/users`, {
    headers: config.headers,
  }).then(getResponseData);
};

// получить одного пользователя
export const getUser = (userId) => {
  return fetch(`${config.baseUrl}/users/${userId}`, {
    headers: config.headers,
  }).then(getResponseData);
};

export const getUserByUsername = (user_name) => {
  return fetch(`${config.baseUrl}/users?user_name=${user_name}`)
    .then(getResponseData)
    .then((data) => data[0]); // берём первого
};

// обновить профиль
export const updateUser = (userId, data) => {
  return fetch(`${config.baseUrl}/users/${userId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(getResponseData);
};

// обновить аватар
export const updateAvatar = (userId, avatar) => {
  return fetch(`${config.baseUrl}/users/${userId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then(getResponseData);
};



// ==================== POSTS ====================

// получить все посты
export const getPosts = () => {
  return fetch(`${config.baseUrl}/posts`, {
    headers: config.headers,
  }).then(getResponseData);
};

// создать пост
export const createPost = ({ text, images, userId }) => {
  return fetch(`${config.baseUrl}/posts`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      text,
      images,
      likes: [],
      createdAt: new Date().toISOString(),
      userId,
    }),
  }).then(getResponseData);
};

// удалить пост
export const deletePostOnServer = (postId) => {
  return fetch(`${config.baseUrl}/posts/${postId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};

// лайк / дизлайк
export const likePostOnServer = (post, isLiked, userId) => {
  // Создаём новый массив лайков
  const updatedLikes = isLiked
    ? post.likes.filter(id => id !== userId) // удаляем лайк
    : [...post.likes, userId];               // добавляем лайк
  
  // Создаём обновлённый пост
  const updatedPost = {
    ...post,
    likes: updatedLikes
  };
  
  // Отправляем PUT запрос с полным объектом
  return fetch(`${config.baseUrl}/posts/${post.id}`, {
    method: "PUT",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  }).then((res) => getResponseData(res));
};


// ==================== ДОПОЛНИТЕЛЬНО ====================

// получить посты конкретного пользователя
export const getUserPosts = (userId) => {
  return fetch(`${config.baseUrl}/posts?userId=${userId}`, {
    headers: config.headers,
  }).then(getResponseData);
};

// проверка username
export const checkUsername = (user_name) => {
  return fetch(`${config.baseUrl}/users?user_name=${user_name}`)
    .then(response => {
      // Если пользователь не найден (404) - возвращаем пустой массив
      if (response.status === 404) {
        return [];
      }
      // Для остальных статусов - используем getResponseData
      return getResponseData(response);
    });
};