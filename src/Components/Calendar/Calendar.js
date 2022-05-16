import React, {forwardRef, useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './calendar.css'
import axios from "axios";

export const Calendar = ({ date, setDate }) => {

   const [activeDates, setActiveDates] = useState([])
   const highlightWithRanges = [
      {
         "react-datepicker__day--highlighted-custom-1": activeDates.map(item=>Date.parse(item)),
      },
   ];

   const CustomInput = forwardRef(({ value, onClick }, ref) => (
     <button className='calendar-input' onClick={onClick} ref={ref}>
        {value}
     </button>
   ))

   const changeDate = (dates) => setDate(dates)

   useEffect(async ()=>{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/map/get-changes`)
      setActiveDates(response.data)
      response.data.forEach(item=>Date.parse(item))
   },[])

   return (
     <div className={'calendar'}>
        <DatePicker
          dateFormat='dd.MM.yyyy'
          selected={Date.parse(date)}
          onChange={changeDate}
          minDate={new Date('2/24/22')}
          maxDate={new Date()}
          highlightDates={highlightWithRanges}
          customInput={<CustomInput />}
        />
     </div>
   )
}

