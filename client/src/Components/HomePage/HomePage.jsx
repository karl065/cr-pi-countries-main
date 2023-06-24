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
  const [activityOptions, setActivityOptions] = useState([]);
  const {countries, countryByName, filterCountries, activities} = props;

  const countriesByPage = 10;
  const totalPages = Math.ceil(countries.length / countriesByPage);
  const lastCountry = currentPage * countriesByPage;
  const firstCountry = lastCountry - countriesByPage;

  const deleteFind = () => {
    props.deleteByName([]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterContinent = (e) => {
    const selectValue = e.target.value;
    props.orderByContinent(selectValue);
  };
  const handleFilterActivity = (e) => {
    const selectValue = e.target.value;
    props.filterCountryByActivity(selectValue);
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
    } else if (filterCountries.length !== 0) {
      setCountryDisp(filterCountries);
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
    <div className={styles.filas}>
      <div className={styles.columnas}>
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
      {countryDisp.map((country, index) => (
        <div key={index} className={styles.columnas}>
          {
            <Card
              id={country.id}
              imagen={country.bandera}
              nombre={country.nombre}
              continente={country.continente}
              capital={country.capital}
              subregion={country.subregion}
              area={country.area}
              poblacion={country.poblacion}
            />
          }
        </div>
      ))}
      <button
        hidden={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        anterior
      </button>
      <button
        hidden={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        siguiente
      </button>
      <button hidden={countryByName.length === 0} onClick={deleteFind}>
        All
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    countryByName: state.countryByName,
    activities: state.activities,
    countries: state.countries,
    filterCountries: state.filterCountries,
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
