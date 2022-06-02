import React, {useEffect, useRef, useState} from 'react'
import { Map } from './Components/Map'
import { Calendar } from './Components/Calendar/Calendar'
import { ColorPicker } from './Components/ColorPicker'
import { useLocalStorage } from './hooks/useLocalStorage'
import { nowDate, defaultColor } from './Constants'
import {CopyCoordinate} from "./Components/CopyCoordinate";

const App = () => {

   const mapRef = useRef()
  const [date, setDate] = useLocalStorage('selectedDate', new Date())

  const [selectedColor, setSelectedColor] = useLocalStorage('selectedColor', defaultColor)

  // useEffect(() => {
  //   setDate(new Date())
  // }, [])

  return (
    <div className={'App'}>
      <Map selectedDate={date} selectedColor={selectedColor} mapRef={mapRef}/>
      <div style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
        <Calendar date={date} setDate={setDate} />
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <CopyCoordinate  mapRef={mapRef}/>
      </div>
    </div>
  )
}

export default App
