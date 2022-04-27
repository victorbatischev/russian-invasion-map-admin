import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useLocalStorage} from "../hooks/useLocalStorage";
import {nowDate} from "../Constants";



export const Calendar = ({date, setDate}) => {



  const onChange = (e) => setDate(e.target.value)

  return (
    <div style={{ padding: 10 }}>
      <input type='date' value={date} onChange={(e) => onChange(e)} />
    </div>
  )
}
