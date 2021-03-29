import React, { useState} from 'react'
// import useRootClose from 'react-overlays/useRootClose'

const Dropdown = ({ icon, label, children }) => {
  //   const [dropDown, setDropDown] = useState(false)

//   const ref = useRef()
  const [show, setShow] = useState(false)
//   const handleRootClose = () => setShow(false)

//   useRootClose(ref, handleRootClose, {
//     disabled: !show,
//   })

  return (
    <ul>
      <button
        className='text-decoration-none focus:outline-none pb-2'
        onClick={() => setShow(!show)}>
        <i className={`${icon} ml-2 text-base`}><span className='ml-2 font-sans font-normal text-xl'>{label}</span></i>
      </button>
      {show && <li>{children}</li>}
    </ul>
  )
}

export default Dropdown
