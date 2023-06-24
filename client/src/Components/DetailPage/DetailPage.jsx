/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

// import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';

const DetailPage = (props) => {
  const {countriesById} = props;
  return (
    <div>
      <div>
        <div>
          <img src={countriesById.bandera} alt={countriesById.nombre} />
        </div>
        <div>
          <h1>{countriesById.id}</h1>
          <h1>{countriesById.nombre}</h1>
        </div>
        <h3>{countriesById.continente}</h3>
        <h3>{countriesById.capital}</h3>
        <h3>{countriesById.subregion}</h3>
        <h3>{countriesById.area}</h3>
        <h3>{countriesById.poblacion}</h3>
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
