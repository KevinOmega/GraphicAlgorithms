import React from 'react'
import { useGlobalContext } from './context'

const Form = () => {
    const {algorithms,setAlgorithms,delay,setDelay,setTestMode,testMode} = useGlobalContext(); 


  return (
    <div className='form d-flex'>
       <select 
        className="form-select bg-dark text-light w-50 mb-5" 
        aria-label="Default select example" 
        value={algorithms}
        onChange={(e) => setAlgorithms(e.target.value)}>
          <option value={1}>Lineas</option>
          <option value={2}>Circunferencias</option>
          <option value={3}>Circunferencias Mejorado</option>
    </select>
    <div className='form-item d-flex align-items-start justify-content-center '>
      <label className='form-label me-5'>Delay</label>
      <input className='form-control h-50' type='number' value={delay} onChange={(e)=>(setDelay(Number(e.target.value)))}></input>
    </div>
    <button className={`btn ${testMode ? "btn-success" : "btn-light"} h-25`}
      onClick={() => setTestMode(!testMode)}
    >Test Mode</button>
    </div>
   
  )
}

export default Form
