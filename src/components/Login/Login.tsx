import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserRequest } from '../../types/UserRequest';
import { AuthContext } from '../AuthContext';


const initialValues: UserRequest = {
  password: '',
  username: '',
};
  
const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  username: Yup.string().required('Username is required'),
});

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error } = useContext(AuthContext);

  const handleSubmit = async (userData: UserRequest) => {
    // return login(userData)
    //   .then(() => {
    //     navigate(location.state?.from?.pathname || '/');
    //   });


    // .catch(error => {
    //   setError(error.response?.data?.message);
    // });
    try {
      await login(userData);
      // console.log(response);
      navigate(location.state?.from?.pathname || '/');
    } catch (err) {
      console.log(error);
      console.log(err);
    }

    // try {
    //   const response = await axios.post('https://expa.fly.dev/auth/login', userData);
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <>
      <p>Sign in</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <div>
            <label htmlFor="username">Username:</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>

          <button type="submit">Log in</button>
        </Form>
      </Formik>

      <span>
        Don’t have account yet?
        <Link to="/registration">
          New Account
        </Link>
      </span>
    </>
  );
};
