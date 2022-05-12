import { applyMiddleware, combineReducers, compose } from 'redux'
import { createStore } from 'redux'
import { geoJsonReducer } from './GeoJson/geoJsonReducer'
import thunk from 'redux-thunk'
import {colorPickerReducer} from "./ColorPicker/colorPickerReduser";

let reducers = combineReducers({
  geoJson: geoJsonReducer,
  colorPicker: colorPickerReducer
})

const store = createStore(reducers, compose(applyMiddleware(thunk)))

export default store
