import axios from 'axios'

// Создаем экземпляр axios
export const api = axios.create({
  baseURL: `https://api.${process.env.NEXT_PUBLIC_EN_DOMAIN}`,
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

// // Добавляем интерцептор для логирования запросов
// api.interceptors.request.use(
//   config => {
//     console.log('Отправка запроса:', {
//       url: config.url,
//       method: config.method,
//       params: config.params
//     })
//     return config
//   },
//   error => {
//     console.error('Ошибка при отправке запроса:', error)
//     return Promise.reject(error)
//   }
// )

// // Добавляем интерцептор для логирования ответов
// api.interceptors.response.use(
//   response => {
//     console.log('Получен ответ:', {
//       status: response.status,
//       data: response.data ? (Array.isArray(response.data) ? `Array[${response.data.length}]` : typeof response.data) : null
//     })
//     return response
//   },
//   error => {
//     console.error('Ошибка ответа:', error.message, error.response?.status)
//     return Promise.reject(error)
//   }
// )
