import React from 'react'

const Input = ({ type = "text", className, ...props }) => {
  return (
    <>
      <div className={`w-96 ${props.endContent && "relative"}`}>
        <input className={className ?? ""} type={type} placeholder={props.placeholder ?? ""} />
        {props.endContent && <span className="absolute inset-y-0 right-0 flex items-center pe-2">{props.endContent}</span>}
      </div>

    </>
  )
}

export default Input