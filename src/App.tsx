import React, { useContext } from 'react';
import './App.css';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Registration } from './components/Registration';
import { HomePage } from './pages/HomePage/HomePage';
import { Login } from './components/Login';
import { AuthContext } from './components/AuthContext';

function App() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <nav
        className="navbar has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-start">
          <NavLink to="/" className="navbar-item">
            Home
          </NavLink>

          {/* <NavLink to="/users" className="navbar-item">
            Users
          </NavLink> */}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user ? (
                <button
                  className="button is-light has-text-weight-bold"
                  onClick={() => {
                    logout()
                      .then(() => {
                        navigate('/registration');
                      });
                    // .catch((error) => {
                    //   setError(error.response?.data?.message);
                    // });
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/registration"
                    className="button is-light has-text-weight-bold"
                  >
                    Sign up
                  </Link>

                  <Link
                    to="/login"
                    className="button is-success has-text-weight-bold"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
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
    </>
  );
}

export default App;
