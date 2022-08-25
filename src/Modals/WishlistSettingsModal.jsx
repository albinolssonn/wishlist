import React from 'react'
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import '../Assets/SettingsModalStyle.css';


const WishListSettingsModal = ( {showSettings, openNameChange, deleteVerification} ) => {
  return (
    <div className='wl-settings-modal'>
        <div className="wl-settings-modal-title">
            <div className="wl-settings-modal-close-btn" onClick={()=>showSettings(false)}><CloseIcon style={{fontSize:"18px"}}/></div>
            <p>Liståtgärder</p>
        </div>
        
        <div className="divider" style={{height:"1px",background:"#474849",width:"95%",margin:"auto"}}></div>

        <ul>
            <li className='wl-settings-modal-row'> 
                <div className="wl-setting-modal-row-icon"><IosShareIcon /></div> 
                <div className="wl-setting-modal-row-title">Dela Önskelista</div>
            </li>
            <li className='wl-settings-modal-row' onClick={()=>openNameChange(true) & showSettings(false)}> 
                <div className="wl-setting-modal-row-icon"><EditIcon /></div> 
                <div className="wl-setting-modal-row-title">Ändra namn</div>
            </li>
            <li className='wl-settings-modal-row last' onClick={()=>deleteVerification(true) & showSettings(false)}> 
                <div className="wl-setting-modal-row-icon"><DeleteIcon /></div> 
                <div className="wl-setting-modal-row-title">Ta bort önskelista</div>
            </li>
        </ul>
    </div>
  )
}

export default WishListSettingsModal