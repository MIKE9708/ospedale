import { createContext,useState } from "react";


const DataContext = createContext({});


export const DataProvider = ({children}) => {
    
    const [patients,setPatients] = useState();

    return (

        <DataContext.Provider value = { { patients,setPatients } }>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;