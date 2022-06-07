import client from "./client";

export const createProperty = (payload) =>
  client.post("/property/create", payload);

export const getProperties = (payload) =>
  client.post(`/property/all?page=${payload.page}`);

export const getProperty = (payload) => client.get(`/property/${payload.id}`);

export const getPropertyType = () => client.get('/propertytype/all');
