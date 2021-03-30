import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
// import useRootClose from 'react-overlays/useRootClose'

const Dropdown = ({ icon, label, children }) => {
  const isDesktop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  })
  const [show, setShow] = useState(false)

  return (
    <>
      {isDesktop ? (
        <div className='relative'>
          <button
            className='text-decoration-none focus:outline-none pb-2'
            onClick={() => setShow(!show)}>
            <i className={`${icon} ml-2 text-base`}>
              <span className='ml-2 font-sans font-normal text-xl'>{label}</span>
            </i>
          </button>
          {show && (
            <div className='absolute bg-yellow-600 p-3 ml-0 pl-0 w-40' onClick={() => setShow(false)}>{children}</div>
          )}
        </div>
      ) : (
        <ul>
          <button
            className='text-decoration-none focus:outline-none pb-2'
            onClick={() => setShow(!show)}>
            <i className={`${icon} ml-2 text-base`}>
              <span className='ml-2 font-sans font-normal text-xl'>
                {label}
              </span>
            </i>
          </button>
          {show && <li>{children}</li>}
        </ul>
      )}
    </>
  )
}

export default Dropdown
