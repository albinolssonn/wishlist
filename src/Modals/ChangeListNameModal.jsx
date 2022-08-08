import React from 'react'
import standardInput from '../Assets/StandardInput'

const ChangeListNameModal = ({ openModal }) => {
  return (
    <div>
        <input style={standardInput} type="text" />
        <button onClick={()=> openModal(false)}>Ändra namn</button>
        <button onClick={()=> openModal(false)}>Avbryt</button>
    </div>
  )
}

export default ChangeListNameModal