import { applyMiddleware, combineReducers, compose } from 'redux'
import { createStore } from 'redux'
import { geoJsonReducer } from './GeoJson/geoJsonReducer'
import thunk from 'redux-thunk'

let reducers = combineReducers({
  geoJson: geoJsonReducer
})

const store = createStore(reducers, compose(applyMiddleware(thunk)))

export default store
