import { createContext, useContext, useEffect, useState } from "react";

const sleep = ms => new Promise(r => setTimeout(r, ms));

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [itemSize, setItemSize] = useState(10);
  const [sizeMatrix,setSizeMatrix] = useState(50);
  const [matrix,setMatrix] = useState({});
  const [algorithms,setAlgorithms] = useState(1)
  const [parameter,setParameters] = useState({
    x1 : 0,x2 : sizeMatrix - 1,y1: 0, y2 : sizeMatrix - 1,xc : 25,yc : 25, r : 20
  })


  const drawPoint = (tempMatrix,x,y,type) => {
    if(x < 0){
      x = 0;
    }
    if( y < 0){
      y = 0;
    }
    if(x > sizeMatrix - 1){
      x = sizeMatrix - 1;
    }
    if(y > sizeMatrix - 1){
      y = sizeMatrix - 1;
    }
    tempMatrix[y][x] = {...matrix[y][x], [type] : true}
    return tempMatrix;
  }

  const generateBtn = () => {
    switch (Number(algorithms)) {
      case 1:
        // DDA(parameter.x1,parameter.y1,parameter.x2,parameter.y2,"left");
        bresenhamLineas(Number(parameter.x1),Number(parameter.y1),Number(parameter.x2),Number(parameter.y2),"right");
        DDA(Number(parameter.x1),Number(parameter.y1),Number(parameter.x2),Number(parameter.y2),"left");

        break;
      case 2:
        bresenhamCircunferencia(Number(parameter.xc),Number(parameter.yc),Number(parameter.r),"left");
        bresenhamCircunferencia(Number(parameter.xc),Number(parameter.yc),Number(parameter.r),"right");
        break;
      default:
        break;
    }
    
  }


  const bresenhamLineas = async(x1, y1, x2, y2,type) => {
    const tempMatrix = matrix;
    let m_new = 2 * (y2 - y1);
    let slope_error_new = m_new - (x2 - x1);

    let y = y1;
    for (let x = x1; x <= x2; x++) {
      console.log(x);
      await sleep(100).then(() =>{
        setMatrix({...drawPoint(tempMatrix,x,y,type)})
        slope_error_new = slope_error_new + m_new;

        if (slope_error_new >= 0) {
            y = y + 1;
            slope_error_new = slope_error_new - 2 * (x2 - x1);
        }
      })
    }
  }

    const bresenhamCircunferencia = async(xc,yc,r,type) => {
      const tempMatrix = matrix;
      let x = 0;
      let y = r;
      let d = 3 - 2 * r;
      while (x <= y) {
        await sleep(100).then(() =>{
          setMatrix({...drawPoint(tempMatrix,xc + x,yc + y,type)});
          setMatrix({...drawPoint(tempMatrix,xc + y,yc + x,type)});
          setMatrix({...drawPoint(tempMatrix,xc - x,yc + y,type)});
          setMatrix({...drawPoint(tempMatrix,xc - y,yc + x,type)});
          setMatrix({...drawPoint(tempMatrix,xc - x,yc - y,type)});
          setMatrix({...drawPoint(tempMatrix,xc - y,yc - x,type)});
          setMatrix({...drawPoint(tempMatrix,xc + x,yc - y,type)});
          setMatrix({...drawPoint(tempMatrix,xc + y,yc - x,type)});
        }).then(() => {
          if (d <= 0) {
            d += 4 * x + 6;
        } else {
            y--;
            d += 4 * (x - y) + 10;
        }
        x++;
        })
      }

    }


  const DDA = async(x0, y0, x1, y1,type) =>  {
    const tempMatrix = matrix;
    let dx = Math.abs(x0 - x1);
    let dy = Math.abs(y0 - y1);

    let steps = Math.max(dx, dy);

    let xinc = dx / steps;
    let yinc = dy / steps;

    let x = x0;
    let y = y0;


    for (let i = 0; i < steps; i++) {
        // append the x,y coordinates in respective arrays
        await sleep(100).then(() =>{
          setMatrix({...drawPoint(tempMatrix,x,y,type)})
        }).then(()=>{
          x = x + xinc;
          y = y + yinc;
        })

        // increment the values
        
    }
  }



  return (
    <AppContext.Provider value={{ 
    itemSize,
    setItemSize,
    sizeMatrix,
    setSizeMatrix, 
    matrix, 
    setMatrix,
    algorithms,
    setAlgorithms,
    generateBtn,
    parameter,
    setParameters
     }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };