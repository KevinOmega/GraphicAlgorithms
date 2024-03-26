import React from 'react'
import { useGlobalContext } from './context'

const Form = () => {
    const {algorithms,setAlgorithms} = useGlobalContext(); 


  return (
    <select 
    className="form-select bg-dark text-light w-25 mb-5" 
    aria-label="Default select example" 
    value={algorithms}
    onChange={(e) => setAlgorithms(e.target.value)}>
          <option value={1}>Lineas</option>
          <option value={2}>Circunferencias</option>
          
    </select>
  )
}

export default Form
