import React, { useEffect, useRef } from 'react'
import GridRow from './GridRow'
import { useGlobalContext } from './context';


const Grid = ({n,type}) => {
    const {setItemSize} = useGlobalContext();

    const gridRef = useRef();

    useEffect(() => {
        const gridSize = gridRef.current.getBoundingClientRect().width;
        const boxSize = Math.round(gridSize/ Number(n));
        console.log(boxSize);
        setItemSize(boxSize);
    },[n, setItemSize])

  return (
    <div className='grid' ref={gridRef}>
      {Array.from({length: n},(_,index) => <GridRow n={n} n-row={index} key={index}></GridRow>)}
    </div>
  )
}

export default Grid
