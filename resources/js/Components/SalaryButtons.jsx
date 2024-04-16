import React from 'react'

const SalaryButtons = ({onClickHandler, value, title}) => {
  return (
    <button onClick={onClickHandler} value={value} className='px-4 py-1 border text-base hover:bg-blue hover:text-white'>
        {title}
    </button>
  )
}

export default SalaryButtons
