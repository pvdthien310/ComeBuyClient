import './App.css';
import LoginRegister from './components/LoginAndRegister/LoginRegister';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    // <div>
    //   <LoginRegister />
    // </div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginRegister />} />
    </Routes>
  );
}

export default App;
