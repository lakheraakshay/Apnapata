import client from "./client";

export const signup = payload => client.post("/user/auth/signup", payload);

export const sendOtpToPhoneNumber = payload => client.get("/user/auth/sendOtp/" + payload.phonenumber);

export const verifyPhoneNumber = payload => client.get(`/user/auth/verifyOtp/?phonenumber=${payload.phonenumber}&code=${payload.code}`);

export const userExists = payload => client.post(`/user/auth/userExist`, payload)

export const sendOtpToEmail = payload => client.get(`/user/auth/sendOtpMail/${payload.mail}`)

// ** Login apis **
export const loginWithEmail = (payload) => client.post(`/user/auth/loginMail`, payload);

export const loginWithPhoneNumber = (payload) => client.post(`/user/auth/loginPhone`, payload);

export const getUserProfile = () => client.get('/user/profile')

export const updateUserProfile = payload => client.patch('/user/profile', payload)
