
import { createContext,useState } from "react";


const DataContext = createContext({});


export const DataProvider = ({children}) => {
    
    const [patients,setPatients] = useState();
    const [doctors,setDoctors] = useState();

    return (

        <DataContext.Provider value = { { patients,setPatients,doctors,setDoctors } }>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;