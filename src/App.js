import { useEffect, useState } from 'react';
import './App.css';
import Grid from './Grid';
import { useGlobalContext } from './context';
import Form from './Form';
import Parameters from './Parameters';


function App() {
  const {sizeMatrix,setSizeMatrix,setMatrix,generateBtn,clean} = useGlobalContext();

  useEffect(() => {
    console.log("generating")
    const tempMatrix = {}
    for (let index = 0; index < sizeMatrix; index++) {
      tempMatrix[index] = {};
      for (let j = 0; j < sizeMatrix; j++) {
        tempMatrix[index][j] = {right : false, left : false};
      }
    }
    setMatrix(tempMatrix);
  },[setMatrix, setSizeMatrix, sizeMatrix])

  return (
    <div className="App py-5">
      <Form />
      <div className='app-center'>
        <div className='container-fluid d-flex flex-column align-items-center'>
          <h3>Algoritmo Normal</h3>
          <Grid n={sizeMatrix} type={"left"}></Grid>
        </div>
        <div className='container-fluid d-flex flex-column align-items-center'>
        <h3>Algoritmo Mejorado</h3>
          <Grid n={sizeMatrix} type={"right"}></Grid>
        </div>
      </div>
      <Parameters/>
      <div className='btns pt-5'>
        <button className='btn btn-light me-5' onClick={generateBtn}>Generar</button>
        <button className='btn btn-warning' onClick={clean}>Limpiar</button>
      </div>
    </div>
  );
}

export default App;
