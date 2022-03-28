import './App.css';
import LoginRegister from './container/LoginAndRegister/LoginRegister';
import { Route, Routes } from 'react-router-dom';
import HomePage from './container/HomePage/HomePage';

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
