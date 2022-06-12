import React from "react";
import {
   Routes,
  Route,
   Navigate,
} from "react-router-dom";

import {AuthForm} from "./pages/Auth/AuthForm";
import {AdminPage} from "./pages/AdminPage";
import {PageError} from "./pages/Error";



export const Router = () => {
   return (
     <Routes>
         <Route path="/login" element={<AuthForm />} />
           <Route
             path="/"
             element={
                <RequireAuth>
                   <AdminPage />
                </RequireAuth>
             }
           />
           <Route path="*" element={<PageError />} />

     </Routes>
   )
}

function RequireAuth({ children }) {
   const auth = JSON.parse(localStorage.getItem('auth'))
   if (!auth) {
      return <Navigate to="/login" />;
   }
   return children;
}
