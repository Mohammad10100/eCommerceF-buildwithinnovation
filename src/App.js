import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Auth from './components/pages/Auth';
import OpenRoute from './components/common/OpenRoute';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/"
            element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>}
          />
          <Route path="/auth"
            element={
            <OpenRoute>
              <Auth/>
            </OpenRoute>}
          />
          </Routes>
      </Router>
    </>
  );
}

export default App;
