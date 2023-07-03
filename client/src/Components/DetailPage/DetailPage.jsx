/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {connect} from 'react-redux';
import styles from './DetailPage.module.css';

const DetailPage = (props) => {
  const {countriesById} = props;
  return (
    <div className={styles.container}>
      <div>
        <h1>{countriesById.id}</h1>
        <img src={countriesById.bandera} alt={countriesById.nombre} />
        <div>
          <h1>{countriesById.nombre}</h1>
        </div>
      </div>
      <div>
        <div className={styles.filas}>
          <label>Continente:</label>
          <h3>{countriesById.continente}</h3>
        </div>
        <div className={styles.filas}>
          <label>Capital:</label>
          <h3>{countriesById.capital}</h3>
        </div>
        <div className={styles.filas}>
          <label>Subregion:</label>
          <h3>{countriesById.subregion}</h3>
        </div>
        <div className={styles.filas}>
          <label>Area:</label>
          <h3>{countriesById.area}</h3>
        </div>
        <div className={styles.filas}>
          <label>Poblacion:</label>
          <h3>{countriesById.poblacion}</h3>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    countriesById: state.countriesById,
  };
};

export default connect(mapStateToProps, null)(DetailPage);
