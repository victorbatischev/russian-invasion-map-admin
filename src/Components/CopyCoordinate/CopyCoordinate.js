import React, {useMemo, useState} from 'react';
import L from "leaflet"
import './CopyCoordinate.css'
import {Modal} from "../Modal/Modal";

export const copy = async (text) => await navigator.clipboard.writeText(text)

export const markerIcon = new L.Icon({
   iconUrl: require("../../assets/icons/marker.png"),
   iconSize: [48, 48]
})

export const CopyCoordinate = ({mapRef}) => {

   const [markerOnMap, setMarkerOnMap] = useState(false)
   const [coordinates, setCoordinates] = useState([])
   const [modalActive, setModalActive] = useState(false)
   const [newMarker, setNewMarker] = useState(null)

   const ModalWindow = useMemo(() => {
      return <Modal setActive={setModalActive} active={modalActive}>
         <div>Координаты скопированы</div>
      </Modal>
   }, [modalActive])


   const addMarkerToMap = () => {
      setMarkerOnMap(true)
      setNewMarker(L.marker([
         (mapRef.current.getBounds()._northEast.lat + mapRef.current.getBounds()._southWest.lat) / 2,
         (mapRef.current.getBounds()._northEast.lng + mapRef.current.getBounds()._southWest.lng) / 2
      ], {icon: markerIcon, draggable: true}).addTo(mapRef.current).on('dragend', setCoordinatesInState))
   }

   const setCoordinatesInState = (e) => setCoordinates([e.target._latlng.lat, e.target._latlng.lng])

   const copyCoordinatesInBuffer = () => {
      coordinates.length ? copy(coordinates) : copy([
         (mapRef.current.getBounds()._northEast.lat + mapRef.current.getBounds()._southWest.lat) / 2,
         (mapRef.current.getBounds()._northEast.lng + mapRef.current.getBounds()._southWest.lng) / 2
      ])
      setModalActive(true)
      setCoordinates([])
      setMarkerOnMap(false)
      newMarker.remove()
   }

   return (
     <div>
        {!markerOnMap && <button className={'button'} onClick={addMarkerToMap}>Определить координаты</button>}
        {markerOnMap && <button className={'button'} onClick={copyCoordinatesInBuffer}>Скопировать координаты</button>}
        {ModalWindow}
     </div>
   )
};

