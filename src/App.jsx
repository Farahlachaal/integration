import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './public/landing';
import Login from './public/Login/Login';
import Signup from './public/Login/Signup';
import Profil from './public/User/Profil';
import Score from './public/User/Score';
import CreateCV from './public/User/CreateCV';
import Design from './public/Cours.jsx/design';
import Php from './public/Cours.jsx/php';
import ReactCourse from './public/Cours.jsx/react';
import Flutter from './public/Cours.jsx/flutter';
import Python from './public/Cours.jsx/python';
import Certif from './public/certif';
import TestsPage from './public/Tests/Tests';
import QCM from './public/QCM/qcm';
import Skills from './skills';
import UserManagement from './usermanagement';
import Certificate from './certificate';
import Quiz from './quiz';
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./Unauthorized"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes principales */}
        <Route path="/" element={<Login />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="user/Score" element={<Score />} />
        <Route path="user/CreateCV" element={<CreateCV />} />
        <Route path="/certif" element={<Certif />} />
        <Route path="/cours" element={<Skills />} />
        
        <Route path="/certificate/:id" element={<Certificate />} />
        <Route path="/quiz" element={<Quiz />} />

        {/* Routes pour les pages de cours */}
        <Route path="/cours/design" element={<Design />} />
        <Route path="/cours/php" element={<Php />} />
        <Route path="/cours/react" element={<ReactCourse />} />
        <Route path="/cours/flutter" element={<Flutter />} />
        <Route path="/cours/python" element={<Python />} />

        {/* Routes pour les pages de Test */}
        <Route path="/Tests/Tests" element={<TestsPage />} />

        <Route path="/QCM/QCM" element={<QCM/>}/>
       

        <Route
          path="/usermanagement"
          element={
            <PrivateRoute>
              <UserManagement />
            </PrivateRoute>
          }
        />
      <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
    </Router>
  );
}

export default App;
