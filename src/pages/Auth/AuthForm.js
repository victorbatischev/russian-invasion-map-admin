import React, {useState} from 'react'
import {Field, Form, Formik} from 'formik'
import {useNavigate} from 'react-router-dom'
import './authForm.css'
import {Navigate} from 'react-router-dom'

export const AuthForm = () => {
   const navigate = useNavigate()
   const [errors, setErrors] = useState(null)

   let isAuthorized = JSON.parse(localStorage.getItem('auth'))

   if (isAuthorized) return <Navigate to='/admin'/>

   return (
     <div className={'auth'}>
        <h1 className={'auth__title'}>Авторизация</h1>
        <Formik
          initialValues={{
             username: '',
             password: ''
          }}
          onSubmit={async (values) => {
             if (values.username !== 'admin' || values.password !== '1234') {
                setErrors('Не верный логин или пароль')
             } else {
                localStorage.setItem('auth', JSON.stringify(true))
                navigate('/admin')
             }
          }}
        >

           <Form className={'auth__form'}>
              <Field
                className={'auth__field'}
                name='username'
                placeholder={'Логин'}
              />
              {/*{errors.username && (*/}
              {/*  <div className={'auth__error'}>{errors.username}</div>*/}
              {/*)}*/}
              <Field
                className={'auth__field'}
                type={'password'}
                name='password'
                placeholder={'Пароль'}
              />
              {errors && (
                <div className={'auth__error'}>{errors}</div>
              )}

              <button className={'auth__button'} type='submit'>
                 Войти
              </button>
           </Form>

        </Formik>
     </div>
   )
}
