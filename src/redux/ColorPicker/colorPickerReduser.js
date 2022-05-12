import {SAVE_COLOR, SET_COLOR} from "./colorPickerConstants";

let initialState = {
   color: null,
   colors: null
}

export const colorPickerReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_COLOR:
         return {
            ...state,
            colors: action.payload
         }
      case SAVE_COLOR:

         return {
            ...state,
            color: action.color
         }
      default:
         return state
   }
}
