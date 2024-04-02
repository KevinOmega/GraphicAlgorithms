import { createContext, useContext, useEffect, useState } from "react";
import { useGetColor } from "./color";

const sleep = ms => new Promise(r => setTimeout(r, ms));

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [itemSize, setItemSize] = useState(5);
  const [sizeMatrix,setSizeMatrix] = useState(50);
  const [matrix,setMatrix] = useState({});
  const [algorithms,setAlgorithms] = useState(1);
  const [testMode,setTestMode] = useState(false);
  const [parameter,setParameters] = useState({
    x1 : 0,x2 : sizeMatrix - 1,y1: 0, y2 : sizeMatrix - 1,
    xc : Math.round(sizeMatrix/2),yc : Math.round(sizeMatrix/2), r : Math.round(sizeMatrix/2)
  })
  const [delay,setDelay] = useState(200);
  const [goodTimes,setGoodTimes] = useState([]);
  const [badTimes,setBadTimes] = useState([]);

  const colorPalette = useGetColor();

  const drawPoint = (tempMatrix,x,y,type,color) => {
    if(x < 0 || x > sizeMatrix - 1 || y < 0 || y > sizeMatrix - 1){
      return tempMatrix;
    }else{
      tempMatrix[y][x] = {...matrix[y][x], [type] : true, color}
      return tempMatrix;
    }
    
  }

  const generateBtn = async() => {
    let n = 1;
    if(testMode){
      n = 40;
    }
    switch (Number(algorithms)) {

      case 1:
          let {x1,x2,y1,y2} = parameter;

          
          for (let index = 0; index < n; index++) {    
            drawLine(Number(x1),Number(y1),Number(x2),Number(y2),"left",colorPalette[index]);
            DDA(Number(x1),Number(y1 ),Number(x2),Number(y2  ),"right",colorPalette[index]);
            let sleepTime = Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2));
            console.log(sleepTime,"sleep")
            await sleep(sleepTime * delay)
            x1 = Math.floor(Math.random() * sizeMatrix);
            x2 = Math.floor(Math.random() * sizeMatrix);
            y1 = Math.floor(Math.random() * sizeMatrix);
            y2 = Math.floor(Math.random() * sizeMatrix);
          }
          
        break;
      case 2:
          let {xc,yc,r} = parameter;
          for (let index = 0; index < n; index++) {
            circunferenciaNormal(Number(xc),Number(yc),Number(r),"left",colorPalette[index]);
            bresenhamCircunferencia(Number(xc),Number(yc),Number(r),"right",colorPalette[index]);

            let sleepTime = (r * 2) + 5;
            await sleep(sleepTime * delay);
            xc = Math.round(Math.random() * sizeMatrix);
            yc = Math.round(Math.random() * sizeMatrix);
            r = Math.round(Math.random() * (sizeMatrix / 2));
          }  
        break;
      case 3 :
        let {xc : xc1,yc : yc1,r : r1} = parameter;
        for (let index = 0; index < n; index++) {
          circunferenciaNormalMejorado(Number(xc1),Number(yc1),Number(r1),"left",colorPalette[index]);
          bresenhamCircunferencia(Number(xc1),Number(yc1),Number(r1),"right",colorPalette[index]);

          let sleepTime = (r1 * 2) + 5;
          await sleep(sleepTime * delay);
          xc1 = Math.round(Math.random() * sizeMatrix);
          yc1 = Math.round(Math.random() * sizeMatrix);
          r1 = Math.round(Math.random() * (sizeMatrix / 2));
        }
        break;
      default:
        break;
    }
    
  }


    const drawLine = async(x1, y1, x2, y2,type,color) => {
      const startTime = performance.now();
      const tempMatrix = matrix;
      let m = (y2 - y1) / (x2 - x1);
      let b = y1 - m * x1;
      if (Math.abs(m) < 1) {
          let dx = x2 > x1 ? 1 : -1;
          while (x1 !== x2) {
              x1 += dx;
              let y = m * x1 + b;
              
                setMatrix({...drawPoint(tempMatrix,x1, Math.round(y),type,color)});
                await sleep(delay * 1.35 )     
          }
           
      }else{  
        let dy = y2 > y1 ? 1 : -1;
          while (y1 !== y2) {
              y1 += dy;
              let x = (y1 - b) / m;
              
                setMatrix({...drawPoint(tempMatrix,Math.round(x) , y1 ,type,color)});
                await sleep(delay * 1.35)
          }
      }
      const endTime = performance.now();
      const totalTime = Math.floor(endTime - startTime);
      setBadTimes(badTimes => [...badTimes,totalTime])  
       
  }

  const DDA = async(x0, y0, x1, y1,type,color) =>  {
    const startTime = performance.now();
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
      
        setMatrix({...drawPoint(tempMatrix,Math.round(x), Math.round(y),type,color)});
        await sleep(delay)
        return;
    }
    let xs = dx / steps;
    let ys = dy / steps;
        for (let i = 0; i <= steps; i++) {
          
            setMatrix({...drawPoint(tempMatrix,Math.round(x), Math.round(y),type,color)});
            x = x + xs;
            y = y + ys;
          await sleep(delay)
      }
    const endTime = performance.now();
    const totalTime = Math.floor(endTime - startTime);
    setGoodTimes((goodTimes) => [...goodTimes,totalTime]); 
     
  }

  
  const bresenhamCircunferencia = async(xc,yc,r,type,color) => {
    const startTime = performance.now();
    const tempMatrix = matrix;
    let x = 0;
    let y = r;
    let d = 3 - 2 * r;
    while (x <= y) {
      
        setMatrix({...drawPoint(tempMatrix,xc + x,yc + y,type, color)});
        setMatrix({...drawPoint(tempMatrix,xc + y,yc + x,type, color)});
        setMatrix({...drawPoint(tempMatrix,xc - x,yc + y,type, color)});
        setMatrix({...drawPoint(tempMatrix,xc - y,yc + x,type, color)});
        setMatrix({...drawPoint(tempMatrix,xc - x,yc - y,type, color)});
        setMatrix({...drawPoint(tempMatrix,xc - y,yc - x,type, color)});
        setMatrix({...drawPoint(tempMatrix,xc + x,yc - y,type, color)});
        setMatrix({...drawPoint(tempMatrix,xc + y,yc - x,type, color)});

        if (d <= 0) {
          d += 4 * x + 6;
      } else {
          y--;
          d += 4 * (x - y) + 10;
      }
      x++;
      await sleep(delay)
    }
    const endTime = performance.now();
    const total = Math.floor(endTime - startTime);
    setGoodTimes((goodTimes) => [...goodTimes,total])
  }


  const circunferenciaNormal = async(xc,yc,r,type,color) => {
    const startTime = performance.now();
    const tempMatrix = matrix;
    for (let x = 0; x < sizeMatrix; x++) {
      let operation = Math.pow(r,2) - Math.pow(xc - x,2);
      if (operation >= 0) {
        let y1 = yc + Math.round(Math.sqrt(operation));
        let y2 = yc - Math.round(Math.sqrt(operation));
        await sleep(delay).then(() => {
          setMatrix({...drawPoint(tempMatrix,x,y1,type,color)});
          setMatrix({...drawPoint(tempMatrix,x,y2,type,color)});
        });
      }
    }
    const endTime = performance.now();
    const totalTime = Math.floor(endTime - startTime);
    setBadTimes((badTimes) => [...badTimes,totalTime]);
  }

  const circunferenciaNormalMejorado = async(xc,yc,r,type,color) => {
    console.log(xc,yc,r)
    const startTime = performance.now();
    const tempMatrix = matrix;
    for (let x = 0; x < r; x++) {
      let operation = Math.pow(r,2) - Math.pow(x,2);
      if (operation >= 0) {
        let y = Math.round(Math.sqrt(operation));
        
        await sleep(delay).then(() => {
          setMatrix({...drawPoint(tempMatrix,xc + x,yc + y,type, color)});
          setMatrix({...drawPoint(tempMatrix,xc + y,yc + x,type, color)});
          setMatrix({...drawPoint(tempMatrix,xc - x,yc + y,type, color)});
          setMatrix({...drawPoint(tempMatrix,xc - y,yc + x,type, color)});
          setMatrix({...drawPoint(tempMatrix,xc - x,yc - y,type, color)});
          setMatrix({...drawPoint(tempMatrix,xc - y,yc - x,type, color)});
          setMatrix({...drawPoint(tempMatrix,xc + x,yc - y,type, color)});
          setMatrix({...drawPoint(tempMatrix,xc + y,yc - x,type, color)});
        });
      }
    }
    const endTime = performance.now();
    const totalTime = Math.floor(endTime - startTime);
    setBadTimes((badTimes) => [...badTimes,totalTime]);
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
    setGoodTimes([]);
    setBadTimes([]);
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
    clean,
    goodTimes,
    badTimes,
    testMode,
    setTestMode,
     }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };