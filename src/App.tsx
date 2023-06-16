import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Registration } from './components/Registration';
import { HomePage } from './pages/HomePage/HomePage';
import { Login } from './components/Login';

function App() {
  return (
    <main>
      <section className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route
        path="sign-up"
        element={<RegistrationPage />}
      />
      <Route
        path="activate/:activationToken"
        element={<AccountActivationPage />}
      /> */}
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />

          {/* <Route path="/" element={<RequireAuth />}>
        <Route
          path="users"
          element={<UsersPage />}
        />
      </Route> */}
        </Routes>

      </section>

      {/* {error && <p className="notification is-danger is-light">{error}</p>} */}
    </main>
  );
}

export default App;
