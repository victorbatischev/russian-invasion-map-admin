import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { colorPickerSelector } from '../redux/ColorPicker/colorPickerSelector'
import {
  changeColor,
  getColors,
  saveStateColors
} from '../redux/ColorPicker/colorPickerAction'

export const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  const [disabledButton, setDisabledButton] = useState(true)
  const colors = useSelector(colorPickerSelector)
  const dispatch = useDispatch()

  const saveColors = () => dispatch(saveStateColors(colors))

  const saveSelectedColor = (e) => setSelectedColor(e.target.value)

  const selectColor = (e, item) => {
    setDisabledButton(false)
    dispatch(
      changeColor([
        ...colors.map((color) => {
          if (color.id === item.id) {
            return {
              id: item.id,
              name: item.name,
              value: e.target.value
            }
          }
          return color
        })
      ])
    )
  }

  useEffect(() => {
    dispatch(getColors())
  }, [])

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: 10 }}>
      {colors &&
        colors.map((item, i) => (
          <div key={item.id} style={{ padding: 3 }}>
            <input
              type='color'
              value={item.value}
              onChange={(e) => selectColor(e, item)}
              style={{ width: 60 }}
            />
            <input
              type='radio'
              name={'colorPicker'}
              defaultChecked={item.value === selectedColor}
              value={item.value}
              onChange={(e) => saveSelectedColor(e)}
            />
          </div>
        ))}
      <button
        onClick={saveColors}
        disabled={disabledButton}
        style={{ marginTop: 5 }}
      >
        Сохранить цвета
      </button>
    </div>
  )
}
