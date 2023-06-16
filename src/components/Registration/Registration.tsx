import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';
// interface User {
//   id: number
//   username: string
//   displayName: string
//   admin: boolean
// }

// interface UserRequest {
//   username: string
//   displayName: string
//   password: string
// }
const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  username: Yup.string().required('Username is required'),
  displayName: Yup.string().required('Display Name is required'),
});

export const Registration: React.FC = () => {
  interface RegistrationFormValues {
    password: string
    username: string
    displayName: string
  }

  const initialValues: RegistrationFormValues = {
    password: '',
    username: '',
    displayName: ''
  };

  const handleSubmit = async (userData: RegistrationFormValues) => {
    try {
      const response = await axios.post('https://expa.fly.dev/auth/register', userData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
