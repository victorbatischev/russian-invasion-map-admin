import axios from 'axios'
import {CHANGE_COLOR, SET_COLOR} from "./colorPickerConstants";

export const setColor = (data) => ({
   type: SET_COLOR,
   payload: data
})

export const changeColor = (colors) => ({type: CHANGE_COLOR, colors})

export const getColors = () => async (dispatch) => {
   try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/color/get-colors`
      )
      dispatch(setColor(response.data.data))
   } catch (e) {
      dispatch(setColor( null ))
   }
}

export const setChangeColor = (id, value, name) => async () => {
   try {
      await axios.post(`${process.env.REACT_APP_API_URL}/color/set-color/`, {
         id: id,
         value: value,
         name: name
      })
   } catch (e) {
      console.log(e)
   }
}

export const saveStateColors = (colors) => async () => {
   try {
      await axios.post(`${process.env.REACT_APP_API_URL}/color/set-colors`, {
         colors : colors
      })
      alert("Изменения сохранены!")
   } catch (e) {
      console.log(e)
   }
}