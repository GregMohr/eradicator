import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const [token, setToken] = useState();

  if(!token) return <Login setToken={setToken} />;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
