import axios from 'axios';
import server from '../../Connections/Server.jsx';

export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const DELETE_BY_NAME = 'DELETE_BY_NAME';
export const ORDER_BY_CONTINENT = 'ORDER_BY_CONTINENT';
export const GET_ID_COUNTRIES = 'GET_ID_COUNTRIES';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const GET_BY_ID = 'GET_BY_ID';
export const FILTER_COUNTRY_BY_ACTIVITY = 'FILTER_COUNTRY_BY_ACTIVITY';
export const ORDERALFA = 'ORDERALFA';
export const ORDERPOB = 'ORDERPOB';

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(
        `${server.api.baseURL}/countries/?name=${name}`
      );
      return dispatch({
        type: GET_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteByName = (data) => {
  return {
    type: DELETE_BY_NAME,
    payload: data,
  };
};

export const getCountries = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`${server.api.baseURL}/countries/`);
      return dispatch({
        type: GET_COUNTRIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getActivities = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`${server.api.baseURL}/activities/`);
      return dispatch({
        type: GET_ACTIVITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getIdCountries = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`${server.api.baseURL}/countries/`);
      const id = data.map((country) => country.id);
      return dispatch({
        type: GET_ID_COUNTRIES,
        payload: id,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const orderByContinent = (continent) => {
  return {
    type: ORDER_BY_CONTINENT,
    payload: continent,
  };
};
export const postActivity = (activity) => {
  return async (dispatch) => {
    const {nombre, dificultad, duracion, temporada, countryId} = activity;
    countryId.forEach(async (country) => {
      const newActivity = {
        nombre,
        dificultad,
        duracion,
        temporada,
        countryId: country,
      };
      try {
        await axios.post(`${server.api.baseURL}/activities/`, newActivity);
        const activities = await axios.get(`${server.api.baseURL}/activities/`);
        return dispatch({
          type: POST_ACTIVITY,
          payload: activities.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    });
  };
};
export const getById = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`${server.api.baseURL}/countries/${id}`);
      return dispatch({
        type: GET_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const filterCountryByActivity = (activity) => {
  return {
    type: FILTER_COUNTRY_BY_ACTIVITY,
    payload: activity,
  };
};

export const orderAlfa = (order) => {
  return {
    type: ORDERALFA,
    payload: order,
  };
};
export const orderPob = (order) => {
  return {
    type: ORDERPOB,
    payload: order,
  };
};
