import React, {useEffect} from 'react';
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import "./authForm.css"
import {Navigate} from "react-router-dom";

const validatePassword = (value) => {
   let error;
   if (value !== 'qwerty123') {
      error = 'Не верный пароль';
   }
   return error;
}

const validateUsername = (value) => {
   let error;
   if (value !== 'admin') {
      error = 'Не верный логин';
   }
   return error;
}

export const AuthForm = () => {

   const navigate = useNavigate();

   const submit = () => {
      localStorage.setItem('auth', JSON.stringify(true))
      navigate('/')
   }
   let a = JSON.parse(localStorage.getItem('auth'))

   if (a) return <Navigate to="/" />

   return (
     <div className={'auth'}>
        <h1 className={'auth__title'}>Авторизация</h1>
        <Formik
          initialValues={{
             username: '',
             password: '',
          }}
          onSubmit={()=>submit()}
        >
           {({ errors, touched, isValidating }) => (
             <Form className={'auth__form'}>
                <Field className={'auth__field'} name="username" validate={validateUsername} placeholder={'Логин'}/>
                {errors.username && touched.username && <div className={'auth__error'}>{errors.username}</div>}

                <Field className={'auth__field'} type={'password'} name="password" validate={validatePassword} placeholder={'Пароль'}/>
                {errors.password && touched.password && <div className={'auth__error'}>{errors.password}</div>}

                <button className={'auth__button'} type="submit">Войти</button>
             </Form>
           )}
        </Formik>
     </div>
   );
};

