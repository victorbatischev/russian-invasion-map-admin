import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import './authForm.css'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

export const AuthForm = ({ isTokenAlive, setExpiresAt, setExistingToken }) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null)

  if (isTokenAlive) return <Navigate to='/admin' />

  return (
    <div className={'auth'}>
      <h1 className={'auth__title'}>Авторизация</h1>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={async (values) => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/auth/login?username=${values.username}&password=${values.password}`
            )
            setExistingToken(response.data.data.access_token)
            setExpiresAt(response.data.data.access_token_expired_at)
            navigate('/admin')
          } catch (e) {
            setErrors('Проверьте правильность введённых данных!')
          }
        }}
      >
        <Form className={'auth__form'}>
          <Field
            className={'auth__field'}
            name='username'
            placeholder={'Логин'}
          />
          <Field
            className={'auth__field'}
            type={'password'}
            name='password'
            placeholder={'Пароль'}
          />
          {errors && <div className={'auth__error'}>{errors}</div>}

          <button className={'auth__button'} type='submit'>
            Войти
          </button>
        </Form>
      </Formik>
    </div>
  )
}
