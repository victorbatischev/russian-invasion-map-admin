import { SET_GEO_JSON } from './geoJsonConstants'

let initialState = {
  storeGeoJson: null
}

export const geoJsonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GEO_JSON:
      return {
        ...state,
        storeGeoJson: action.payload.geoJsonData.json_data
      }

    default:
      return state
  }
}
