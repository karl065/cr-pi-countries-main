/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {connect} from 'react-redux';
import {
  getCountries,
  getIdCountries,
  postActivity,
} from '../../Utils/Redux/Actions';
import {useEffect, useState} from 'react';

const CreateActivity = (props) => {
  const [activityData, setActivityData] = useState({
    nombre: '',
    dificultad: '',
    duracion: '',
    temporada: '',
    countryId: [],
  });
  const [selectedOptions, setSelectedOptions] = useState([]);

  const temporada = ['Verano', 'Otoño', 'Invierno', 'Primavera'];

  const {idCountries} = props;
  idCountries.sort();

  useEffect(() => {
    props.getIdCountries();
  }, [props.countries]);

  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    if (!selectedOptions.includes(selectedValue))
      setSelectedOptions((prevOptions) => [...prevOptions, selectedValue]);
  };

  useEffect(() => {
    setActivityData((prevActivityData) => ({
      ...prevActivityData,
      countryId: selectedOptions,
    }));
  }, [selectedOptions]);

  const removeOption = (index, e) => {
    e.preventDefault();
    setSelectedOptions((prevOptions) =>
      prevOptions.filter((_, i) => i !== index)
    );
    setActivityData((prevActivityData) => ({
      ...prevActivityData,
      countryId: selectedOptions.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    setActivityData({
      ...activityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    props.postActivity(activityData);
    setActivityData({
      nombre: '',
      dificultad: '',
      duracion: '',
      temporada: '',
      countryId: [],
    });
    setSelectedOptions([]);
  };
  useEffect(() => {}, []);

  return (
    <div>
      <form>
        <label>Actividad</label>
        <input
          type="text"
          name="nombre"
          onChange={handleChange}
          value={activityData.nombre}
          placeholder="Actividad"
        />
        <label>Dificultad</label>
        <input
          type="text"
          name="dificultad"
          onChange={handleChange}
          value={activityData.dificultad}
          placeholder="Dificultad"
        />
        <label>Duracion</label>
        <input
          type="time"
          name="duracion"
          onChange={handleChange}
          value={activityData.duracion}
          placeholder="Duracion"
        />
        <label>Temporada</label>
        <select
          name="temporada"
          onChange={handleChange}
          value={activityData.temporada}
        >
          <option value={activityData.temporada}>
            Seleccione una temporada
          </option>
          {temporada.map((temp, index) => (
            <option key={index} value={temp}>
              {temp}
            </option>
          ))}
        </select>
        <div>
          {selectedOptions.map((option, index) => (
            <button key={index} onClick={(e) => removeOption(index, e)}>
              {option}
            </button>
          ))}
        </div>
        <select value="" onChange={handleSelect}>
          <option value="">Seleccionar Pais</option>
          {idCountries.map((country, index) => (
            <option value={country} key={index}>
              {country}
            </option>
          ))}
        </select>
        <button onClick={handleClick}>Crear Actividad</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    idCountries: state.idCountries,
    activities: state.activities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => dispatch(getCountries()),
    getIdCountries: () => dispatch(getIdCountries()),
    postActivity: (activity) => dispatch(postActivity(activity)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity);
