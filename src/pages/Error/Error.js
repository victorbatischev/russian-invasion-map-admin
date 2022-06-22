import React from 'react'
import { Link } from "react-router-dom";
import './error.css'

export const PageError = () => {
   return (
     <div>
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="main">
           <h1 className={'main__head'}>404</h1>
           <p>Такой странцицы не существует</p>
           <Link to={'/admin'} className='main__link'>Вернутья на главную</Link>
        </div>
     </div>
   )
}
