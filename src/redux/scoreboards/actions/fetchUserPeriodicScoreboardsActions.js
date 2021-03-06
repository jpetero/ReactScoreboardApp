import axios from 'axios';
import config from '../../../config/config';
import {
  FETCH_SCOREBOARDS_REQUEST,
  FETCH_SCOREBOARDS_SUCCESS,
  FETCH_SCOREBOARDS_FAILURE
} from '../actionsTypes/fetchScoreboardsActionTypes';

export const fetchUserPeriodicScoreboards = (period, userId) => {
  return dispatch => {
    dispatch(fetchScoreboardsRequest());
    axios
      .get(`${config.baseUrl}/scoreboards/user/${userId}/${period}`)
      .then(response => dispatch(fetchScoreboardsSuccess(response.data)))
      .catch(error => dispatch(fetchScoreboardsFailure(error.response)));
  };
};

export const fetchScoreboardsRequest = () => {
  return {
    type: FETCH_SCOREBOARDS_REQUEST
  };
};

export const fetchScoreboardsSuccess = users => {
  return {
    type: FETCH_SCOREBOARDS_SUCCESS,
    payload: users
  };
};

export const fetchScoreboardsFailure = error => {
  return {
    type: FETCH_SCOREBOARDS_FAILURE,
    payload: error
  };
};
