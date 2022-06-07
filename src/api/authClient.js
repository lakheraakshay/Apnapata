// ** Axios interceptor for authentication
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "https://apnapata.herokuapp.com/api/v1";
export { baseURL };

const authTokens = JSON.parse(localStorage.getItem("authTokens"));

console.log("authTokens: ", authTokens);

const authClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWRjOGUzYTAzMmU2MDBkYzkxNzJkOGUiLCJpYXQiOjE2NDYzODI5MTAsImV4cCI6MTY0Njk4NzcxMCwiaXNzIjoiYXBuYXBhdGEifQ.SQX0MDAdI__y-Rm64PGXWZTEDAOTYgzY0YMbVynTtl4`,
  },
});

// authClient.interceptors.request.use(
//   async (config) => {
//     if (!authTokens) {
//       authTokens = localStorage.getItem("authTokens")
//         ? JSON.parse(localStorage.getItem("authTokens"))
//         : null;
//       config.headers.Authorization = `Bearer ${authTokens?.accessToken}`;
//     }

//     console.log("Here....");

//     const user = jwt_decode(authTokens);
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//     console.log("is expired: ", isExpired);

//     if (!isExpired) return config;

//     const response = await axios.post(`${baseURL}/user/auth/refreshToken`, {
//       refreshToken: authTokens.refreshToken,
//     });

//     console.log("REs: ", response);

//     localStorage.setItem("authTokens", JSON.stringify(response.tokens));
//     config.headers.Authorization = `Bearer ${response.tokens.accessToken}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default authClient;
