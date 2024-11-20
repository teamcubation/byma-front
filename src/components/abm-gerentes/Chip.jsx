import React from 'react'

const Chip = ({text, color, className = "", children}) => {
  return (
    <div className={`rounded-full p-2 ${className}`}>{children}</div>
  )
}

export default Chip