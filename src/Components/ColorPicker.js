import React from 'react'

export const ColorPicker = ({ color, setColor }) => {
  const onChange = (e) => setColor(e.target.value)

  return (
    <div style={{ padding: 10 }}>
      <input type='color' value={color} onChange={(e) => onChange(e)} />
    </div>
  )
}
