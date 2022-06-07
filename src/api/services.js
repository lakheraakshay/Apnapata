import client from "./client";

export const createService = payload => client.post("/services/create", payload)

export const getAllConstruction = payload => 
  client.post("/services/construction/all?page="+payload.page, payload.body)

export const getAllArchitect = payload => client.get('/property/all?' + payload)

export const getAllInterior = payload => client.post('/services/interior/all?page=' + payload.page)

export const getAllVastu = payload => client.post('services/vastu/all?page=' + payload.page)