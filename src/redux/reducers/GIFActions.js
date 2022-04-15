import {
  FETCH_GIF_REQUEST,
  FETCH_GIF_SUCCESS,
  FETCH_GIF_FAILURE,
  RESET_DATA,
} from './GIFTypes';

export const fetchGIFRequest = () => {
  return {
    type: FETCH_GIF_REQUEST,
  };
};

export const fetchGIFSuccess = gifs => {
  return {
    type: FETCH_GIF_SUCCESS,
    payload: gifs,
  };
};

export const fetchGIFFailure = error => {
  return {
    type: FETCH_GIF_FAILURE,
    payload: error,
  };
};
