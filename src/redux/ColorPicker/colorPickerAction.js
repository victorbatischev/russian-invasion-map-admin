import axios from 'axios'
import {SAVE_COLOR, SET_COLOR} from "./colorPickerConstants";

export const setColor = (data) => ({
   type: SET_COLOR,
   payload: data
})

export const saveColor = (color) => ({type: SAVE_COLOR, color})

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

export const changeColor = (id, value, name) => async () => {
   try {
      await axios.post(`${process.env.REACT_APP_API_URL}/color/set-colors/`, {
         id: id,
         value: value,
         name: name
      })
   } catch (e) {
      console.log(e)
   }
}
