import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import {AuthForm} from './pages/Auth/AuthForm'
import {AdminPage} from './pages/AdminPage/AdminPage'
import {PageError} from './pages/Error/Error'
import {useLocalStorage} from "./hooks/useLocalStorage";

export const Router = () => {

   const [existingToken, setExistingToken] = useLocalStorage('auth_token', null)
   const [expiresAt, setExpiresAt] = useLocalStorage('access_token_expired_at', null)
   const isTokenAlive = (existingToken && expiresAt && new Date(expiresAt).getTime() > (new Date()).getTime());

   return (
     <Routes>
        <Route path='/login' element={<AuthForm isTokenAlive={isTokenAlive} setExistingToken={setExistingToken} setExpiresAt={setExpiresAt}/>}/>
        <Route
          path='/admin'
          element={
             <RequireAuth isTokenAlive={isTokenAlive} >
                <AdminPage />
             </RequireAuth>
          }
        />
        <Route path='*' element={<PageError/>}/>
     </Routes>
   )
}

function RequireAuth({children, isTokenAlive}) {

   if (!isTokenAlive) {
      return <Navigate to='/login'/>
   }
   return children
}
