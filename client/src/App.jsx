import './App.css';
import CreateActivity from './Components/CreateActivity/CreateActivity';
import DetailPage from './Components/DetailPage/DetailPage';
import HomePage from './Components/HomePage/HomePage';
import LandingPage from './Components/LandingPage/LandingPage';
import Nav from './Components/Nav/Nav.jsx';
import {Route, Routes, useLocation} from 'react-router-dom';

function App() {
  const location = useLocation();
  const verNav = !['/'].includes(location.pathname);

  return (
    <div className="App">
      {verNav && <Nav />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/createactivity" element={<CreateActivity />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
