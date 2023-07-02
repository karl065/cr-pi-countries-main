/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Nav.module.css';
import {deleteByName, filterCountryByActivity} from '../../Utils/Redux/Actions';
import {connect} from 'react-redux';
import {useState} from 'react';

const Nav = (props) => {
  const deleteFind = () => {
    props.filterCountryByActivity([]);
    props.deleteByName([]);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <div
        className={`${styles.links} ${isOpen ? styles.open : styles.closed}`}
      >
        <Link onClick={deleteFind} to="/home">
          Home
        </Link>
        <Link to="/createactivity">Crear Actividad</Link>
        <Link to="/">Back</Link>
      </div>
      <div
        className={`${styles.toggle} ${isOpen && styles.open}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteByName: (data) => dispatch(deleteByName(data)),
    filterCountryByActivity: (activity) =>
      dispatch(filterCountryByActivity(activity)),
  };
};

export default connect(null, mapDispatchToProps)(Nav);
