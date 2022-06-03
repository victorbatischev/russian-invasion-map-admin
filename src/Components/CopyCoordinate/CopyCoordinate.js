import React, {useState} from 'react';
import L, {Circle as polyline} from "leaflet"
import {mapCenter} from "../Constants";

export const copy = (text) => navigator.clipboard.writeText(text)

export const CopyCoordinate = ({mapRef}) => {

   const [markerOnMap, setMarkerOnMap] = useState(false)
   const [coordinates, setCoordinates] = useState([])
   const markerIcon = new L.Icon({
      iconUrl: require("../assets/icons/marker.png"),
      iconSize: [48, 48]
   })

   const addMarkerToMap = () => {
      setMarkerOnMap(true)
      L.marker([
        (mapRef.current.getBounds()._northEast.lat + mapRef.current.getBounds()._southWest.lat) / 2,
        ( mapRef.current.getBounds()._northEast.lng + mapRef.current.getBounds()._southWest.lng) / 2
      ], {
         icon: markerIcon,
         draggable: true
      }).addTo(mapRef.current).on('dragend', copyCoordinatesInBuffer)
      console.log(mapRef.current.getBounds())
      console.log(mapRef.current.getBounds()._southWest)
     console.log((mapRef.current.getBounds()._northEast.lat + mapRef.current.getBounds()._southWest.lat) / 2)
      console.log(( mapRef.current.getBounds()._northEast.lng + mapRef.current.getBounds()._southWest.lng) / 2)
   }

   const copyCoordinatesInBuffer = (e) => {
      for (let [key, value] of Object.entries(e.target._latlng)) {
         setCoordinates(prev=>[...prev, value])
      }
   }

   const sd = () => {
      copy(coordinates)
      setCoordinates([])
   }

   return (
     <div>
        {!markerOnMap &&<button onClick={addMarkerToMap}>Поставить маркер</button>}
        {markerOnMap && <button onClick={sd}>Скопировать координаты</button>}
     </div>
   )
};

