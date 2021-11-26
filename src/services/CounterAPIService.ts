import { Counter, SimpleResponse } from "../shared/types";

const API_BASE_URL = process.env.REACT_APP_API_URL;

function post():Promise<Counter> {
  let counterToCreate: Counter = {
    id: 0,
    count: 0
  }

  const requestOptions = createRequestOptionsWithBody("POST", counterToCreate);

  return fetch(API_BASE_URL + '/counter', requestOptions)
    .then(response => validateResponse(response));
}

function getAll():Promise<Counter[]> {
  console.dir(process.env);
  return fetch(API_BASE_URL + '/counter')
  .then(response => validateResponse(response));
}

function putIncrement(counterToUpdate:Counter):Promise<Counter> {
  counterToUpdate.count++;
  const requestOptions = createRequestOptionsWithBody("PUT", counterToUpdate);

  return fetch(API_BASE_URL + '/counter', requestOptions)
  .then(response => validateResponse(response));
}

function deleteOne(counterId:number):Promise<SimpleResponse> {
  const requestOptions:RequestInit = {
    method: 'DELETE'
  };

  return fetch(API_BASE_URL + '/counter/' + counterId, requestOptions)
  .then(response => validateResponse(response));
}

function validateResponse(response:Response):Promise<any> {
  if (response.ok) {
    return response.json();
  }

  let error:Error = new Error("Error when executing request. Response Status Code: " + response.status);
  throw error;
}

function createRequestOptionsWithBody(method: string, counter: Counter): RequestInit {
  const requestOptions:RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(counter)
  };
  return requestOptions;
}

export let counterApiService = {
  post,
  getAll,
  putIncrement,
  deleteOne
}