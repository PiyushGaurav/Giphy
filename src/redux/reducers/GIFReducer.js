import {
  FETCH_GIF_REQUEST,
  FETCH_GIF_SUCCESS,
  FETCH_GIF_FAILURE,
  RESET_DATA,
} from './GIFTypes';

const initialState = {
  loading: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GIF_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_GIF_SUCCESS:
      return {
        loading: false,
        error: '',
      };
    case FETCH_GIF_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
