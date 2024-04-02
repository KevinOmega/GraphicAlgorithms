import React from 'react'
import { useGlobalContext } from './context'
import { useGetColor } from './color';

const Table = () => {

    const {goodTimes,badTimes} = useGlobalContext();
    const colorPalette = useGetColor();

    if(!goodTimes.length){
        return(<></>)
    }else{
        return (
            <div className='table'>
                <div className='table-center'>
                <div className='row'>
                        <div className='col col-1'>
                            <p className='text-dark'>N</p>
                        </div>
                        <div className='col col-1'>
                            <p className='text-dark'>Color</p>
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
                    <div className='row' key={index} style={{backgroundColor: "#ccc"}}>
                         <div className='col col-1'>
                            <p className='text-dark p-0'>{index + 1}</p>
                        </div>
                        <div className='col col-1'>
                            <div className='rect' style={{backgroundColor: colorPalette[index]}}></div>
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
                
                        {badTimes.length &&
                            <div className='row' >
                            <div className='col col-2'>
                               <p className='text-dark p-0'>Total</p>
                           </div>
                           <div className='col col-5'>
                               <p className='text-dark'>{badTimes.reduce((prev,current) => {
                                   return prev + current
                               })} ms</p>
                           </div>
                           <div className='col col-5'>
                                   <p className='text-dark'>{goodTimes.reduce((prev,current) => prev + current)} ms</p>
                           </div>
                   </div>  
                        } 
                </div>
              
            </div>
          )
    }
  
}

export default Table
