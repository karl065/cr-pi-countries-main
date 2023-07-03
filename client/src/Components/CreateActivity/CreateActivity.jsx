/* eslint-disable react-hooks/rules-of-hooks */
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
import {createActivityVal} from '../../Utils/Validations/Validations';
import styles from './CreateActivity.module.css';

const CreateActivity = (props) => {
  const [activityData, setActivityData] = useState({
    nombre: '',
    dificultad: '',
    duracion: '',
    temporada: '',
    countryId: [],
  });
  const [error, setError] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [duracion, setDuracion] = useState('');

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
    setActivityData({
      ...activityData,
      duracion: duracion,
      countryId: selectedOptions,
    });
    setError(
      createActivityVal({
        ...activityData,
        duracion: duracion,
        countryId: selectedOptions,
      })
    );
  }, [selectedOptions, duracion]);

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

  const handleDurationChange = (e) => {
    let time = e.target.value;
    if (time < 10) time = '0' + time;

    if (e.target.name === 'horas') {
      if (duracion.length === 0 || duracion.length < 3) {
        setDuracion(time + ':00');
      } else {
        const partDuration = duracion.split(':');
        partDuration[0] = time;
        setDuracion(partDuration.join(':'));
      }
    } else if (e.target.name === 'minutos') {
      if (duracion.length < 3) {
        setDuracion(duracion + ':' + time);
      } else {
        const partDuration = duracion.split(':');
        partDuration[1] = time;
        setDuracion(partDuration.join(':'));
      }
    }

    setActivityData({
      ...activityData,
      duracion: duracion,
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setActivityData({
      ...activityData,
      [e.target.name]: e.target.value,
    });
    setError(
      createActivityVal({
        ...activityData,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleClick = (e) => {
    e.preventDefault();
    const errorsArray = Object.values(error);
    if (errorsArray.length === 0) {
      props.postActivity(activityData);
      setActivityData({
        nombre: '',
        dificultad: '',
        duracion: '',
        temporada: '',
        countryId: [],
      });
      setSelectedOptions([]);
      setError({});
      window.alert('Actividad Creada con exito');
    } else {
      window.alert('Los campos no deben estar vacios');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Crea una activity</h1>
      <div>
        <form className={styles.formulario}>
          <div>
            <label>Actividad</label>
            <input
              type="text"
              name="nombre"
              onChange={handleChange}
              value={activityData.nombre}
              placeholder="Actividad"
            />
            <h3>{error.nombre}</h3>
            <label>Dificultad</label>
            <select
              name="dificultad"
              onChange={handleChange}
              value={activityData.dificultad}
            >
              <option value="">Sel</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <h3>{error.dificultad}</h3>
          </div>
          <div>
            <label>Duracion</label>
            <div>
              <input
                onChange={handleDurationChange}
                type="number"
                min="00"
                max="36"
                placeholder="Horas"
              />
              <input
                onChange={handleDurationChange}
                type="number"
                min="00"
                max="59"
                placeholder="Minutos"
              />
            </div>
            <h3>{error.duracion}</h3>
            <label>Temporada</label>
            <select name="temporada" onChange={handleChange}>
              <option value={activityData.temporada}>
                Seleccione una temporada
              </option>
              {temporada.map((temp, index) => (
                <option key={index} value={temp}>
                  {temp}
                </option>
              ))}
            </select>
            <h3>{error.temporada}</h3>
          </div>
          <div>
            <div className={styles.selectPais}>
              {selectedOptions.map((option, index) => (
                <button key={index} onClick={(e) => removeOption(index, e)}>
                  {option}
                </button>
              ))}
            </div>
            <div>
              <select value="" onChange={handleSelect}>
                <option value="">Seleccionar Pais</option>
                {idCountries.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </select>
              <h3>{error.countryId}</h3>
            </div>
          </div>
        </form>
        <button onClick={handleClick}>Crear Actividad</button>
      </div>
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
