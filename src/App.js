import { useEffect } from 'react';
import './App.css';
import Grid from './Grid';
import { useGlobalContext } from './context';


function App() {
  const {sizeMatrix,setSizeMatrix,setMatrix} = useGlobalContext();

  useEffect(() => {
    console.log("generating")
    const tempMatrix = {}
    for (let index = 0; index < sizeMatrix; index++) {
      tempMatrix[index] = {};
      for (let j = 0; j < sizeMatrix; j++) {
        tempMatrix[index][j] = false;
      }
    }
    setMatrix(tempMatrix);
  },[setMatrix, setSizeMatrix, sizeMatrix])

  return (
    <div className="App">
      <form className='w-50 d-flex justify-content-center'>
        <div className='form-item d-flex justify-content-center align-items-center'>
          <label className='form-label me-3' htmlFor='matrix-input'>Tamaño de la matriz:</label>
          <input className='form-control w-25' id='matrix-input' type='number'/>
        </div>
      </form>
      <div className='app-center'>
        <div className='container'>
          <Grid n={sizeMatrix}></Grid>
        </div>
        <div className='container'>
          <Grid n={sizeMatrix}></Grid>
        </div>
      </div>
    </div>
  );
}

export default App;
