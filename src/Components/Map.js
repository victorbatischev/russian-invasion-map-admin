import React from 'react'
import {
  TileLayer,
  FeatureGroup,
  LayersControl,
  MapContainer
} from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'

import L from 'leaflet'
import { EditControl } from 'react-leaflet-draw'
import { setGeoJson } from '../redux/GeoJson/geoJsonAction'
import { filteredDataOnDate } from '../redux/GeoJson/geoJsonSelectors'
import { mapCenter } from '../Constants'

export const Map = () => {
  let _editableFG = null
  const geojsonData = useSelector(filteredDataOnDate)

  const dispatch = useDispatch()

  const _onEdited = (e) => {
    let numEdited = 0
    e.layers.eachLayer((layer) => {
      numEdited += 1
    })
    console.log(`_onEdited: edited ${numEdited} layers`, e)

    _onChange()
  }

  const _onCreated = (e) => {
    let type = e.layerType
    if (type === 'marker') {
      console.log('_onCreated: marker created', e)
    } else {
      console.log('_onCreated: something else created:', type, e)
    }
    _onChange()
  }

  const _onDeleted = (e) => {
    let numDeleted = 0
    e.layers.eachLayer((layer) => {
      numDeleted += 1
    })
    console.log(`onDeleted: removed ${numDeleted} layers`, e)

    _onChange()
  }

  const _onMounted = (drawControl) => {
    console.log('_onMounted', drawControl)
  }

  const _onEditStart = (e) => {
    console.log('_onEditStart', e)
  }

  const _onEditStop = (e) => {
    console.log('_onEditStop', e)
  }

  const _onDeleteStart = (e) => {
    console.log('_onDeleteStart', e)
  }

  const _onDeleteStop = (e) => {
    console.log('_onDeleteStop', e)
  }

  const _onFeatureGroupReady = (reactFGref) => {
    console.log('load', geojsonData)
    let leafletGeoJSON = new L.GeoJSON(geojsonData)

    let leafletFG = reactFGref

    if (!leafletFG) {
      return
    }

    leafletGeoJSON.eachLayer((layer) => {
      leafletFG.addLayer(layer)
    })

    _editableFG = reactFGref
  }

  const _onChange = () => {
    const geojsonData = _editableFG.toGeoJSON()
    console.log('geoJson', geojsonData)
    dispatch(setGeoJson(geojsonData))
  }

  return (
    <MapContainer className={'map'} center={mapCenter} zoom={6}>
      <LayersControl position='topright'>
        <LayersControl.BaseLayer
          checked={false}
          name='Esri WorldImagery'
          group='BaseLayers'
        >
          <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png'
            attribution='&copy; <a href="Esri &mdash">Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community</a> contributors'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          checked={true}
          name='OpenStreetMap'
          group='BaseLayers'
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      <FeatureGroup
        ref={(reactFGref) => {
          _onFeatureGroupReady(reactFGref)
        }}
      >
        <EditControl
          position='topright'
          onEdited={_onEdited}
          onCreated={_onCreated}
          onDeleted={_onDeleted}
          onMounted={_onMounted}
          onEditStart={_onEditStart}
          onEditStop={_onEditStop}
          onDeleteStart={_onDeleteStart}
          onDeleteStop={_onDeleteStop}
          draw={{ rectangle: true }}
        />
      </FeatureGroup>
    </MapContainer>
  )
}