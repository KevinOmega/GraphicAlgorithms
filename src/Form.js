import React from 'react'
import { useGlobalContext } from './context'

const Form = () => {
    const {algorithms,setAlgorithms,delay,setDelay} = useGlobalContext(); 


  return (
    <div className='form d-flex'>
       <select 
        className="form-select bg-dark text-light w-50 mb-5" 
        aria-label="Default select example" 
        value={algorithms}
        onChange={(e) => setAlgorithms(e.target.value)}>
          <option value={1}>Lineas</option>
          <option value={2}>Circunferencias</option>
    </select>
    <div className='form-item d-flex align-items-start justify-content-center '>
      <label className='form-label me-5'>Delay</label>
      <input className='form-control h-50' type='number' value={delay} onChange={(e)=>(setDelay(Number(e.target.value)))}></input>
    </div>
    </div>
   
  )
}

export default Form
