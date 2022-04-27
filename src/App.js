import React from 'react'
import { Map } from './Components/Map'
import { Calendar } from './Components/Calendar'
import {useLocalStorage} from "./hooks/useLocalStorage";
import {nowDate} from "./Constants";


const App = () => {
   const [date, setDate] = useLocalStorage('selectedDate', nowDate)
   return (
    <div className={'App'}>
      <Map selectedDate={date} />
      <Calendar date={date} setDate={setDate} />
    </div>
  )
}

export default App
