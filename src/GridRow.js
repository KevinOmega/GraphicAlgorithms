import React from 'react'
import Item from './Item'

const GridRow = ({n,n_row, type}) => {
  return (
    <div className='d-flex'>
        {Array.from({length:n},(_,index) => <Item id_row={n_row} id_col={index} key={index} type={type}/>)}
    </div>
  )
}

export default GridRow
