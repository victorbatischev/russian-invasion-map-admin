export const filteredDataOnDate = (state) => {
  const date = state.geoJson.selectedDate

  let result = state.geoJson.storeGeoJson.filter((item) => item.date <= date)

  return result[result.length - 1]?.geoJsonData || []
}
