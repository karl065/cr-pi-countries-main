import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.contenedor}>
      <img
        className={styles.imagen}
        src="https://res.cloudinary.com/dpjeltekx/image/upload/v1688009086/PI/1920x1200-px-artwork-blue-Earth-eyes-maps-1806577-wallhere.com_eozfnt.jpg"
        alt="Countries"
      />
      <Link className={styles.boton} to="/home">
        Ingresar
      </Link>
    </div>
  );
};

export default LandingPage;
