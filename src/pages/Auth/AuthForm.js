import React, {useEffect} from 'react';
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";

function validatePassword(value) {
   let error;
   if (value !== 'qwerty123') {
      error = 'Не верный пароль';
   }
   return error;
}

function validateUsername(value) {
   let error;
   if (value !== 'admin') {
      error = 'Не верный логин';
   }
   return error;
}

export const AuthForm = () => {

   let navigate = useNavigate();

   const submit = () => {
      localStorage.setItem('auth', JSON.stringify(true))
      navigate('/');
   }

   console.log('render form')


   return (
     <div>
        <h1>Авторизация</h1>
        <Formik
          initialValues={{
             username: '',
             password: '',
          }}
          onSubmit={()=>submit()}
        >
           {({ errors, touched, isValidating }) => (
             <Form>
                <Field name="username" validate={validateUsername} />
                {errors.username && touched.username && <div>{errors.username}</div>}

                <Field type={'password'} name="password" validate={validatePassword} />
                {errors.password && touched.password && <div>{errors.password}</div>}

                <button type="submit">Submit</button>
             </Form>
           )}
        </Formik>
     </div>
   );
};

