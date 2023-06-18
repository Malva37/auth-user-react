
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserRegister } from '../../types/UserRegister';
import { AuthContext } from '../AuthContext';

const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  username: Yup.string().required('Username is required'),
  displayName: Yup.string().required('Display Name is required'),
});

const initialValues: UserRegister = {
  password: '',
  username: '',
  displayName: ''
};

export const Registration = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const { register } = useContext(AuthContext);

  const handleSubmit = async (userData: UserRegister) => {
    return register(userData)
      .then(() => {
        navigate('/login');
      });
  };

  // const handleSubmit = async (userData: RegistrationFormValues) => {
  //   try {
  //     const response = await axios.post('https://expa.fly.dev/auth/register', userData);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <p>Registration</p>

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

          <div>
            <label htmlFor="displayName">Display Name:</label>
            <Field type="text" id="displayName" name="displayName" />
            <ErrorMessage name="displayName" component="div" />
          </div>

          <button type="submit">Register</button>
        </Form>
      </Formik>
      <span>
        I have an account. Go to Sign in
        <Link to="/login">
          Go to Sign in
        </Link>
      </span>
    </>

  );
};
