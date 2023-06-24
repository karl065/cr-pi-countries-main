import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div>
      <img
        className={styles.imagen}
        src="https://res.cloudinary.com/dpjeltekx/image/upload/v1687302834/PI/countries_mednhr.png"
        alt="Countries"
      />
      <Link to="/home">Ingresar</Link>
    </div>
  );
};

export default LandingPage;
