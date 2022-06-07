import client from './client'

export const uploadPhoto = payload => client.post('/upload/images', payload)

export const uploadVideo = payload => client.post('/upload/videos', payload)