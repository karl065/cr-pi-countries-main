/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import {useNavigate} from 'react-router-dom';
import {getById} from '../../Utils/Redux/Actions';
import {connect} from 'react-redux';

const Card = (props) => {
  const navigation = useNavigate();
  const handleClickDetails = () => {
    props.getById(props.id);
    navigation(`/detail`);
  };
  return (
    <div onClick={handleClickDetails}>
      <img src={props.imagen} alt={props.nombre} />
      <h1>{props.nombre}</h1>
      <h2>{props.continente}</h2>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getById: (id) => dispatch(getById(id)),
  };
};

export default connect(null, mapDispatchToProps)(Card);
