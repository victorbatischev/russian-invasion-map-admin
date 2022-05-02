import React, { useEffect } from 'react'
import { Map } from './Components/Map'
import { Calendar } from './Components/Calendar'
import { ColorPicker } from './Components/ColorPicker'
import { useLocalStorage } from './hooks/useLocalStorage'
import { nowDate, defaultColor } from './Constants'

const App = () => {
  const [date, setDate] = useLocalStorage('selectedDate', nowDate)
  const [color, setColor] = useLocalStorage('selectedColor', defaultColor)

  useEffect(() => {
    setDate(nowDate)
    setColor(defaultColor) // eslint-disable-next-line
  }, [])

  return (
    <div className={'App'}>
      <Map selectedDate={date} selectedColor={color} />
      <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
        <Calendar date={date} setDate={setDate} />
        <ColorPicker color={color} setColor={setColor} />
      </div>
    </div>
  )
}

export default App
