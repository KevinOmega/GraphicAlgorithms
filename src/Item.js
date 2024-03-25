import React, { useEffect, useState } from 'react'
import { useGlobalContext } from './context'

const Item = ({id_row,id_col}) => {
    const {itemSize,matrix} = useGlobalContext();
    const [paint,setPaint] = useState(false);


    useEffect(() => {
        if(matrix[id_row][id_col]){
            setPaint(true)
        }
    },[matrix])

  return (
    <div className='item' style={{width: itemSize,
                                 height: itemSize, 
                                 backgroundColor: `${paint ? "#1f9" : "transparent"}`}}>
        
    </div>
  )
}

export default Item
