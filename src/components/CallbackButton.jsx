import React from 'react'

export const CallbackButton = ({
  callback,
  text,
}) => {
  return (
    <>
      <button onClick={callback}>{text}</button>
    </>
  )
}
