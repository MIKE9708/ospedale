
import { createContext,useState } from "react";


const DataContext = createContext({});


export const DataProvider = ({children}) => {
    
    const [patients,setPatients] = useState();
    const [doctors,setDoctors] = useState();
    const [ admins,setAdmins ] = useState();

    return (

        <DataContext.Provider value = { { patients,setPatients,doctors,setDoctors,admins,setAdmins } }>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;