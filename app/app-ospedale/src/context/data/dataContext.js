import { createContext,useState } from "react";


const DataContext = createContext({});


export const DataProvider = ({children}) => {
    
    const [patients,setPatients] = useState();
    const [freePatients,SetFreePatients] = useState();

    return (

        <DataContext.Provider value = { { patients,setPatients,freePatients,SetFreePatients } }>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;