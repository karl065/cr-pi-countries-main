/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
import {
  GET_BY_NAME,
  GET_COUNTRIES,
  GET_ACTIVITIES,
  DELETE_BY_NAME,
  ORDER_BY_CONTINENT,
  GET_ID_COUNTRIES,
  POST_ACTIVITY,
  GET_BY_ID,
  FILTER_COUNTRY_BY_ACTIVITY,
  ORDERPOB,
  ORDERALFA,
} from './Actions.js';

const initialState = {
  countryByName: [],
  countries: [],
  filterCountries: [],
  idCountries: [],
  selectedIds: [],
  activities: [],
  countriesById: [],
};

const country = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_BY_NAME:
      return {
        ...state,
        countryByName: actions.payload,
      };
    case GET_COUNTRIES:
      const orderCountries = actions.payload;
      orderCountries.sort((a, b) => {
        if (a.nombre < b.nombre) {
          return -1;
        }
        if (a.nombre > b.nombre) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        countries: orderCountries,
      };
    case DELETE_BY_NAME:
      return {
        ...state,
        countryByName: actions.payload,
      };
    case ORDER_BY_CONTINENT:
      if (actions.payload === 'ALL') {
        return {
          ...state,
          countries: state.countries,
        };
      }
      const orderContinent = state.countries.filter((country) =>
        country.continente.includes(actions.payload)
      );
      return {
        ...state,
        filterCountries: orderContinent,
      };
    case GET_ID_COUNTRIES:
      return {
        ...state,
        idCountries: actions.payload,
      };
    case POST_ACTIVITY:
      return {
        ...state,
        activities: actions.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        countriesById: actions.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: actions.payload,
      };
    case FILTER_COUNTRY_BY_ACTIVITY:
      if (actions.payload.length === 0) {
        return {
          ...state,
          filterCountries: actions.payload,
        };
      }
      const filterCountryByActivity = state.countries.filter((country) => {
        const countryActivities = country.Activities.filter(
          (activity) => activity.nombre === actions.payload
        );
        return countryActivities.length > 0;
      });
      return {
        ...state,
        filterCountries: filterCountryByActivity,
      };
    case ORDERALFA:
      if (actions.payload === 'A') {
        const orderCountries = [...state.countries].sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        return {
          ...state,
          countries: orderCountries,
        };
      } else if (actions.payload === 'D') {
        const orderCountries = [...state.countries].sort((a, b) =>
          b.nombre.localeCompare(a.nombre)
        );
        return {
          ...state,
          countries: orderCountries,
        };
      }
      return state;
    case ORDERPOB:
      if (actions.payload === 'A') {
        const orderCountries = [...state.countries].sort((a, b) => {
          if (a.poblacion > b.poblacion) {
            return 1;
          }
          if (a.poblacion < b.poblacion) {
            return -1;
          }
          return 0;
        });
        return {
          ...state,
          countries: orderCountries,
        };
      } else if (actions.payload === 'D') {
        const orderCountries = [...state.countries].sort((a, b) => {
          if (a.poblacion > b.poblacion) {
            return -1;
          }
          if (a.poblacion < b.poblacion) {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          countries: orderCountries,
        };
      }
      return state;
    default:
      return state;
  }
};

export default country;
