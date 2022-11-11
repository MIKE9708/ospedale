import axios from "./axios";

export  async function login(data){
    try{
        let res=await axios.post('/Login',JSON.stringify(data),
        {
            headers: {'Content-Type': 'application/json' },
            withCredentials: true
        });
        return res;
            }

    catch (err) {

        return {error:err};
    }
}

// per avere il token se refresho la pagina

export async function refreshToken(){

    try{
        let res = await axios.get('/refresh/',{withCredentials: true});
        return res;
    }

    catch (err) {

        return {error:err};
    }
}



export async function getDoctorPatients(id,token){


    try {
        let res = await axios.get('/Dottore/' + id + '/Pazienti',
            {
                headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        return res;
    }

    catch(err){

        return {error:err};
    }
}


export async function updateRecord(id ,obj,token){
    
    try {
        let res = await axios.post('/Dottore/UpdateRecord/' + id ,JSON.stringify(obj),
            {
                headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        return res;
    }

    catch(err){

        return {error:err};
    }

    
}