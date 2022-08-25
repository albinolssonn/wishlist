import React from 'react'
import CloseIcon from '@mui/icons-material/Close';


const ProductSettingsModal = () => {
  return (
    <div className='product-settings-modal' style={{background:"#fff",width:"100%",height:"100%", position:"absolute", zIndex:"2", borderRadius:"5px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",animation:"ease-in"}}>

        <div className="product-settings-modal-title" style={{padding:"10px",textAlign:"center"}}>
            <div className="product-settings-modal-close-btn"><CloseIcon style={{fontSize:"18px",position:"absolute",right:"5px"}}/></div>
            <p>Produktåtgärder</p>
        </div>
        
        <div className="divider" style={{height:"1px",background:"#1d1d1d",width:"95%",margin:"auto"}}></div>

        <ul style={{listStyle:"none",padding:"10px"}}>
            <li className='product-settings-modal-row' style={{height:"30px"}}> 
                <div className="prouct-setting-modal-row-title">Gör reserverbar</div>
            </li>
            <li className='product-settings-modal-row' style={{height:"30px"}}> 
                <div className="prouct-setting-modal-row-title">Ta bort produkt</div>
            </li>
            
        </ul>
        
    </div>
  )
}

export default ProductSettingsModal