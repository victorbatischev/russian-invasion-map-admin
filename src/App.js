import React, { useEffect } from 'react'
import { Map } from './Components/Map'
import { Calendar } from './Components/Calendar'
import { ColorPicker } from './Components/ColorPicker'
import { useLocalStorage } from './hooks/useLocalStorage'
import { nowDate, defaultColor } from './Constants'

const App = () => {
  const [date, setDate] = useLocalStorage('selectedDate', nowDate)
  const [selectedColor, setSelectedColor] = useLocalStorage('selectedColor', defaultColor)

  useEffect(() => {
    setDate(nowDate)
     //setSelectedColor(defaultColor)
  }, [])

  return (
    <div className={'App'}>
      <Map selectedDate={date} selectedColor={selectedColor}/>
      <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
        <Calendar date={date} setDate={setDate} />
        <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
      </div>
    </div>
  )
}

export default App
