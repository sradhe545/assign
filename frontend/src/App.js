

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Button from './components/Button';
import UserDetails from './components/UserDetails';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Button/>} />
        <Route path="/userdetails" element={<UserDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
