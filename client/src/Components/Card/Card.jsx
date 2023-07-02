/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import {useNavigate} from 'react-router-dom';
import {getById} from '../../Utils/Redux/Actions';
import {connect} from 'react-redux';
import styles from './Card.module.css';

const Card = (props) => {
  const navigation = useNavigate();
  const handleClickDetails = () => {
    props.getById(props.id);
    navigation(`/detail`);
  };

  const cardStyle = {
    backgroundImage: `url(${props.imagen})`,
  };

  const splitNombre = props.nombre.split(' ');
  return (
    <div onClick={handleClickDetails} className={styles.card} style={cardStyle}>
      <img src={props.imagen} alt={props.nombre} className={styles.imagen} />
      <h1>
        {splitNombre.map((word, index) => (
          <span key={index}>
            {word}
            <br />
          </span>
        ))}
      </h1>
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
