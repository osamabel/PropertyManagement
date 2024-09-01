import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import Layout from './layout/layout';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import AddPropertie from './pages/AddPropertie';
import AddTenant from './pages/AddTenant';
import Payments from './pages/Payments';


const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Layout/>}>
              <Route path="/Properties" element={<Properties />} />
              <Route path="/Tenants" element={<Tenants />} />
              <Route path="/AddPropertie" element={<AddPropertie />} />
              <Route path="/AddTenant" element={<AddTenant />} />
              <Route path="/Payments" element={<Payments />} />
            </Route>
          </Route>
        </Routes>
      </Router>
  );
};

export default App;
