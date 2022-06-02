import React, {useState} from 'react';
import L from "leaflet"
import {mapCenter} from "../Constants";

export const copy = (text) => navigator.clipboard.writeText(text)

export const CopyCoordinate = ({mapRef}) => {

   const markerIcon = new L.Icon({
      iconUrl: require("../assets/icons/marker.png"),
      iconSize: [48, 48]
   })

   const addMarkerToMap = () => L.marker(mapCenter, {
         icon: markerIcon,
         draggable: true
      }).addTo(mapRef.current).on('dragend', copyCoordinatesInBuffer)

   const copyCoordinatesInBuffer = (e) => {
         const coordinates = []
         for (let [key, value] of Object.entries(e.target._latlng)) {
            coordinates.push(value)
         }
         copy(coordinates)
         alert("Скопированы координаты " + coordinates)
   }

   return <button onClick={addMarkerToMap}>Поставить маркер</button>
};

