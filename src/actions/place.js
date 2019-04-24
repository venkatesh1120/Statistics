import { login, errorLogin,
  FETCH_FACTORIES_BEGIN, FETCH_FACTORIES_SUCCESS, FETCH_FACTORIES_FAILURE,
    FETCH_FACTORIES_DETAILS_BEGIN, FETCH_FACTORIES_DETAILS_SUCCESS, FETCH_FACTORIES_DETAILS_FAILURE,
    SET_SELECTED_ITEM,
    FETCH_MARKETS_BEGIN, FETCH_MARKETS_SUCCESS, FETCH_MARKETS_FAILURE,CLEARDATA
 } from './types';

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

export const clearData = () => {
  return {
    type: CLEARDATA
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

export function getMarketDetails(token) {
  console.log("get markets called");
  return dispatch => {
    dispatch(fetchMarketsBegin());
    return fetch('https://code-challenge.quizrr.se/api/market', {
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
        dispatch(fetchMarketsSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchMarketsFailure(error)));
  };
}

export function fetchFactoryDetails(token, itemId) {
  console.log('item id'+itemId);
  return dispatch => {
    dispatch(fetchFactoryDetailsBegin());
    fetch('https://code-challenge.quizrr.se/api/factory/'+itemId, {
  method: 'GET',
  headers: {
   Accept: 'application/json',
   'Content-Type': 'application/json',
   Authorization: "Bearer " + token
  },
  }) .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchFactoryDetailsSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchFactoryDetailsFailure(error)));
  };
}


export const setSelectedItem = (selectedItem) => ({
  type: SET_SELECTED_ITEM,
  selectedItem
});

export const fetchMarketsBegin = () => ({
  type: FETCH_MARKETS_BEGIN
});

export const fetchMarketsSuccess = markets => ({
  type: FETCH_MARKETS_SUCCESS,
  payload: markets
});

export const fetchMarketsFailure = error => ({
  type: FETCH_MARKETS_FAILURE,
  payload: { error }
});



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

export const fetchFactoryDetailsBegin = () => ({
  type: FETCH_FACTORIES_DETAILS_BEGIN
});

export const fetchFactoryDetailsSuccess = factoryDetails => ({
  type: FETCH_FACTORIES_DETAILS_SUCCESS,
  payload: factoryDetails
});

export const fetchFactoryDetailsFailure = error => ({
  type: FETCH_FACTORIES_DETAILS_FAILURE,
  payload: { error }
});
