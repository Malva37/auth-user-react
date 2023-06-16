import { Link } from 'react-router-dom';
import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';


  interface RegistrationFormValues {
    password: string;
    username: string;
  }
  
const initialValues: RegistrationFormValues = {
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

  const handleSubmit = async (userData: RegistrationFormValues) => {
    try {
      const response = await axios.post('https://expa.fly.dev/auth/login', userData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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

          <button type="submit">Register</button>
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
