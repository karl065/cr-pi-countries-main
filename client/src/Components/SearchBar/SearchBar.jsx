/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {useState} from 'react';
import {getByName} from '../../Utils/Redux/Actions.js';
import {connect} from 'react-redux';
import styles from './SearchBar.module.css';

const SearchBar = (props) => {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClick = () => {
    props.getByName(name);
    setName('');
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      props.getByName(name);
      setName('');
    }
  };
  return (
    <div className={styles.contenedor}>
      <input
        type="search"
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleClick}>Buscar</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getByName: (name) => dispatch(getByName(name)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
