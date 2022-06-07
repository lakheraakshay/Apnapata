import client from './client'

export const getCountry = () => client.get('/countries/all')

export const getCity = payload => client.get('/cities/all?country=' + payload)

export const getTown = payload => client.get('/towns/all?city=' + payload)

export const addTown = payload => client.post('/towns/create', payload)
