import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {colorPickerSelector} from "../redux/ColorPicker/colorPickerSelector";
import {changeColor, getColors, saveColor} from "../redux/ColorPicker/colorPickerAction";

export const ColorPicker = ({selectedColor, setSelectedColor}) => {

   const colors = useSelector(colorPickerSelector)
   const dispatch = useDispatch()

   const onChange = (id, value, name, e) => {
      console.log(id, value, name, e)
      // dispatch(changeColor(id, value, name))
   }

   const saveSelectedColor = (e) => {

      setSelectedColor(e.target.value)
   }

   useEffect(() => {
      dispatch(getColors())
   }, [])

   return (
     <div style={{padding: 10}}>
        {colors && colors.map((item, i) => (
          <div key={item.id}>
             <input type='color' value={item.value} onChange={(e) => onChange(item.id, e.target.value, item.name, e)}/>
             <input type="radio" name={'colorPicker'} defaultChecked={i===0} value={item.value} onChange={(e)=>saveSelectedColor(e)}/>
          </div>
        ))}
     </div>
   )
}
