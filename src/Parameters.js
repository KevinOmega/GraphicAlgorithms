import React from 'react'
import { useGlobalContext } from './context'

const Parameter = () => {

    const {algorithms,parameter,setParameters} = useGlobalContext();


    if(Number(algorithms) === 1){
        return (
            <div className='form d-flex px-5'>
                <div className='form-item d-flex flex-column align-items-center justify-content-center'>
                    <label className='form-label m-0'>x1</label>
                    <input className='form-control ' type='number'
                    value={parameter.x1}
                    onChange={(e) => setParameters({...parameter,x1 : e.target.value})}
                    ></input>
                </div>
                <div className='form-item d-flex flex-column align-items-center justify-content-center'>
                    <label className='form-label m-0'>y1</label>
                    <input className='form-control' type='number'
                    value={parameter.y1}
                    onChange={(e) => setParameters({...parameter,y1 : e.target.value})}
                    ></input>
                </div>
                <div className='form-item d-flex flex-column align-items-center justify-content-center'>
                    <label className='form-label m-0'>x2</label>
                    <input className='form-control ' type='number'
                    value={parameter.x2}
                    onChange={(e) => setParameters({...parameter,x2 : e.target.value})}></input>
                </div>
                <div className='form-item d-flex flex-column align-items-center justify-content-center'>
                    <label className='form-label m-0'>y2</label>
                    <input className='form-control ' type='number'
                    value={parameter.y2}
                    onChange={(e) => setParameters({...parameter,y2 : e.target.value})}></input>
                </div>
            </div>
          )
    }else if(Number(algorithms) === 2){
        return(
            <div className='form d-flex px-5'>
                <div className='form-item d-flex flex-column align-items-center justify-content-center'>
                    <label className='form-label m-0'>xc</label>
                    <input className='form-control' type='number'
                    value={parameter.xc}
                    onChange={(e) => setParameters({...parameter,xc : e.target.value})}
                    ></input>
                </div>
                <div className='form-item d-flex flex-column align-items-center justify-content-center'>
                    <label className='form-label m-0'>yc</label>
                    <input className='form-control ' type='number'
                    value={parameter.yc}
                    onChange={(e) => setParameters({...parameter,yc : e.target.value})}
                    ></input>
                </div>
                <div className='form-item d-flex flex-column align-items-center justify-content-center'>
                    <label className='form-label m-0'>r</label>
                    <input className='form-control ' type='number'
                    value={parameter.r}
                    onChange={(e) => setParameters({...parameter,r : e.target.value})}
                    ></input>
                </div>
            </div>
        );
    }
  
}

export default Parameter
