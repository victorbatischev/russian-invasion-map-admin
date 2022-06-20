import React, { useEffect } from 'react'
import './modal.css'

export const Modal = ({ active, setActive, children }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [active])

  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
