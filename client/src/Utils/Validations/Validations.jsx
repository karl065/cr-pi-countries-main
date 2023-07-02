export function createActivityVal(props) {
  const regexNum = /\d/;
  const errors = {};

  if (!props.nombre) {
    errors.nombre = 'El nombre no puede estar vacio';
  } else if (regexNum.test(props.nombre)) {
    errors.nombre = 'El nombre no debe tener números';
  }

  if (!props.dificultad) {
    errors.dificultad = 'La dificultad no debe estar vacia';
  } else if (props.dificultad > 5 || props.dificultad < 1) {
    errors.dificultad = 'No se puede exceder en un rango de 1 a 5';
  }
  if (!props.duracion) {
    errors.duracion = 'La duracion no debe estar vacia';
  } else if (props.duracion === '00:00' || props.duracion === '00') {
    errors.duracion = 'La duracion no puede esta en 0';
  }

  if (!props.temporada) {
    errors.temporada = 'Debe seleccionar una temporada';
  }

  if (props.countryId.length === 0) {
    errors.countryId = 'Debe seleccionar al menos un pais';
  }

  return errors;
}
