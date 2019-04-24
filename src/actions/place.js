import { login, errorLogin, FETCH_FACTORIES_BEGIN, FETCH_FACTORIES_SUCCESS, FETCH_FACTORIES_FAILURE } from './types';

export const loginUser = (data) => {

  return {
    type: login,
    data: data
  };
}

export const postLoginError = (message) => {

  return {
    type: errorLogin,
    message: message
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function fetchFactories(token) {
  return dispatch => {
    dispatch(fetchFactoriesBegin());
    return fetch('https://code-challenge.quizrr.se/api/factory', {
  method: 'GET',
  headers: {
   Accept: 'application/json',
   'Content-Type': 'application/json',
   Authorization: "Bearer " + token
  },
  })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchFactoriesSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchFactoriesFailure(error)));
  };
}


export const fetchFactoriesBegin = () => ({
  type: FETCH_FACTORIES_BEGIN
});

export const fetchFactoriesSuccess = factories => ({
  type: FETCH_FACTORIES_SUCCESS,
  payload: factories
});

export const fetchFactoriesFailure = error => ({
  type: FETCH_FACTORIES_FAILURE,
  payload: { error }
});
