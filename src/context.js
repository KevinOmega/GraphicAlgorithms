import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [itemSize, setItemSize] = useState(10);
  const [sizeMatrix,setSizeMatrix] = useState(20);
  const [matrix,setMatrix] = useState({});

  useEffect(() => {
    console.log(itemSize,"main");
  },[itemSize])
  

  return (
    <AppContext.Provider value={{ itemSize,setItemSize,sizeMatrix,setSizeMatrix, matrix, setMatrix }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };