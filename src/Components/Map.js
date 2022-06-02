import React, { useEffect } from 'react'
import {
  TileLayer,
  FeatureGroup,
  LayersControl,
  MapContainer
} from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import L, { divIcon } from 'leaflet'
import { EditControl } from 'react-leaflet-draw'
import { renderToStaticMarkup } from 'react-dom/server'

import {
  getActualGeoJson,
  setDataGeoJson
} from '../redux/GeoJson/geoJsonAction'
import { filteredDataOnDate } from '../redux/GeoJson/geoJsonSelectors'
import { mapCenter } from '../Constants'

let editableFG = null

export const Map = ({ selectedDate, selectedColor, mapRef }) => {
  const geojsonData = useSelector(filteredDataOnDate)
  const dispatch = useDispatch()

  const _onEdited = (e) => {
    let numEdited = 0

    e.layers.eachLayer((layer) => {
      // сохраняем индексы редактированных слоёв для добавления свойств
      // console.log(layer)
      numEdited += 1
    })

    console.log(`onEdited: edited ${numEdited} layers`, e)

    _onChange('edited')
  }

  const _onCreated = (e) => {
    console.log(e)

    // polyline, polygon, rectangle, circle (???), marker (???)
    let type = e.layerType

    _onChange('created', type)
  }

  const _onDeleted = () => {
    _onChange('deleted')
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
    let parsedGeoJSON = geojsonData ? JSON.parse(geojsonData) : null
    console.log('load', parsedGeoJSON)
    let leafletGeoJSON = new L.GeoJSON(parsedGeoJSON)

    if (!reactFGref) {
      return
    }
    let index = 0
    // сохраняем ссылку на компонент
    editableFG = reactFGref

    reactFGref.clearLayers()

    leafletGeoJSON.eachLayer((layer) => {
      // добавляем стилизацию слоёв в GeoJSON
      let color = parsedGeoJSON.features[index].properties?.fill
      // в случае polyline или polygon меняем цвет
      if (layer?.options?.color && color) {
        layer.options.color = color
      }
      reactFGref.addLayer(layer)
      index++
    })
  }

  // этот метод вызывается после любого изменения данных
  const _onChange = (type, layerType) => {
    // получаем тип события и тип слоя
    console.log(type, layerType)

    // получаем последние данные
    const geojsonData = editableFG.toGeoJSON()
    console.log('geoJson', geojsonData)

    // редактируем их в соответствии с выбранными настройками
    if (type === 'created') {
      // при добавлении элемента, добавляем ему свойство цвета
      geojsonData.features[geojsonData.features.length - 1].properties.fill =
        JSON.parse(localStorage.getItem('selectedColor'))
    }

    // сохраняем измененные данные
    dispatch(
      setDataGeoJson(
        JSON.parse(localStorage.getItem('selectedDate'))
          .toLocaleString('sv-SE')
          .substring(0, 10),
        JSON.stringify(geojsonData)
      )
    )
  }

  useEffect(() => {
    // при монтировании компонента, запрашиваем данные за выбранную дату
    dispatch(
      getActualGeoJson(selectedDate.toLocaleString('sv-SE').substring(0, 10))
    )
  }, [selectedDate, selectedColor])

  return (
    <MapContainer className={'map'} center={mapCenter} zoom={6} whenCreated={(mapInstance) => {
      mapRef.current = mapInstance
    }}>
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
      <FeatureGroup ref={(item) => _onFeatureGroupReady(item)}>
        <EditControl
          position='topleft'
          onEdited={_onEdited}
          onCreated={_onCreated}
          onDeleted={_onDeleted}
          onMounted={_onMounted}
          onEditStart={_onEditStart}
          onEditStop={_onEditStop}
          onDeleteStart={_onDeleteStart}
          onDeleteStop={_onDeleteStop}
          draw={{
            polyline: { shapeOptions: { color: selectedColor } },
            polygon: {
              showArea: true,
              showLength: true,
              precision: { km: 1, ft: 1 },
              shapeOptions: { color: selectedColor }
            },
            rectangle: { shapeOptions: { color: selectedColor } },
            circle: true,
            marker: {
              icon: divIcon({
                html: renderToStaticMarkup(
                  <i
                    className='fa fa-map-marker-alt fa-3x'
                    style={{ color: selectedColor }}
                  />
                )
              })
            },
            circlemarker: false
          }}
        />
      </FeatureGroup>
    </MapContainer>
  )
}
