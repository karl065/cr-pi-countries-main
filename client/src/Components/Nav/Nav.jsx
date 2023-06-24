/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Nav.module.css';
import {deleteByName, filterCountryByActivity} from '../../Utils/Redux/Actions';
import {connect} from 'react-redux';

const Nav = (props) => {
  const deleteFind = () => {
    props.filterCountryByActivity([]);
    props.deleteByName([]);
  };
  return (
    <div className={styles.container}>
      <Link onClick={deleteFind} to="/home">
        Home
      </Link>
      <SearchBar></SearchBar>
      <Link to="/createactivity">Crear Actividad</Link>
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
