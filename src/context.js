import { createContext, useContext, useEffect, useState } from "react";

const sleep = ms => new Promise(r => setTimeout(r, ms));

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [itemSize, setItemSize] = useState(10);
  const [sizeMatrix,setSizeMatrix] = useState(100);
  const [matrix,setMatrix] = useState({});
  const [algorithms,setAlgorithms] = useState(1)
  const [parameter,setParameters] = useState({
    x1 : 0,x2 : sizeMatrix - 1,y1: 0, y2 : sizeMatrix - 1,
    xc : Math.round(sizeMatrix/2),yc : Math.round(sizeMatrix/2), r : Math.round(sizeMatrix/2)
  })
  const [delay,setDelay] = useState(200)


  const drawPoint = (tempMatrix,x,y,type) => {
    if(x < 0 || x > sizeMatrix - 1 || y < 0 || y > sizeMatrix - 1){
      return tempMatrix;
    }else{
      tempMatrix[y][x] = {...matrix[y][x], [type] : true}
      return tempMatrix;
    }
    
  }

  const generateBtn = () => {
    
    switch (Number(algorithms)) {
      case 1:
        drawLine(Number(parameter.x1),Number(parameter.y1),Number(parameter.x2),Number(parameter.y2),"left");
        DDA(Number(parameter.x1),Number(parameter.y1),Number(parameter.x2),Number(parameter.y2),"right");

        break;
      case 2:
        circunferenciaNormal(Number(parameter.xc),Number(parameter.yc),Number(parameter.r),"left");
        bresenhamCircunferencia(Number(parameter.xc),Number(parameter.yc),Number(parameter.r),"right");
        break;
      default:
        break;
    }
    
  }

    const bresenhamCircunferencia = async(xc,yc,r,type) => {
      const tempMatrix = matrix;
      let x = 0;
      let y = r;
      let d = 3 - 2 * r;
      while (x <= y) {
        console.log(x,y)
        await sleep(delay).then(() =>{
          setMatrix({...drawPoint(tempMatrix,xc + x,yc + y,type)});
          setMatrix({...drawPoint(tempMatrix,xc + y,yc + x,type)});
          setMatrix({...drawPoint(tempMatrix,xc - x,yc + y,type)});
          setMatrix({...drawPoint(tempMatrix,xc - y,yc + x,type)});
          setMatrix({...drawPoint(tempMatrix,xc - x,yc - y,type)});
          setMatrix({...drawPoint(tempMatrix,xc - y,yc - x,type)});
          setMatrix({...drawPoint(tempMatrix,xc + x,yc - y,type)});
          setMatrix({...drawPoint(tempMatrix,xc + y,yc - x,type)});

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


    const circunferenciaNormal = async(xc,yc,r,type) => {
      const tempMatrix = matrix;
      for (let x = 0; x < sizeMatrix; x++) {
        let operation = Math.pow(r,2) - Math.pow(xc - x,2);
        if (operation >= 0) {
          let y1 = yc + Math.round(Math.sqrt(operation));
          let y2 = yc - Math.round(Math.sqrt(operation));
          console.log(x,y1,y2)
          await sleep(delay).then(() => {
            setMatrix({...drawPoint(tempMatrix,x,y1,type)});
            setMatrix({...drawPoint(tempMatrix,x,y2,type)});
          });
        }
      }
    }

    const drawLine = async(x1, y1, x2, y2,type) => {
      const tempMatrix = matrix;
      let m = (y2 - y1) / (x2 - x1);
      let b = y1 - m * x1;
  
      if (Math.abs(m) < 1) {
          let dx = x2 > x1 ? 1 : -1;
          while (x1 !== x2) {
              x1 += dx;
              let y = m * x1 + b;
              await sleep(delay).then(() => {
                setMatrix({...drawPoint(tempMatrix,x1, Math.round(y),type)});
              })
              
          }
      } else {
          let dy = y2 > y1 ? 1 : -1;
          while (y1 !== y2) {
              y1 += dy;
              let x = (y1 - b) / m;
              await sleep(delay).then(() => {
                setMatrix({...drawPoint(tempMatrix,Math.round(x), y1,type)});
              })
          }
      }  
  }

  const DDA = async(x0, y0, x1, y1,type) =>  {
    const tempMatrix = matrix;
    let dx = x1 - x0;
    let dy = y1 - y0;
    let x = x0;
    let y = y0;
    let steps;
    if (Math.abs(dx) > Math.abs(dy)) {
        steps = Math.abs(dx);
    } else {
        steps = Math.abs(dy);
    }
    if (steps === 0) {
      await sleep(delay).then(() => {
        setMatrix({...drawPoint(tempMatrix,Math.round(x), Math.round(y),type)});
      })
        return;
    }
    let xs = dx / steps;
    let ys = dy / steps;
        for (let i = 0; i <= steps; i++) {
          await sleep(delay).then(() => {
            setMatrix({...drawPoint(tempMatrix,Math.round(x), Math.round(y),type)});
            x = x + xs;
            y = y + ys;
          }) 
      }   
  }

  const clean = () => {
    const tempMatrix = {}
    for (let index = 0; index < sizeMatrix; index++) {
      tempMatrix[index] = {};
      for (let j = 0; j < sizeMatrix; j++) {
        tempMatrix[index][j] = {right : false, left : false};
      }
    }
    setMatrix(tempMatrix);
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
    setParameters,
    delay,
    setDelay,
    clean
     }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };