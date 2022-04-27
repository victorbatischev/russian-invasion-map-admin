import { SET_GEO_JSON } from './geoJsonConsts'
import axios from "axios";

export const setGeoJson = (geoJsonData) => ({
  type: SET_GEO_JSON,
  payload: { geoJsonData }
})

export const getActualGeoJson = (date) => async (dispatch) => {
   try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/map/get-data/?date=${date}`)
      dispatch(setGeoJson(response.data.data))

   }catch (e) {
      dispatch(setGeoJson({json_data: null}))
   }
}



export const setDataGeoJson = (date, json_data) => async (dispatch) => {
  try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/map/set-data/`,{
         date: date,
         json_data: json_data,
      })
  }catch (e) {
    console.log(e)
  }
}


