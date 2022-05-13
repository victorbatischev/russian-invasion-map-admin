import { applyMiddleware, combineReducers, compose } from 'redux'
import { createStore } from 'redux'
import thunk from 'redux-thunk'

import { geoJsonReducer } from './GeoJson/geoJsonReducer'
import { colorPickerReducer } from './ColorPicker/colorPickerReducer'

let reducers = combineReducers({
  geoJson: geoJsonReducer,
  colorPicker: colorPickerReducer
})

const store = createStore(reducers, compose(applyMiddleware(thunk)))

export default store
