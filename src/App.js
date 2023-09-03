import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Pages/SignUp/SignUp';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { lazy } from 'react';
import Header from './Components/Header/Header';
import Login from './Pages/Login/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Addjournal from './Pages/AddJournal/AddJournal';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const JournalList = lazy(() => import('./Components/JournalList/JournalList'))

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(user);
      } else {
        setIsAuthenticated(null);
      }
      setLoading(false); // Set loading to false when authentication state is determined
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Render loading message while loading is true
  if (loading) {
    return <></>;
  }

  return (
    <BrowserRouter>
    <Header authenicated = {isAuthenticated}/>
      <Suspense fallback={<>Loading......</>}>
      
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <JournalList />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated === null ? (
                <Signup />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated === null ? (
                <Login />
              ) : (
                <Navigate to="/" />
              )
            }
          />
           <Route
            path="/addjournal"
            element={
              isAuthenticated ? (
                <Addjournal />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
            <Route
            path="*"
            element={
              <>Theres no Page</>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;




