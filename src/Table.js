import React, { useEffect } from 'react'
import { useGlobalContext } from './context'

const Table = () => {

    const {goodTimes,badTimes,matrix} = useGlobalContext();
    useEffect(() => {
        console.log(goodTimes,badTimes);
        console.log(matrix)
    },[goodTimes,badTimes,matrix])

    if(!goodTimes.length){
        return(<></>)
    }else{
        return (
            <div className='table'>
                <div className='table-center'>
                <div className='row'>
                        <div className='col col-2'>
                            <p className='text-dark'>N</p>
                        </div>
                         <div className='col col-5'>
                            <p className='text-dark'>Algoritmo normal</p>
                        </div>
                        <div className='col col-5'>
                            <p className='text-dark'>Algoritmo mejorado</p>
                        </div>
                       
                        
                    </div>
                {goodTimes.map((time,index) => {
                    console.log(time,"time")
                return (
                    <div className='row' key={index}>
                         <div className='col col-2'>
                            <p className='text-dark p-0'>{index + 1}</p>
                        </div>
                        <div className='col col-5'>
                            <p className='text-dark'>{badTimes[index]} ms</p>
                        </div>
                        <div className='col col-5'>
                            <p className='text-dark'>{time} ms</p>
                        </div>
                        
                    </div>
                );
              })}
                </div>
              
            </div>
          )
    }
  
}

export default Table
