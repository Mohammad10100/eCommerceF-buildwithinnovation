import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Auth from './components/pages/Auth';
import Cart from './components/pages/Cart';
import ErrorPage from './components/pages/ErrorPage';
import OpenRoute from './components/Auth/OpenRoute';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { lightTheme, darkTheme } from "./theme";
import { useSelector } from 'react-redux';
import {ThemeProvider} from 'styled-components'

function App() {
  const ThemeValue = useSelector(state => state.theme.theme);

  return (
    <>
    <ThemeProvider theme={ThemeValue=='dark'?darkTheme:lightTheme}>
      <Router>
        <Routes>
          <Route path="/"
            element={
              <ProtectedRoute>
              <Home/>
            </ProtectedRoute>}
          />
          <Route path="/cart"
            element={
              <ProtectedRoute>
              <Cart/>
            </ProtectedRoute>}
          />
          <Route path="/auth"
            element={
              <OpenRoute>
              <Auth/>
            </OpenRoute>}
          />
          <Route path="*" element={<ErrorPage/> }
          />
          </Routes>
      </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
