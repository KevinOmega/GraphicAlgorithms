import React, { useEffect, useState } from 'react'
import { useGlobalContext } from './context'

const Item = ({id_row,id_col,type}) => {
    const {itemSize,matrix} = useGlobalContext();
    const [paint,setPaint] = useState(false);


  useEffect(() => {
    if (Object.keys(matrix).length) {
      if (matrix[id_row][id_col][type]) {
        setPaint(true);
      }else{
        setPaint(false);
      }
    }
    
  },[matrix, id_col, id_row, type])

  return (
    <div className='item' style={{width: itemSize,
                                 height: itemSize, 
                                 backgroundColor: `${paint ? matrix[id_row][id_col].color : "transparent"}`}}>
    </div>
  )
}

export default Item
