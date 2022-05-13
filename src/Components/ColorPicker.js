import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {colorPickerSelector} from "../redux/ColorPicker/colorPickerSelector";
import {changeColor, getColors, saveColor, saveStateColors} from "../redux/ColorPicker/colorPickerAction";

export const ColorPicker = ({selectedColor, setSelectedColor}) => {

   const colors = useSelector(colorPickerSelector)
   const dispatch = useDispatch()

   const saveColors = () => dispatch(saveStateColors(colors))

   const saveSelectedColor = (e) => setSelectedColor(e.target.value)
   console.log(selectedColor)

   useEffect(() => {
      dispatch(getColors())
   }, [])

   return (
     <div style={{padding: 10}}>
        {colors && colors.map((item, i) => (
          <div key={item.id}>
             <input
               type='color' value={item.value}
               onChange={(e) => dispatch(changeColor([...colors.map(color => {
                if(color.id === item.id){
                   return {id: item.id, name: item.name, value: e.target.value}
                }
                return color
             })]))}/>
             <input
               type="radio"
               name={'colorPicker'}
               defaultChecked={item.value === selectedColor}
               value={item.value}
               onChange={(e)=>saveSelectedColor(e)}
             />
          </div>
        ))}
        <button
         onClick={saveColors}
        >
           Сохарнить изменения
        </button>
     </div>
   )
}
