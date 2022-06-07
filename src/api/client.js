import axios from "axios";

const baseURL = "https://apnapata.herokuapp.com/api/v1";
export { baseURL };

const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(config => {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  if (token) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }
  return config;
}, null)

// client.interceptors.response.use(undefined, error => {
//   if (error.message.includes('409')) {
//     error.message = 'User already exists';
//   } else {
//     error.message = error.response.data.message
//       ? error.response.data.message
//       : error.response.data.error_info
//       ? error.response.data.error_info.msg
//       : "Something went wrong. Try again.";
//   }

//   return Promise.reject(error);
// });

export default client;
