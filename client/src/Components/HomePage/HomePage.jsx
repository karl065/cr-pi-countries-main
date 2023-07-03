/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  deleteByName,
  filterCountryByActivity,
  getActivities,
  getCountries,
  orderAlfa,
  orderByContinent,
  orderPob,
} from '../../Utils/Redux/Actions';
import {connect} from 'react-redux';
import styles from './HomePage.module.css';
import {useEffect, useState} from 'react';
import Card from '../Card/Card.jsx';

const HomePage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countryDisp, setCountryDisp] = useState([]);
  const [selectActivity, setSelectActivity] = useState('All');
  const [selectContinent, setSelectContinent] = useState('All');
  const [activityOptions, setActivityOptions] = useState([]);
  const {
    countries,
    countryByName,
    filterCountries,
    activities,
    filterContinent,
  } = props;

  const countriesByPage = 10;
  let totalPages = 0;
  if (filterCountries.length === 0) {
    totalPages = Math.ceil(countries.length / countriesByPage);
  } else {
    totalPages = Math.ceil(filterCountries.length / countriesByPage);
  }
  const lastCountry = currentPage * countriesByPage;
  const firstCountry = lastCountry - countriesByPage;

  const deleteFind = () => {
    props.deleteByName([]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterContinent = (e) => {
    setCurrentPage(1);
    const selectValue = e.target.value;
    props.orderByContinent(selectValue);
    setSelectContinent(selectValue);
  };
  const handleFilterActivity = (e) => {
    const selectValue = e.target.value;
    props.filterCountryByActivity(selectValue);
    setSelectActivity(selectValue);
  };
  const handleOrderAlfa = (e) => {
    const selectValue = e.target.value;
    props.orderAlfa(selectValue);
  };
  const handleOrderPob = (e) => {
    const selectValue = e.target.value;
    props.orderPob(selectValue);
  };

  useEffect(() => {
    if (countryByName.length !== 0) {
      setCountryDisp(countryByName);
    } else if (filterCountries.length === 0 && selectActivity !== 'All') {
      setCountryDisp(filterCountries);
    } else if (filterCountries.length === 0 && selectContinent !== 'All') {
      setCountryDisp(filterContinent);
    } else if (filterCountries.length !== 0) {
      const currentCountries = filterCountries.slice(firstCountry, lastCountry);
      setCountryDisp(currentCountries);
    } else {
      const currentCountries = countries.slice(firstCountry, lastCountry);
      setCountryDisp(currentCountries);
    }
    setActivityOptions(
      activities
        .map((country) => country.nombre)
        .filter((activity, index, self) => self.indexOf(activity) === index)
    );
  }, [currentPage, countries, countryByName, filterCountries]);

  useEffect(() => {
    props.getCountries();
    props.getActivities();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.filtros}>
        <select onChange={handleFilterContinent}>
          <option value="All">All</option>
          <option value="Asia">Asia</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
        </select>
        <select onChange={handleFilterActivity}>
          <option value="All">All</option>
          {activityOptions.map((activity, index) => (
            <option value={activity} key={index}>
              {activity}
            </option>
          ))}
        </select>
        <select onChange={handleOrderAlfa}>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
        <select onChange={handleOrderPob}>
          <option value="A">Menor Poblacion</option>
          <option value="D">Mayor Poblacion</option>
        </select>
      </div>

      <div className={styles.filas}>
        {countryDisp.map((country, index) => (
          <div key={index} className={styles.columnas}>
            {
              <Card
                id={country.id}
                imagen={country.bandera}
                nombre={country.nombre}
                continente={country.continente}
              />
            }
          </div>
        ))}
      </div>
      <div className={styles.filas}>
        <button
          hidden={currentPage === 1 || countryDisp.length === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ← anterior
        </button>
        <h3>{currentPage}</h3>
        <h3>de</h3>
        <h3>{totalPages}</h3>
        <button
          className={styles.boton}
          hidden={currentPage === totalPages || countryDisp.length === 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          siguiente →
        </button>
        <button hidden={countryByName.length === 0} onClick={deleteFind}>
          All
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    countryByName: state.countryByName,
    activities: state.activities,
    countries: state.countries,
    filterCountries: state.filterCountries,
    filterContinent: state.filterContinent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => dispatch(getCountries()),
    getActivities: () => dispatch(getActivities()),
    deleteByName: (data) => dispatch(deleteByName(data)),
    orderByContinent: (continent) => dispatch(orderByContinent(continent)),
    filterCountryByActivity: (activity) =>
      dispatch(filterCountryByActivity(activity)),
    orderAlfa: (order) => dispatch(orderAlfa(order)),
    orderPob: (order) => dispatch(orderPob(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
